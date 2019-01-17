import { TransactionModel } from './transaction-model';
import { BlockModel } from './block-model';

export class BlockchainModel {
    difficulty: number;
    blocks: BlockModel[];
    transactions: TransactionModel[];
}