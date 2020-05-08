import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

// 这行看起来没有用，但是如果没有这一行，app-user-add, app-user-edit,app-user-list都会报错
import { UsersModule } from './users/users.module';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", loadChildren: "../app/users/users.module#UsersModule" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
