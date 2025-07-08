import { Module } from '@nestjs/common';
import { dbClientProvider, subscriptionRepositoryProvider } from './subscription.provider';
import { SubscriptionController } from '@subscription/application/subscription.controller';

@Module({
    controllers: [SubscriptionController],
    providers: [subscriptionRepositoryProvider, dbClientProvider],
})
export class SubscriptionModule {}
