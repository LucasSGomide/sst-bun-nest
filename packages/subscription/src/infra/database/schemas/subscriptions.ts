import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const timestamps = {
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
};

export const subscriptionsSchema = pgTable('subscriptions', {
    id: uuid().primaryKey(),
    name: text(),
    startDate: timestamp().notNull(),
    endDate: timestamp().notNull(),
    products: text()
        .array()
        .notNull()
        .default(sql`'{}'::text[]`),
    discountId: uuid(),
    ...timestamps,
});
