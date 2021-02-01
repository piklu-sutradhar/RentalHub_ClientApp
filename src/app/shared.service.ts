import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly BaseURL = 'https://localhost:44359/api/';
  constructor(private http: HttpClient) { }

  getPropertyList(): Observable<any[]>{
    return this.http.get<any>(this.BaseURL + 'properties');
  }

  getRenterList(): Observable<any[]>{
    return this.http.get<any>(this.BaseURL + 'renters');
  }

  getRenteesList(): Observable<any[]>{
    return this.http.get<any>(this.BaseURL + 'rentees');
  }
}
