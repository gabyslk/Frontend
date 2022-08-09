import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';  
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Answer } from './answer';


@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiServerUrl = 'http://localhost:8080';
  
  constructor (private http: HttpClient){}


  public getAnswersByIdQuestion(idQuestion: number):Observable<Answer[]>{
    return this.http.get<any>(`${this.apiServerUrl}/answer/find/${idQuestion}`);   
  }

  public getIdAnswerByIdQuestionAndSelectedValue(idQuestion:number, selectedValue:number):Observable<Answer>{
    return this.http.get<any>(`${this.apiServerUrl}/answer/find/${idQuestion}${selectedValue}`);
  }

}
