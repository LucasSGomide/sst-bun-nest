import { beforeAll, describe, expect, it, jest } from 'bun:test';
import { Container } from '.';

const DEPENDENCY_TOKENS = {
    mockController: 'MockController',
    mockService: 'MockService',
    mockUserRepository: 'MockUserRepository',
    mockUserDatabase: 'MockUserDatabase',
    mockUsersTableName: 'MockUsersTableName',
    mockSubscriptionRepository: 'MockSubscriptionRepository',
    mockSubscriptionDatabase: 'MockSubscriptionDatabase',
    mockSubscriptionsTableName: 'MockSubscriptionsTableName',
};

class MockController {
    static inject = [DEPENDENCY_TOKENS.mockService];
    constructor(public mockService: MockService) {}
}

class MockService {
    static inject = [
        DEPENDENCY_TOKENS.mockUserRepository,
        DEPENDENCY_TOKENS.mockSubscriptionRepository,
    ];
    constructor(
        public mockUserRepository: MockUserRepository,
        public mockSubscriptionRepository: MockSubscriptionRepository,
    ) {}
}

class MockSubscriptionRepository {
    static inject = [
        DEPENDENCY_TOKENS.mockSubscriptionDatabase,
        DEPENDENCY_TOKENS.mockSubscriptionsTableName,
    ];
    public tableName: string;

    constructor(public mockDatabase: any, subscriptionTable: string) {
        this.tableName = subscriptionTable;
    }
}

class MockUserRepository {
    static inject = [DEPENDENCY_TOKENS.mockUserDatabase, DEPENDENCY_TOKENS.mockUsersTableName];
    public tableName: string;

    constructor(public mockDatabase: any, userTable: string) {
        this.tableName = userTable;
    }
}

const mockUserDb = jest.fn().mockImplementationOnce(() => 'mockDb');
const mockUserTableName = 'users';
const mockSubscriptionDb = jest.fn().mockImplementationOnce(() => 'mockDB');
const mockSubscriptionTableName = 'subscriptions';

describe('Container', () => {
    const container = new Container();
    beforeAll(() => {
        container.registerTokens(DEPENDENCY_TOKENS);

        container.register(DEPENDENCY_TOKENS.mockController, MockController);
        container.register(DEPENDENCY_TOKENS.mockService, MockService);
        container.register(DEPENDENCY_TOKENS.mockUserRepository, MockUserRepository);
        container.register(DEPENDENCY_TOKENS.mockUserDatabase, mockUserDb, 'asFunction');
        container.register(DEPENDENCY_TOKENS.mockUsersTableName, mockUserTableName, 'asValue');
        container.register(
            DEPENDENCY_TOKENS.mockSubscriptionRepository,
            MockSubscriptionRepository,
        );
        container.register(
            DEPENDENCY_TOKENS.mockSubscriptionDatabase,
            mockSubscriptionDb,
            'asFunction',
        );
        container.register(
            DEPENDENCY_TOKENS.mockSubscriptionsTableName,
            mockSubscriptionTableName,
            'asValue',
        );
    });
    it('Should resolve controller correctly', () => {
        const sut = container.resolve<MockController>(DEPENDENCY_TOKENS.mockController);

        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(MockController);
        expect(sut.mockService).toBeDefined();
        expect(sut.mockService).toBeInstanceOf(MockService);
    });

    it('Should resolve service correctly', () => {
        const sut = container.resolve<MockService>(DEPENDENCY_TOKENS.mockService);

        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(MockService);
        expect(sut.mockSubscriptionRepository).toBeDefined();
        expect(sut.mockSubscriptionRepository).toBeInstanceOf(MockSubscriptionRepository);
        expect(sut.mockUserRepository).toBeDefined();
        expect(sut.mockUserRepository).toBeInstanceOf(MockUserRepository);
    });

    it('Should resolve user repository correctly', () => {
        const sut = container.resolve<MockUserRepository>(DEPENDENCY_TOKENS.mockUserRepository);

        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(MockUserRepository);
        expect(sut.mockDatabase).toBeDefined();
        expect(sut.tableName).toBe(mockUserTableName);
    });

    it('Should resolve subscription repository correctly', () => {
        const sut = container.resolve<MockSubscriptionRepository>(
            DEPENDENCY_TOKENS.mockSubscriptionRepository,
        );

        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(MockSubscriptionRepository);
        expect(sut.mockDatabase).toBeDefined();
        expect(sut.tableName).toBe(mockSubscriptionTableName);
    });
});
