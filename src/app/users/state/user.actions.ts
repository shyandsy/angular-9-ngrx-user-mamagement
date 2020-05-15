import { Action } from '@ngrx/store';

import { Update } from '@ngrx/entity';

import { User } from '../user.model';

export enum UserActionTypes {
    LOAD_USERS = "[User] Load Users",
    LOAD_USERS_SUCESS = "[User] Load Users Success",
    LOAD_USERS_FAILED = "[User] Load Users Failed",

    // 增加单个user load操作
    LOAD_USER = "[User] Load User",
    LOAD_USER_SUCESS = "[User] Load User Success",
    LOAD_USER_FAILED = "[User] Load User Failed",

    // 增加create user
    CREATE_USER = "[User] Create User",
    CREATE_USER_SUCESS = "[User] Create User Success",
    CREATE_USER_FAILED = "[User] Create User Failed",

    // 增加update user
    UPDATE_USER = "[User] Update User",
    UPDATE_USER_SUCESS = "[User] Update User Success",
    UPDATE_USER_FAILED = "[User] Update User Failed",

    // 增加delete user
    DELETE_USER = "[User] Delete User",
    DELETE_USER_SUCESS = "[User] Delete User Success",
    DELETE_USER_FAILED = "[User] Delete User Failed",
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

// 增加加载单个user
export class LoadUser implements Action{
    readonly type = UserActionTypes.LOAD_USER;
    constructor(public payload: number) {}          // 使用id来加载
}
export class LoadUserSuccess implements Action{
    readonly type = UserActionTypes.LOAD_USER_SUCESS;
    constructor(public payload: User) {}
}
export class LoadUserFailed implements Action{
    readonly type = UserActionTypes.LOAD_USER_FAILED;
    constructor(public payload: string) {}
}

// 增加update user
export class UpdateUser implements Action{
    readonly type = UserActionTypes.UPDATE_USER;
    constructor(public payload: User) {}                // 提交user对象
}
export class UpdateUserSuccess implements Action{
    readonly type = UserActionTypes.UPDATE_USER_SUCESS;
    constructor(public payload: Update<User>) {}        // 使用ngrx/entity的Update
}
export class UpdateUserFailed implements Action{
    readonly type = UserActionTypes.UPDATE_USER_FAILED;
    constructor(public payload: string) {}
}

// 增加create user
export class CreateUser implements Action{
    readonly type = UserActionTypes.CREATE_USER;
    constructor(public payload: User) {}
}
export class CreateUserSuccess implements Action{
    readonly type = UserActionTypes.CREATE_USER_SUCESS;
    constructor(public payload: User) {}
}
export class CreateUserFailed implements Action{
    readonly type = UserActionTypes.CREATE_USER_FAILED;
    constructor(public payload: string) {}
}

// 增加delete user
export class DeleteUser implements Action{
    readonly type = UserActionTypes.DELETE_USER;
    constructor(public payload: number) {}              // 使用id来删除对象
}
export class DeleteUserSuccess implements Action{
    readonly type = UserActionTypes.DELETE_USER_SUCESS;
    constructor(public payload: number) {}              // 返回id
}
export class DeleteUserFailed implements Action{
    readonly type = UserActionTypes.DELETE_USER_FAILED;
    constructor(public payload: string) {}
}

export type ACTION = LoadUsers | LoadUsersSuccess | LoadUsersFailed |
    LoadUser | LoadUserSuccess | LoadUserFailed | 
    UpdateUser | UpdateUserSuccess | UpdateUserFailed |
    CreateUser | CreateUserSuccess | CreateUserFailed |
    DeleteUser | DeleteUserSuccess | DeleteUserFailed
;