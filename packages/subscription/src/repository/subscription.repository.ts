import type { ISubscriptionRepository } from '../domain/interfaces/subscription-repository.interface';

export class SubscriptionRepository implements ISubscriptionRepository {
    constructor(private dbClient: any) {}

    async findAll() {
        return [];
    }
}
