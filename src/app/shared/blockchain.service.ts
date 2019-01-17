import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { BlockchainModel } from './models/blockchain-model';

export class BlockchainService extends BaseApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    browse() {
        return super.get<BlockchainModel>('blockchain');
    }
}