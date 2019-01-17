import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './full/full.component';

const routes: Routes = [
  { path: '', component: FullComponent,
    children: [
    { path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }