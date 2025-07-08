import {
    container,
    type InjectionToken,
} from 'tsyringe';

import { databaseConnection } from '../../subscription/src/infra/database/connection';
import { SubscriptionRepository } from '../../subscription/src/repository/subscription.repository';
import { SubscriptionController } from '../../subscription/src/application/subscription.controller';

export class DIContainer {
    static register() {
        container.register('SubscriptionController', { useClass: SubscriptionController });
        container.register('SubscriptionRepository', { useClass: SubscriptionRepository });
        container.register('DBClient', { useValue: databaseConnection() });
    }

    static resolve<T>(token: InjectionToken<T>): T {
        return container.resolve(token);
    }
}
