import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as userActions from '../state/user.actions';
import * as fromUser from '../state/user.reducer';
import { User } from '../user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,                  // inject FormBuilder
    private store: Store<fromUser.AppState> 
  ) { }

  ngOnInit(): void {
    // 创建表单
    this.userForm = this.fb.group({
      id: null,
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

    // 订阅当前user
    const user$: Observable<User> = this.store.select(
      fromUser.getCurrentUser      
    )

    user$.subscribe(currentUser => {
      if(currentUser){
        console.log("user id := " + currentUser.id)
        this.userForm.patchValue({
          id: currentUser.id,
          username: currentUser.username,
          password: currentUser.password,
          role_id: currentUser.role_id,
          cnname: currentUser.cnname,
          enname: currentUser.enname,
          email: currentUser.email,
          telephone: currentUser.telephone,
          mobile: currentUser.mobile,
          fax: currentUser.fax,
          address: currentUser.address,
          post: currentUser.post,
          expired: currentUser.expired,
          status: currentUser.status
        })
      }
    })
  }

  updateUser(){
    console.log(this.userForm.value)
    console.log("更新用户")
    console.log("user id := " + this.userForm.value.id)
    const newUser: User = //this.userForm.value;
    {
      id: this.userForm.value.id,
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
      new userActions.UpdateUser(newUser)
    )

    this.userForm.reset()
  }

}
