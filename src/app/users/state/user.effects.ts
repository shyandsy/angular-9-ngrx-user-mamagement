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

    //@Effect()
    loadUsers$: Observable<Action> = createEffect(() => {
        console.log("test111");
        console.log(this.actions$)
        return this.actions$.pipe(
            ofType<userActions.LoadUsers>(
                userActions.UserActionTypes.LOAD_USERS
            ),
            mergeMap((actions: userActions.LoadUsers) => {
                console.log("xxx111")
                console.log(actions)
                return this.userService.getUsers().pipe(
                    map(
                        (usersResponse: Response<User[]>) => {
                            console.log("xxx2222");
                            if(usersResponse.code == 0){
                                return new userActions.LoadUsersSuccess(usersResponse.data);
                            }else{
                                return new userActions.LoadUsersFailed(usersResponse.msg);
                            }
                        }
                    ),
                    catchError(err => of(new userActions.LoadUsersFailed(err)))
                )
            })
        )
    });

    loadUser: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType<userActions.LoadUser>(
                userActions.UserActionTypes.LOAD_USER
            ),
            mergeMap((action: userActions.LoadUser) => {
                console.log(action);
                return this.userService.getUserById(action.payload).pipe(
                    map(
                        (usersResponse: Response<User>) => {
                            if(usersResponse.code == 0){
                                return new userActions.LoadUserSuccess(usersResponse.data);
                            }else{
                                return new userActions.LoadUserFailed(usersResponse.msg);
                            }
                        }
                    ),
                    catchError(err => of(new userActions.LoadUserFailed(err)))
                )
            })
        )
    });

    createUser: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType<userActions.CreateUser>(
                userActions.UserActionTypes.CREATE_USER
            ),
            map((action: userActions.CreateUser) => action.payload),
            mergeMap((user: User) => {
                console.log(user);
                return this.userService.createUser(user).pipe(
                    map(
                        (usersResponse: Response<User>) => {
                            if(usersResponse.code == 0){
                                return new userActions.CreateUserSuccess(usersResponse.data);
                            }else{
                                return new userActions.CreateUserFailed(usersResponse.msg);
                            }
                        }
                    ),
                    catchError(err => of(new userActions.CreateUserFailed(err)))
                )
            })
        )
    });

    updateUser: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType<userActions.UpdateUser>(
                userActions.UserActionTypes.UPDATE_USER
            ),
            map((action: userActions.UpdateUser) => action.payload),
            mergeMap((user: User) => {
                console.log(user);
                return this.userService.updateUser(user).pipe(
                    map(
                        (usersResponse: Response<User>) => {
                            if(usersResponse.code == 0){
                                return new userActions.UpdateUserSuccess({
                                    id: usersResponse.data.id,
                                    changes: usersResponse.data
                                });
                            }else{
                                return new userActions.UpdateUserFailed(usersResponse.msg);
                            }
                        }
                    ),
                    catchError(err => of(new userActions.UpdateUserFailed(err)))
                )
            })
        )
    });

    deletUser: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType<userActions.DeleteUser>(
                userActions.UserActionTypes.DELETE_USER
            ),
            map((action: userActions.DeleteUser) => action.payload),
            mergeMap((id: number) => {
                console.log(id);
                return this.userService.deleteUser(id).pipe(
                    map(
                        (usersResponse: Response<User>) => {
                            if(usersResponse.code == 0){
                                return new userActions.DeleteUserSuccess(id)
                            }else{
                                return new userActions.DeleteUserFailed(usersResponse.msg);
                            }
                        }
                    ),
                    catchError(err => of(new userActions.DeleteUserFailed(err)))
                )
            })
        )
    });
}