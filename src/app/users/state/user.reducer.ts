import * as userAction from './user.actions';
import * as fromRoot from '../../state/app-state';
import { User } from '../user.model';

export interface UserState{
    users: User[],
    loading: boolean,
    loaded: boolean,
    error: string,
}

export interface AppState extends fromRoot.AppState{
    users: UserState;
}

export const initialState: UserState= {
    users: [],
    loading: false,
    loaded: true,
    error: "",
}

export function userReducer(state = initialState, action: userAction.ACTION): UserState{
    switch(action.type){
        case userAction.UserActionTypes.LOAD_USERS:{
            return {
                ...state,
                loading: true,
            }
        }
        case userAction.UserActionTypes.LOAD_USERS_SUCESS:{
            return {
                ...state,
                loading: false,
                loaded: true,
                users: action.payload
            }
        }
        case userAction.UserActionTypes.LOAD_USERS_FAILED:{
            return {
                ...state,
                loading: true,
                loaded: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}