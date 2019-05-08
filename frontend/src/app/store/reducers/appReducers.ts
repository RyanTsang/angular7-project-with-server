import * as appActionTypes from '../actions/appActions';
import { Action } from '@ngrx/store';

export interface AppReducerState {
    login: boolean;
}

const initalState: AppReducerState = {
    login: false
};

export function reducer(state = initalState, action: Action) {
    console.log(action);
    switch (action.type) {
        case appActionTypes.ACTION_LOGOUT:
            return {
                ...state,
                login: false
            };
        case appActionTypes.ACTION_LOGIN:
            return {
                ...state,
                login: true
            };
        default:
           return state;
    }
}
