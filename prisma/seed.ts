import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.transactionTypes.createMany({
        data: [
            {
                name: 'Deposit',
            },
            {
                name: 'Withdrawal',
            },
        ],
        skipDuplicates: true,
    });

    await prisma.statuses.createMany({
        data: [
            {
                name: 'Success',
            },
            {
                name: 'Failed',
            },
            {
                name: 'Pending',
            },
        ],
        skipDuplicates: true,
    });
}

main()
    .then(() => {
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });
