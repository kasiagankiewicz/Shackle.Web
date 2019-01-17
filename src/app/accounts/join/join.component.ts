import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/shared/models/account-model';
import { AccountService } from 'src/app/shared/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  accounts: AccountModel[];
  account = new AccountModel;
  name: string; 
  joinForm: FormGroup;

  constructor(
    private accountService: AccountService,
  ) {}

  ngOnInit() {
  }

  onKey(event: any) {
    this.name = event.target.value;
    console.log(this.name);
  }

  createAccount() {
    this.account.name = this.name;
    this.accountService.createAccount(this.account).subscribe(() => {
    }) 
    this.accountService.setAccount(this.account);
  }

  getAccounts() {
    this.accountService
    .getAccounts()
    .subscribe(a => this.accounts = a);
    console.log(this.accounts);
  }
}