type Class<T = any> = new (...args: any[]) => T;
type Factory<T = any> = (...args: any[]) => T;
type Dependency<T = any> = Class<T> | Factory<T> | T;
type InjectAsType = 'asClass' | 'asValue' | 'asFunction';
export type ContainerTokens = { [key: string]: string };

export class Container {
    private tokens = new Set<string>();
    private dependencyRegistry = new Map<string, { dependency: Dependency; type: InjectAsType }>();
    private dependencyCache = new Map<string, unknown>();

    constructor() {}

    registerTokens(tokens: ContainerTokens) {
        if (this.tokens.size) throw new Error('Tokens are already registred.');
        Object.values(tokens).forEach((token) => this.tokens.add(token));
    }

    register(token: string, dependency: Dependency, type: InjectAsType = 'asClass') {
        if (!this.tokens.has(token)) {
            throw new Error(`Token "${token}" wasn't regristred.`);
        }
        this.dependencyRegistry.set(token, { dependency, type });
    }

    resolve<T>(token: string): T {
        try {
            const cachedDependency = this.dependencyCache.get(token);

            if (cachedDependency) {
                return cachedDependency as T;
            }

            const registredDependency = this.dependencyRegistry.get(token);
            if (!registredDependency) {
                throw new Error(`Class not registered for token: ${token}`);
            }

            const { dependency, type } = registredDependency;

            switch (type) {
                case 'asValue':
                    this.dependencyCache.set(token, dependency);
                    return dependency as T;
                case 'asFunction':
                    const factoryInstance = dependency();
                    this.dependencyCache.set(token, factoryInstance);
                    return factoryInstance as T;
                default:
                    const dependencyTokens: string[] = (dependency as any).inject ?? [];
                    const resolvedDeps = dependencyTokens.map((dep) => this.resolve(dep));
                    const classInstance = new dependency(...resolvedDeps);
                    this.dependencyCache.set(token, classInstance);
                    return classInstance as T;
            }
        } catch (err) {
            if ((err as Error).message !== `Class not registered for token: ${token}`) {
                const { type } = this.dependencyRegistry.get(token)!;
                console.error(`Error trying to resolve "${token} - ${type}"  `);
            }
            throw err;
        }
    }
}
