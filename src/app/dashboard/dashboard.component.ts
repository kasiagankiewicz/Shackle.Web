import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { AccountModel } from '../shared/models/account-model';
import { AccountDetailsModel } from '../shared/models/account-details-model';
import { TransactionService } from '../shared/trasaction.service';
import { TransactionModel } from '../shared/models/transaction-model';
import { BlockchainService } from '../shared/blockchain.service';
import { BlockchainModel } from '../shared/models/blockchain-model';
import { BlockModel } from '../shared/models/block-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    lastBlock = new BlockModel;
    transactions: TransactionModel[];
    myName: string;
    main = true;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private blockchainService: BlockchainService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    if (this.accountService.accountSaved) {
        this.accountService.getMyAccount().subscribe(account => {
        this.accountService.login();
        this.getMyAccountDetails();
        this.getBlockchain();
        this.getLastBlock();
      }, error => {
        this.accountService.logout();
        this.router.navigate(['/join']);
        return;
      });

      return;
    }

    this.router.navigate(['/join']);
  }

  getMyAccountDetails() {
      this.accountService.getMyAccount().subscribe(account => {
        this.myAccountDetails = account;
        this.myAccount.name = this.myAccountDetails.name;
        this.myAccount.address = this.myAccountDetails.address;
        this.myAccount.balance = this.myAccountDetails.balance;
        this.getAccounts();
      });
  }

  getAccounts() {
    this.accountService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
        const index = this.accounts.indexOf(this.myAccount);
        this.accounts.splice(index);
      });
  }

  getReceiver(name: string) {
    this.isReceiverExist = true;
    this.toastr.info('Receiver ' + name + ' has been chosen');
    this.accountService.getAccount(name).subscribe(a => this.receiver = a);
  }

  executeTransaction(sender: string, receiver: string) {
    this.transaction.sender = sender;
    this.transaction.receiver = receiver;
    if (this.amount <= 0) {
      this.amount = 0;
      this.toastr.error('Amount must be greater than 0');
      return;
    }
    this.transaction.amount = this.amount;
    this.transactionService.execute(this.transaction).subscribe(() => {
        this.toastr.success('Transaction has been executed successfully!');
        this.receiver.balance += this.amount;
        this.myAccountDetails.balance -= this.amount;
        this.amount = 0;
    });
  }

  getBlockchain() {
    this.blockchainService.browse().subscribe(blockchain => {
      this.blockchain = blockchain;
      this.blockchain.blocks.reverse();
    });
  }

  getLastBlock() {
    setTimeout(() => {
      this.blockchainService.getLastBlock().subscribe(block => {
        this.lastBlock = block;
        this.addLastBlock();
      });
      this.getLastBlock();
    }, 3000);
  }

  addLastBlock() {
    if (this.lastBlock.index !== this.blockchain.blocks[0].index) {
      this.blockchain.blocks.unshift(this.lastBlock);
    }
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

  changeView(viewType: string) {
    const main = 'main';
    if (viewType === main) {
      this.main = true;
    } else {
        this.main = false;
    }
  }
}

