import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule { }
