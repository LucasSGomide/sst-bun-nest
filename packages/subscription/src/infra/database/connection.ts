import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { subscriptionsSchema } from './schemas/subscriptions';

// Bun automatically loads the DATABASE_URL from .env.local
// Refer to: https://bun.sh/docs/runtime/env for more information

export function databaseConnection() {
    try {
        console.log('Init neon database connection...');
        const sql = neon(process.env.DATABASE_URL!);
        console.log('Neon database connected...');

        return drizzle(sql, { casing: 'snake_case', schema: { ...subscriptionsSchema } });
    } catch (error) {
        console.error('Error initialzing neon database: ', error);
        throw error;
    }
}
