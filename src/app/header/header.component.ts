import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { AccountDetailsModel } from '../shared/models/account-details-model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

    myAccountDetails = new AccountDetailsModel;
    isAccountExist = false;

    constructor(
        public router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        if (localStorage.account) {
            this.isAccountExist = true;
        }
        this.getMyAccountDetails();
    }

    getMyAccountDetails() {
        var accountLocalStorage = JSON.parse(localStorage.account);
        this.accountService.getAccount(accountLocalStorage.name).subscribe(a => this.myAccountDetails = a);
    }

    logOut() {
        this.isAccountExist = false;
        localStorage.removeItem("account");
        this.router.navigate(['/join']);
    }
}