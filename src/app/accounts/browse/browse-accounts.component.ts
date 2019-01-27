import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/shared/models/account-model';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-browse-accounts',
  templateUrl: './browse-accounts.component.html',
  styleUrls: ['./browse-accounts.component.scss']
})
export class BrowseAccountsComponent implements OnInit {

  accounts: AccountModel[];

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit() {

  }

  getAccounts() {
    this.accountService
    .getAccounts()
    .subscribe(accounts => this.accounts = accounts);
  }
}
