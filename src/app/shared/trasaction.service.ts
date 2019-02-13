import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TransactionService extends BaseApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    execute(data): Observable<any> {
        return super.post('blockchain/transactions', data);
    }
}