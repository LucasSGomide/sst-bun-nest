import { SubscriptionRepository } from '@subscription/repository/subscription.repository';
import { databaseConnection } from '../database/connection';

export const dbClientProvider = {
    provide: 'DBClient',
    useFactory: databaseConnection,
};

export const subscriptionRepositoryProvider = {
    provide: 'ISubscriptionRepository',
    useClass: SubscriptionRepository,
};
