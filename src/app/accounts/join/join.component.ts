import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/shared/models/account-model';
import { AccountService } from 'src/app/shared/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  accounts: AccountModel[];
  joinForm: FormGroup;
  submitDisabled: boolean;
  submitted: boolean;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    if (this.accountService.accountSaved) {
      this.accountService.getMyAccount().subscribe(account => {
        this.accountService.login();
        this.router.navigate(['/main']);
        return;
      }, error => {
        this.accountService.logout();
      });
    }

    this.joinForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  join() {
    if (this.joinForm.invalid) {
        return;
    }
    const accountName = this.joinForm.value.name;
    this.accountService.createAccount(accountName).subscribe(() => {
      this.accountService.setAccount(accountName);
      this.toastr.success('Successfully joined!');
      this.accountService.login();
      this.router.navigate(['/main']);
    });
  }
}
