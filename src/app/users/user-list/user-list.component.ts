import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as userActions from '../state/user.actions';

import {User} from './../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new userActions.LoadUsers());
    this.store.subscribe(state => (this.users = state.users.users));
  }
}
