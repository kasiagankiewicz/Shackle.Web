import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './settings/settings.component';

export const DashboardRoutes: Routes = [
  { path: 'main', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
];
