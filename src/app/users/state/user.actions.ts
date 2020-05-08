import { Action } from '@ngrx/store';
import { User } from '../user.model';

export enum UserActionTypes {
    LOAD_USERS = "[User] Load Users",
    LOAD_USERS_SUCESS = "[User] Load Users Success",
    LOAD_USERS_FAILED = "[User] Load Users Failed",
}

export class LoadUsers implements Action{
    readonly type = UserActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action{
    readonly type = UserActionTypes.LOAD_USERS_SUCESS;

    constructor(public payload: User[]) {}
}

export class LoadUsersFailed implements Action{
    readonly type = UserActionTypes.LOAD_USERS_FAILED;

    constructor(public payload: string) {}
}

export type ACTION = LoadUsers | LoadUsersSuccess | LoadUsersFailed;