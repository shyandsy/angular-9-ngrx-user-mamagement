import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { UserEffect } from './state/user.effects';

import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const userRoutes: Routes = [
  {path:"", component: UserComponent,},
  //{path:"/users/add", component: UserAddComponent}
];

@NgModule({
  declarations: [
    UserComponent, 
    UserAddComponent, 
    UserEditComponent, 
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature("users", userReducer),
    EffectsModule.forFeature([UserEffect])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[
    UserAddComponent,
    UserEditComponent,
    UserListComponent
  ]
})
export class UsersModule { }
