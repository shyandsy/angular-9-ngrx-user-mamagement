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

        // load user
        case userAction.UserActionTypes.LOAD_USER_SUCESS:{
            console.log("reducer: LOAD_USER_SUCESS")
            return userAdapter.addOne(action.payload, {
                ...state,
                selectedUserId: action.payload.id,
            })
        }
        case userAction.UserActionTypes.LOAD_USER_FAILED:{
            console.log("reducer: LOAD_USER_FAILED")
            return {
                ...state,
                error: action.payload,
            }
        }

        // create user
        case userAction.UserActionTypes.CREATE_USER_SUCESS:{
            console.log("reducer: CREATE_USER_SUCESS")
            return userAdapter.addOne(action.payload, state)
        }
        case userAction.UserActionTypes.CREATE_USER_FAILED:{
            console.log("reducer: CREATE_USER_FAILED")
            return {
                ...state,
                error: action.payload,
            }
        }

        // update user
        case userAction.UserActionTypes.UPDATE_USER_SUCESS:{
            console.log("reducer: UPDATE_USER_SUCESS")
            return userAdapter.updateOne(action.payload, state)
        }
        case userAction.UserActionTypes.UPDATE_USER_FAILED:{
            console.log("reducer: UPDATE_USER_FAILED")
            return {
                ...state,
                error: action.payload,
            }
        }

        // delete user
        case userAction.UserActionTypes.DELETE_USER_SUCESS:{
            console.log("reducer: DELETE_USER_SUCESS")
            return userAdapter.removeOne(action.payload, state)
        }
        case userAction.UserActionTypes.DELETE_USER_FAILED:{
            console.log("reducer: DELETE_USER_FAILED")
            return {
                ...state,
                error: action.payload,
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

export const getCurrentUserId = createSelector(
    getUserFeatureState,
    (state: UserState) => state.selectedUserId
)

export const getCurrentUser = createSelector(
    getUserFeatureState,
    getCurrentUserId,
    state => state.entities[state.selectedUserId]
)