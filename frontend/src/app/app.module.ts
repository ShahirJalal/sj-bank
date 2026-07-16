import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HeaderComponent } from './header/header.component';
import { DepositComponent } from './deposit/deposit.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TransactionListComponent,
    UserListComponent,
    ConfirmationComponent,
    HeaderComponent,
    DepositComponent,
    TransferComponent,
    WithdrawComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
