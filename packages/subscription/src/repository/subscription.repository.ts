import { inject, injectable } from 'tsyringe';
import type { ISubscriptionRepository } from '../domain/interfaces/subscription-repository.interface';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { schema } from '../infra/database/connection';

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {
    constructor(@inject('DBClient') private dbClient: NeonHttpDatabase<typeof schema>) {}

    async findAll(): Promise<Array<any>> {
        return this.dbClient.select().from(schema.subscriptionsSchema);
    }
}
