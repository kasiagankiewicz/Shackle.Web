import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowseAccountsComponent } from './browse/browse-accounts.component';
import { AccountsRoutes } from './accounts.routing';
import { FormsModule } from '@angular/forms';
import { JoinComponent } from './join/join.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(AccountsRoutes),
  ],
  declarations: [
    BrowseAccountsComponent,
    JoinComponent
  ],
})
export class AccountsModule { }
