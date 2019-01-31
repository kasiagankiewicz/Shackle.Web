import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { BlockchainModel } from './models/blockchain-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlockModel } from './models/block-model';

@Injectable({
    providedIn: 'root'
})
export class BlockchainService extends BaseApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    browse(): Observable<BlockchainModel> {
        return super.get<BlockchainModel>('blockchain');
    }

    getBlock(index: number): Observable<BlockModel> {
        return super.get<BlockModel>(`blockchain/blocks/${index}`);
    }

    getLastBlock(): Observable<BlockModel> {
        return super.get<BlockModel>(`blockchain/blocks/last`);
    }

    setDifficulty(difficulty: number): Observable<any> {
        return super.put(`blockchain/difficulty/${difficulty}`, difficulty);
    }

    getDifficulty(): Observable<number> {
        return super.get<number>(`blockchain/difficulty`);
    }
}
