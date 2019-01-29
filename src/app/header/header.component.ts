import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { AccountDetailsModel } from '../shared/models/account-details-model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

    myAccountDetails = new AccountDetailsModel;
    accountExists = this.accountService.accountExists$;

    constructor(
        private router: Router,
        private accountService: AccountService,
        private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.accountService.accountName$.subscribe(accountName => {
            if (accountName) {
                this.getMyAccountDetails();
            }
        });
    }

    getMyAccountDetails() {
        this.accountService.getMyAccount()
            .subscribe(account => this.myAccountDetails = account);
    }

    logout() {
        this.toastr.info('You logged out');
        this.accountService.logout();
        this.router.navigate(['/join']);
    }
}
