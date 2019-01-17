import { BrowseAccountsComponent } from './browse/browse-accounts.component';
import { Routes } from '@angular/router';
import { JoinComponent } from './join/join.component';

export const AccountsRoutes: Routes = [{
  path: '',
  children: [
  { path: 'accounts', component: BrowseAccountsComponent },
  { path: 'join', component: JoinComponent },
  // { path: ':name', component: AccountDetailsComponent }

  // { path: 'settings', component: AccountSettingsComponent },
  // { path: 'sign-in', component: SignInComponent },
  // { path: 'sign-up', component: SignUpComponent, canActivate: [AdminGuard] },
]}];
