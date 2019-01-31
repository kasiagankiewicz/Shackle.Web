import { TransactionModel } from './transaction-model';

export class BlockModel {
    index: number;
    previousHash: string;
    hash: string;
    transactions: TransactionModel[];
    timestamp: Date;
    nonce: number;
    miningTime: number;
}
