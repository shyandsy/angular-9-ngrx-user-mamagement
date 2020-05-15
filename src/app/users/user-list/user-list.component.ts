import { Component, OnInit } from '@angular/core';

import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as userActions from '../state/user.actions';
import * as fromUser from '../state/user.reducer';

import {User} from './../user.model';
import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  errors$: Observable<String>;

  constructor(private store: Store<fromUser.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new userActions.LoadUsers());
    
    // 调用reducer的getUsers方法
    this.users$ = this.store.pipe(select(fromUser.getUsers));
    //this.store.subscribe(state => (this.users = state.users.users));
  }

  editUser(user: User){
    this.store.dispatch(new userActions.LoadUser(user.id))
  }

  deleteUser(user:User){
    if(confirm("确定删除用户?")){
      this.store.dispatch(new userActions.DeleteUser(user.id))
    }
  }
}
