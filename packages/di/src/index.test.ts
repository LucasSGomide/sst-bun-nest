import { describe, expect, it } from 'bun:test';
import { Container } from '.';

const DEPENDENCY_TOKENS = {
    mockController: 'MockController',
    mockService: 'MockService',
    mockRepository: 'MockRepository',
    mockDatabase: 'MockDatabase',
    mockOtherRepository: 'MockOtherRepository',
    mockOtherDatabase: 'MockDatabase',
};

class MockController {
    static inject = [DEPENDENCY_TOKENS.mockService];
    constructor(private mockService: MockService) {}

    getDependencies() {
        const deps = this.mockService.getDependencies();
        return [...MockController.inject, ...deps];
    }
}

class MockService {
    static inject = [DEPENDENCY_TOKENS.mockRepository, DEPENDENCY_TOKENS.mockOtherRepository];
    constructor(private mockRepository: MockRepository, private mockOtherRepository: MockOtherRepository) {}

    getDependencies() {
        const repoDeps = this.mockRepository.getDependencies();
        const otherRepoDeps = this.mockOtherRepository.getDependencies();

        return [...MockService.inject, ...repoDeps, ...otherRepoDeps];
    }
}

class MockOtherRepository {
    static inject = [DEPENDENCY_TOKENS.mockOtherDatabase];
    constructor(private mockOtherDatabase: any) {}

    getDependencies() {
        const deps = this.mockOtherDatabase.getDependencies();

        return [...MockOtherRepository.inject, ...deps];
    }
}

class MockRepository {
    static inject = [DEPENDENCY_TOKENS.mockDatabase];
    constructor(private mockDatabase: any) {}

    getDependencies() {
        const deps = this.mockDatabase.getDependencies();

        return [...MockRepository.inject, ...deps];
    }
}

class MockDatabase {
    constructor() {}

    getDependencies() {
        return ['MockDatabase -> No Deps'];
    }
}

class MockOtherDatabase {
    constructor() {}
    getDependencies() {
        return ['MockOtherDatabase -> No Deps'];
    }
}

describe('Container', () => {
    it('Should work', () => {
        const container = new Container();

        container.registerTokens(DEPENDENCY_TOKENS);

        container.register(DEPENDENCY_TOKENS.mockController, MockController);
        container.register(DEPENDENCY_TOKENS.mockService, MockService);
        container.register(DEPENDENCY_TOKENS.mockRepository, MockRepository);
        container.register(DEPENDENCY_TOKENS.mockDatabase, MockDatabase);
        container.register(DEPENDENCY_TOKENS.mockOtherRepository, MockOtherRepository);
        container.register(DEPENDENCY_TOKENS.mockOtherDatabase, MockOtherDatabase);

        const controller = container.resolve<MockController>(DEPENDENCY_TOKENS.mockController);

        const depsList = controller.getDependencies();

        expect(depsList).toEqual([
            'MockService',
            'MockRepository',
            'MockOtherRepository',
            'MockDatabase',
            'MockOtherDatabase -> No Deps',
            'MockDatabase',
            'MockOtherDatabase -> No Deps',
        ]);
    });
});
