type Class<T = any> = new (...args: any[]) => T;
type Factory<T = any> = (...args: any[]) => T;
type ValueOrFactory<T> = Class<T> | Factory<T> | T;
type RegisterType = {
    
}
export type ContainerTokens = { [key: string]: string };

export class Container {
    private tokens = new Set<string>();
    private classRegistry = new Map<string, Class>();
    private dependencyCache = new Map<string, unknown>();

    constructor() {}

    registerTokens(tokens: ContainerTokens) {
        console.log(this.tokens.size);
        if (this.tokens.size) throw new Error('Tokens are already registred.');
        Object.values(tokens).forEach((token) => this.tokens.add(token));
    }

    register<T>(token: string, clazz: Class) {
        if (!this.tokens.has(token)) {
            throw new Error(`Token "${token}" wasn't regristred.`);
        }
        this.classRegistry.set(token, clazz);
    }

    resolve<T>(token: string): T {
        const cachedDependency = this.dependencyCache.get(token);

        if (cachedDependency) {
            return cachedDependency as T;
        }

        const clazz = this.classRegistry.get(token);
        if (!clazz) throw new Error(`Class not registered for token: ${token}`);

        const dependencyTokens: string[] = (clazz as any).inject ?? [];
        const resolvedDeps = dependencyTokens.map((dep) => this.resolve(dep));
        const instance = new clazz(...resolvedDeps);

        this.dependencyCache.set(token, instance);
        return instance;
    }
}
