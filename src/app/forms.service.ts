import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';  
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forms } from './forms';

@Injectable({
    providedIn: 'root'
  })
export class FormsService {

    private apiServerUrl = 'http://localhost:8080';
  
    constructor (private http: HttpClient){}

    public getForms():Observable<Forms[]>{
        return this.http.get<any>(`${this.apiServerUrl}/forms/all`);
    }

    public getFormByIdTip(IdTip: number):Observable<Forms>{
        return this.http.get<any>(`${this.apiServerUrl}/forms/find/${IdTip}`);
    }

}