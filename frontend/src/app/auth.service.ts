import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ResponseData {
  status: 'ok' | 'error';
  data: string;
}

@Injectable()
export class AuthService {

  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
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
