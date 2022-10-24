/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const id = '5c03994c-fc16-47e0-bd02-d218a370a078';
    await prisma.command.upsert({
        where: {
            id: id,
        },
        create: {
            id: id,
            type: 'text',
            matches: 'ojo',
            response: 'ojooooo',
            timer: 60,
        },
        update: {},
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
