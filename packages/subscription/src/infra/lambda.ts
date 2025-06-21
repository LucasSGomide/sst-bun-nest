import type { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { databaseConnection } from './database/connection';
import { subscriptionsSchema } from './database/schemas/subscriptions';

export async function helloWorldHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
    try {
        const database = databaseConnection();

        const data = await database.select().from(subscriptionsSchema);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello World', data }),
            headers: { 'Content-Type': 'application/json' },
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Error' }),
            headers: { 'Content-Type': 'application/json' },
        };
    }
}
