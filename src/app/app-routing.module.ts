import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {  UsersListComponent} from './users-list/users-list.component';
import {EditUserComponent} from './edit-user/edit-user.component'
import { AddUserComponent } from './add-user/add-user.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';

const routes: Routes = [
    {path  : "" , redirectTo : "login" , pathMatch:"full"},
    {path:"login" , component:LoginComponent},
    {path:"dashboard"  , component:DashboardComponent},
    {path:"admin"  , component:AdminComponent},
    {path:"change-password"  , component:ChangePasswordComponent},
    {path:"users-list"  , component:UsersListComponent},
    {path:"edit-user/:id"  , component:EditUserComponent},
    {path:"add-user"  , component:AddUserComponent},
    {path:"add-application"  , component:AddApplicationComponent},
    {path:"edit-application/:id"  , component:EditApplicationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
