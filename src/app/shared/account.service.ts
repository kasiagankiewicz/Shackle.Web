import { BaseApiService } from './base-api.service';
import { AccountModel } from './models/account-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetailsModel } from './models/account-details-model';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http);
   }
   
   getAccounts(): Observable<AccountModel[]> {
    return super.get<AccountModel[]>('accounts');
   }

   getAccount(name: string): Observable<AccountDetailsModel> {
    return super.get<AccountDetailsModel>(`accounts/${name}`);
   }

   createAccount(data): Observable<any> {
    return super.post('accounts', data);
   }

   setAccount(account: AccountModel) {
    localStorage.account = JSON.stringify(account);
  }
}

   