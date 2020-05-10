import { Injectable } from '@angular/core';

import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { UserService } from '../user.service';
import * as userActions from '../state/user.actions';

import { Response } from './../../app.models';
import { User } from '../user.model';

@Injectable()
export class UserEffect{
    constructor(
        private actions$: Actions,
        private userService: UserService
    ){}

    @Effect()
    loadUsers$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType<userActions.LoadUsers>(
                userActions.UserActionTypes.LOAD_USERS
            ),
            mergeMap((actions: userActions.LoadUsers) => 
                this.userService.getUsers().pipe(
                    map(
                        (usersResponse: Response<User[]>) => {
                            if(usersResponse.code == 0){
                                return new userActions.LoadUsersSuccess(usersResponse.data);
                            }
                        }
                    ),
                    catchError(err => of(new userActions.LoadUsersFailed(err)))
                )
            )
        )
    });
}