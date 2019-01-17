import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsModule } from './accounts/accounts.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FullComponent } from './full/full.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    HeaderComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AccountsModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
