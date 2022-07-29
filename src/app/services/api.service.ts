import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsersResponse } from '../types/users.response';
import { TeamRequest } from '../types/team.request';

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

  public getDropDownUsers(): Observable<UsersResponse> {
    return this.httpClient.get<UsersResponse>(
      `${this.apiUrl}/private/users/dropdown-options`,
      this.getHeaders()
    );
  }

  public saveTeam(data: TeamRequest): Observable<UsersResponse> {
    return this.httpClient.post<UsersResponse>(
      `${this.apiUrl}/private/teams`,
      data,
      this.getHeaders()
    );
  }

  // public getTeams(): Observable<any> {
  //   return this.httpClient.get<any>(
  //     `${this.apiUrl}/private/teams`,
  //     this.getHeaders()
  //   );
  // }
}
