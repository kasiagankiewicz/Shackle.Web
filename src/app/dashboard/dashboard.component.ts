import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { AccountModel } from '../shared/models/account-model';
import { AccountDetailsModel } from '../shared/models/account-details-model';
import { TransactionService } from '../shared/trasaction.service';
import { TransactionModel } from '../shared/models/transaction-model';
import { BlockchainService } from '../shared/blockchain.service';
import { BlockchainModel } from '../shared/models/blockchain-model';
import { forEach } from '@angular/router/src/utils/collection';
import { BlockModel } from '../shared/models/block-model';
import { Router } from '@angular/router';

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
    blockchain = new BlockchainModel;
    isBlockExist = false;
    block = new BlockModel;
    transactions: TransactionModel[];
    myName: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService,
    public blockchainService: BlockchainService,
  ) {}

  ngOnInit() {
    if (!localStorage.account) {
      this.router.navigate(['/join']);
    }

    this.getAccounts();
    this.getMyAccountDetails();
    this.getBlockchain();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(a => this.accounts = a);
  }

  getMyAccountDetails() {
      var accountLocalStorage = JSON.parse(localStorage.account);
      this.accountService.getAccount(accountLocalStorage.name).subscribe(a => {
        this.myAccountDetails = a
        this.myAccount.name = this.myAccountDetails.name;
        this.myAccount.address = this.myAccountDetails.address;
        this.myAccount.balance = this.myAccountDetails.balance;
        var index = this.accounts.indexOf(this.myAccount);
        this.accounts.splice(index);
      });
  }

  getReceiver(name: string) {
    this.isReceiverExist = true;
    this.accountService.getAccount(name).subscribe(a => this.receiver = a);
  }

  executeTransaction(sender: string, receiver: string) {
    this.transaction.sender = sender;
    this.transaction.receiver = receiver;
    this.transaction.amount = this.amount;
    this.transactionService.execute(this.transaction).subscribe(() => {
        this.receiver.balance += this.amount;
        this.myAccountDetails.balance -= this.amount;
        this.amount = 0;
    });
  }

  getBlockchain() {
    setTimeout(() => {
      this.blockchainService.browse().subscribe(b => {
        this.blockchain = b
        this.blockchain.blocks.reverse();
      });
      this.getBlockchain();
    }, 1000);
  }

  getLength(block: BlockModel) {
    if (!block) {
      return 0;
    }
    return block.transactions.length;
  }

  getBlock(block: BlockModel) {
    this.isBlockExist = true;
    this.blockchainService.getBlock(block.index).subscribe(b => this.block = b);
    this.transactions = block.transactions;
  }

  truncate(text: string) {
    return text.length <= 10 ? text : `${text.substring(0, 9)}...`;
  }
}