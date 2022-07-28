import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = environment.apiUrl;

  token = environment.token;

  getHeaders() {
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    };
    return header;
  }

  public getDropDownUsers(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/private/users/dropdown-options`,
      this.getHeaders()
    );
  }

  public saveTeam(json: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/private/teams`,
      json,
      this.getHeaders()
    );
  }

  public getTeams(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/private/teams`,
      this.getHeaders()
    );
  }
}
