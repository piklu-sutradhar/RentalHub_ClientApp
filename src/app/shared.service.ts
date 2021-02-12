import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly AuthUrl = 'https://localhost:44359/api/Authentication/';
  readonly BaseURL = 'https://localhost:44359/api/';
  helper = new JwtHelperService();
  decodedToken: any;
  userName: any;

  constructor(private http: HttpClient, private router: Router) { }

  getPropertyList(): Observable<any[]> {
    return this.http.get<any>(this.BaseURL + 'properties', httpOptions);
  }

  getRenterList(): Observable<any[]> {
    return this.http.get<any>(this.BaseURL + 'renters');
  }

  getRenteesList(): Observable<any[]> {
    return this.http.get<any>(this.BaseURL + 'rentees');
  }

  login(model: any): Observable<void> {
    return this.http.post(this.AuthUrl + 'Login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user.result) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.helper.decodeToken(user.token);
          this.userName = user.user.normalizedUserName;
          localStorage.setItem('currentUser', user.user.normalizedUserName);
          localStorage.setItem('userId', user.user.id);
          console.log(this.decodedToken);
        }
      })
    );
  }

  getProfile(userId: any): Observable<any> {
    return this.http.get<any>(this.BaseURL + 'Profiles/GetProfile?userId=' + userId, httpOptions)
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token') ?? '';
    return !this.helper.isTokenExpired(token);
  }

  register(model: any): Observable<any> {
    return this.http.post(this.AuthUrl + 'Register', model);
  }

}
