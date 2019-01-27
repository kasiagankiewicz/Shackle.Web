import { BaseApiService } from './base-api.service';
import { AccountModel } from './models/account-model';
import { Observable, BehaviorSubject, empty, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetailsModel } from './models/account-details-model';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseApiService {

  accountName$: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem(this.accountKey));
  accountExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(http: HttpClient) {
    super(http);
    this.accountName$.next(this.getAccountName());
  }

  getAccounts(): Observable<AccountModel[]> {
    return super.get<AccountModel[]>('accounts');
  }

  getMyAccount(): Observable<AccountDetailsModel> {
    const accountName = this.getAccountName();

    return this.getAccount(accountName);
  }

  getAccount(name: string): Observable<AccountDetailsModel> {
    return super.get<AccountDetailsModel>(`accounts/${name}`);
  }

  createAccount(name: string): Observable<any> {
    return super.post('accounts', { name });
  }

  setAccount(accountName: string) {
    localStorage.setItem(this.accountKey, accountName);
    this.accountName$.next(accountName);
  }

  login(): void {
    this.accountExists$.next(true);
  }

  logout(): void {
    this.accountExists$.next(false);
    this.accountName$.next(null);
    localStorage.removeItem(this.accountKey);
  }

   public get accountSaved(): boolean {
    return this.getAccountName() ? true : false;
  }

  private getAccountName(): string {
    return this.accountName$.value ? this.accountName$.value : localStorage.getItem(this.accountKey);
  }

   private get accountKey(): string {
    return 'account';
  }
}
