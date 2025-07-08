import { inject, injectable } from 'tsyringe';
import type { Request, Response } from 'express';
import type { ISubscriptionRepository } from '../domain/interfaces/subscription-repository.interface';

@injectable()
export class SubscriptionController {
    constructor(
        @inject('SubscriptionRepository') private subscriptionRepository: ISubscriptionRepository,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const data = await this.subscriptionRepository.findAll();

            res.status(200).json({ message: 'Hello World', data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Error' });
        }
    }
}
