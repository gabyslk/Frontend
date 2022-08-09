import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';  
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formResponse } from './formResponse';

@Injectable({
  providedIn: 'root'
})
export class FormResponseService {
  private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public sendFormResponse(formResponse: formResponse):Observable<formResponse>{
    return this.http.post<formResponse>(`${this.apiServerUrl}/forms/send`, formResponse);
}




// public addEmployee(employee: Employee ):Observable<Employee>{
//   return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);

// }

// public updateEmployee(employee: Employee ):Observable<Employee>{
//   return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
// }
}
