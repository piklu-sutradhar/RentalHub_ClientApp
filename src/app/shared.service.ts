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
  userName: null;
  role: null;

  constructor(private http: HttpClient, private router: Router) { }

  getPropertyList(): Observable<any[]> {
    return this.http.get<any>(this.BaseURL + 'properties', httpOptions);
  }

  getRenter(userId: string): Observable<any[]> {
    return this.http.get<any>(this.BaseURL + 'renters/' + userId, httpOptions);
  }

  addRenterProperty(id: string, model: any): Observable<any> {
    return this.http.post(this.BaseURL + 'renters/' + id, model, httpOptions);
  }

  removeRenterProperty(id: string, propertyId: string ): Observable<any> {
    return this.http.delete(this.BaseURL + 'renters/' + id + '?propertyId=' + propertyId, httpOptions);
  }

  getRenteesList(): Observable<any[]> {
    return this.http.get<any>(this.BaseURL + 'rentees');
  }

  login(model: any): Observable<void> {
    return this.http.post(this.AuthUrl + 'Login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user.result.succeeded) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.helper.decodeToken(user.token);
          this.userName = user.user.normalizedUserName;
          this.role = this.decodedToken?.role;
          console.log(this.decodedToken);
        }
      })
    );
  }

  getProfile(userId: any): Observable<any> {
    return this.http.get<any>(this.BaseURL + 'Profiles/' + userId, httpOptions);
  }

  deleteProfile(id: string): Observable<void> {
    return this.http.delete<any>(this.BaseURL + 'Profiles/' + id, httpOptions);
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token') ?? '';
    return !this.helper.isTokenExpired(token);
  }

  isRenter(): boolean {
    const token = localStorage.getItem('token') ?? '';
    const role = this.helper.decodeToken(token)?.role;

    return role?.toLowerCase() === 'renter';
  }

  register(model: any): Observable<any> {
    return this.http.post(this.AuthUrl + 'Register', model);
  }

  logout = (): void => {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    // this.service.currentUser = null;
    // this.service.decodedToken = null;
    console.log('Logged out');
  }

}
