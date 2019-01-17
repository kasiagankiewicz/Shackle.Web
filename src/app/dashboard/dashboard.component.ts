import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { AccountModel } from '../shared/models/account-model';
import { AccountDetailsModel } from '../shared/models/account-details-model';
import { TransactionService } from '../shared/trasaction.service';
import { TransactionModel } from '../shared/models/transaction-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    accounts: AccountModel[];
    myAccountDetails = new AccountDetailsModel;
    myAccount = new AccountModel;
    receiver = new AccountDetailsModel;
    isReceiverExist = false;
    amount: number;
    transaction = new TransactionModel;

  constructor(
    private accountService: AccountService,
    public transactionService: TransactionService,
  ) {}

  ngOnInit() {
    this.getAccounts();
    this.getMyAccountDetails();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(a => this.accounts = a);
  }

  getMyAccountDetails() {
      var accountLocalStorage = JSON.parse(localStorage.account);
      this.accountService.getAccount(accountLocalStorage.name).subscribe(a => this.myAccountDetails = a);
  }

  pullReceiver(name: string) {
    this.isReceiverExist = true;
    this.accountService.getAccount(name).subscribe(a => this.receiver = a);
  }

  executeTransaction(sender: string, receiver: string) {
    console.log(this.amount);
    this.transaction.sender = sender;
    this.transaction.receiver = receiver;
    this.transaction.amount = this.amount;
    this.transactionService.execute(this.transaction).subscribe(() => {
        this.amount = 0;
        this.receiver.balance += this.amount;
        this.myAccountDetails.balance -= this.amount;
    });
  }
}