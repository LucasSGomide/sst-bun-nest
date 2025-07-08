import { Inject, Injectable } from '@nestjs/common';

import type { ISubscriptionRepository } from '../domain/interfaces/subscription-repository.interface';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { schema } from '../infra/database/connection';

@Injectable()
export class SubscriptionRepository implements ISubscriptionRepository {
    constructor(@Inject('DBClient') private dbClient: NeonHttpDatabase<typeof schema>) {}

    async findAll(): Promise<Array<any>> {
        return this.dbClient.select().from(schema.subscriptionsSchema);
    }
}
