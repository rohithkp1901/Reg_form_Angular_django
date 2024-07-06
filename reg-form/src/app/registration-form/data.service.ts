import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries/`);
  }

  getStates(countryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/country/${countryId}/states/`);
  }

  getDistricts(stateId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/state/${stateId}/districts/`);
  }
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrations/`, data);
  }
}
