import { ACTION_LOGIN, ACTION_LOGOUT } from './store/actions/appActions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppReducerState } from './store/reducers/appReducers';

interface ResponseData {
  status: 'ok' | 'error';
  data: string;
}

@Injectable()
export class AuthService {

  private loggedInStatus = false;

  constructor(private http: HttpClient, private store: Store<AppReducerState>) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    if (this.loggedInStatus) {
      this.store.dispatch({type: ACTION_LOGIN});
    } else {
      this.store.dispatch({type: ACTION_LOGOUT});
    }
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(email: string, password: string) {
    // post these details to API server return user info if correct
    return this.http.post<ResponseData>('/api/login/', {email, password});
  }

  registerUser(email: string, password: string) {
    // post these details to API server return user info if correct
    return this.http.post<ResponseData>('/api/register/', {email, password});
  }
}
