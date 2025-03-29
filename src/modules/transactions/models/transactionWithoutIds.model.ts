import { Transactions } from '@prisma/client';

export type TransactionsWithoutIds = Omit<
    Transactions,
    'id_status' | 'id_type' | 'id_user'
>;
