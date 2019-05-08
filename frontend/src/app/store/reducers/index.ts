import { reducer, AppReducerState } from './appReducers';
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
    appReducer: AppReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
    appReducer: reducer
};
