import { BrowseAccountsComponent } from './browse/browse-accounts.component';
import { Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';

export const AccountsRoutes: Routes = [
  { path: 'join', component: JoinComponent },
];
