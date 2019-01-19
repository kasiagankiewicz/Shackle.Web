import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/shared/models/account-model';
import { AccountService } from 'src/app/shared/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  accounts: AccountModel[];
  account = new AccountModel;
  name: string; 
  nameModel: string; 
  joinForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  onKey(event: any) {
    this.name = event.target.value;
    console.log(this.name);
  }

  createAccount() {
    console.log(this.nameModel);
    this.account.name = this.name;
    this.accountService.setAccount(this.account);
    this.accountService.createAccount(this.account).subscribe(() => {
    }) 
  }
}