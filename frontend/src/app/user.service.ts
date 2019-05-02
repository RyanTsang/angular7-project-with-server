import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
  quote: string;
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  status: "ok" | "error",
  data?: string
}

interface quoteInterface {
  status: "ok" | "error"
}

interface RespData {
  status: 'ok' | 'error';
  user: User;
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.post<RespData>('/api/data/', null);
  }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.post<isLoggedIn>('/api/isloggedin/', null);
  }

  logout() {
    return this.http.post<logoutStatus>('/api/logout/', null);
  }

  updateQuote(quote: string) {
    console.log('send update request');
    return this.http.post<quoteInterface>('/api/updatequote', { quote });
  }

}
