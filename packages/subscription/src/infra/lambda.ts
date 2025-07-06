import type { Request, Response } from 'express';
import { databaseConnection } from './database/connection';
import { subscriptionsSchema } from './database/schemas/subscriptions';

export async function helloWorldHandler(req: Request, res: Response): Promise<void> {
    try {
        const database = databaseConnection();

        const data = await database.select().from(subscriptionsSchema);

        res.status(200).json({ message: 'Hello World', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Error' });
    }
}
