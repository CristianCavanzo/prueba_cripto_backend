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
