import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DepositComponent } from './deposit/deposit.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { BalanceComponent } from './balance/balance.component';
import { AuthGuard} from "./services/auth.service";
import {ConfirmationComponent} from "./confirmation/confirmation.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionListComponent, canActivate: [AuthGuard] },
  { path: 'balance', component: BalanceComponent, canActivate: [AuthGuard] },
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard] },
  // { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
