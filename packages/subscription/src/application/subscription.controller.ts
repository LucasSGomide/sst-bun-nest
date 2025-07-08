import { Controller, Get, Inject } from '@nestjs/common';
import type { ISubscriptionRepository } from '../domain/interfaces/subscription-repository.interface';

@Controller('subscriptions')
export class SubscriptionController {
    constructor(
        @Inject('ISubscriptionRepository')
        private readonly subscriptionRepository: ISubscriptionRepository,
    ) {}

    @Get()
    async getAll() {
        return {
            data: await this.subscriptionRepository.findAll(),
        };
    }
}
