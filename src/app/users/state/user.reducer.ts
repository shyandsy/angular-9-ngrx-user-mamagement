import * as userAction from './user.actions';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';

import {EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromRoot from '../../state/app-state';
import { User } from '../user.model';

export interface UserState extends EntityState<User>{
    selectedUserId: number | null;
    loading: boolean,
    loaded: boolean,
    error: string,
}

export interface AppState extends fromRoot.AppState{
    users: UserState;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const defaultUser: UserState = {
    ids: [],
    entities: {},
    selectedUserId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState: UserState = userAdapter.getInitialState(defaultUser);

export function userReducer(state = initialState, action: userAction.ACTION): UserState{
    switch(action.type){
        case userAction.UserActionTypes.LOAD_USERS:{
            console.log("reducer: LOAD_USERS")
            return {
                ...state,
                loading: true,
            }
        }
        case userAction.UserActionTypes.LOAD_USERS_SUCESS:{
            console.log("reducer: LOAD_USERS_SUCESS")
            return userAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true,
            })
        }
        case userAction.UserActionTypes.LOAD_USERS_FAILED:{
            console.log("reducer: LOAD_USERS_FAILED")
            return {
                ...state,
                entities: {},
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

const getUserFeatureState = createFeatureSelector<UserState>(
    "users"
)

export const getUsers = createSelector(
    getUserFeatureState,
    userAdapter.getSelectors().selectAll
)

export const getUsersLoading = createSelector(
    getUserFeatureState,
    (state: UserState) => state.loading
)

export const getUsersLoaded = createSelector(
    getUserFeatureState,
    (state: UserState) => state.loaded
)

export const getError = createSelector(
    getUserFeatureState,
    (state: UserState) => state.error
)