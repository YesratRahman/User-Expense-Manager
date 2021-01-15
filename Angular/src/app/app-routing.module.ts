import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {CreateExpenseComponent} from './create-expense/create-expense.component';

const routes: Routes = [
  {path: 'registerTest', component: RegisterComponent},
  {path: 'loginTest', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'createTest', component: CreateExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
