import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowseAccountsComponent } from './browse/browse-accounts.component';
import { AccountsRoutes } from './accounts.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinComponent } from './join/join.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
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
