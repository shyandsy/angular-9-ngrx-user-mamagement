import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as userActions from '../state/user.actions';
import * as fromUser from '../state/user.reducer';
import { User } from '../user.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,                  // inject FormBuilder
    private store: Store<fromUser.AppState> 
  ) { 
  }

  ngOnInit(): void {
   
    this.userForm = this.fb.group({
      username: new FormControl("", {validators: [Validators.required,]}),
      password: new FormControl("", {validators: [Validators.minLength(6), Validators.maxLength(32)]}),
      role_id: new FormControl("", {validators: [Validators.required]}),
      cnname: new FormControl("", {validators: [Validators.minLength(2), Validators.maxLength(6)]}),
      enname: new FormControl("", {validators: [Validators.minLength(2), Validators.maxLength(30)]}),
      email: new FormControl("", {validators: [Validators.email]}),
      telephone: new FormControl("", {validators:[Validators.minLength(10), Validators.maxLength(11)]}),
      mobile: new FormControl("", {validators:[Validators.minLength(10), Validators.maxLength(11)]}),
      fax: new FormControl("", {validators:[Validators.minLength(10), Validators.maxLength(11)]}),
      address: new FormControl("", {validators:[Validators.minLength(3), Validators.maxLength(50)]}),
      post: new FormControl("", {validators:[Validators.minLength(6), Validators.maxLength(8)]}),
      expired: new FormControl("", {validators:[Validators.minLength(19), Validators.maxLength(19)]}),
      status: new FormControl("", {validators:[Validators.min(0), Validators.max(1)]}),
    })
  }

  createUser(){
    console.log(this.userForm.value)
    console.log("创建用户")
    const newUser: User = //this.userForm.value;
    
    {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      role_id: this.userForm.value.role_id,
      cnname: this.userForm.value.cnname,
      enname: this.userForm.value.enname,
      email: this.userForm.value.email,
      telephone: this.userForm.value.telephone,
      mobile: this.userForm.value.mobile,
      fax: this.userForm.value.fax,
      address: this.userForm.value.address,
      post: this.userForm.value.post,
      status: this.userForm.value.status,
      token: "",
      ip: "",
      expired: this.userForm.value.expired
    };

    this.store.dispatch(
      new userActions.CreateUser(newUser)
    )

    this.userForm.reset()
  }
}
