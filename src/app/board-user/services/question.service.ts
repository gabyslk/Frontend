import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';  
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiServerUrl = 'http://localhost:8080';
  
  constructor (private http: HttpClient){}

  // public getForms():Observable<Forms[]>{
  //   return this.http.get<any>(`${this.apiServerUrl}/forms/all`);

//   public deleteEmployee(employeeId: number ):Observable<void>{
//     return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
// }

  public findQuestionByIdTipForm(IdTip: number):Observable<Question[]>{
     return this.http.get<any>(`${this.apiServerUrl}/question/findQuestions/${IdTip}`);

  }

}
