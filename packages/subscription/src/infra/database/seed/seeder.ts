import { faker } from '@faker-js/faker';
import { databaseConnection } from '../connection';
import { subscriptionsSchema } from '../schemas';

async function seed() {
    const db = databaseConnection();
    const subscriptions = Array.from({ length: 10 }, () => ({
        id: faker.string.uuid(),
        name: `${faker.music.songName()}`,
        startDate: faker.date.soon(),
        endDate: faker.date.future(),
        products: [faker.string.uuid(), faker.string.uuid()],
    }));

    await db.insert(subscriptionsSchema).values(subscriptions);
}

async function main() {
    try {
        await seed();
        console.log('Seeding completed');
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
}

main();
