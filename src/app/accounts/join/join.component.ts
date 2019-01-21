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
  joinForm: FormGroup;
  submitDisabled: boolean;
  submitted: boolean;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.joinForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  join() {
    console.log(this.joinForm.value.name);
    if (this.joinForm.invalid) {
        return;
    }
    this.account.name = this.joinForm.value.name;
    this.accountService.setAccount(this.account);
    this.accountService.createAccount(this.account).subscribe(() => {
      this.name = '';
    });
  }
}