import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Forms } from '../forms';
import { FormsService } from '../forms.service';
import { FormResponseService } from './form-response.service';
import { formResponse } from './formResponse';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { QuestionService } from './question.service';
import { Question } from './question';
import { AnswerService } from './answer.service';
import { Answer } from './answer';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit {


  public forms: Forms[];

  public questions: Question[];

  public answers: Answer[];

  content?: string;
  

  constructor(private formsService: FormsService, 
    private FormResponseService: FormResponseService, 
    private questionService: QuestionService,
    private answerService: AnswerService ) { }

  ngOnInit(): void {
    this.getForms();
    this.getQuestionByIdTipForm(2);
    
  }

  // this.forms[0].idTip

  public getForms():void{
    this.formsService.getForms().subscribe(
      (response: Forms[]) =>
      {
        this.forms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }





  public onSendFormResponse(addForm: NgForm): void{
    document.getElementById('send-form-response').click();
    this.FormResponseService.sendFormResponse(addForm.value).subscribe(
      (response: formResponse) =>{
        console.log(response);
        this.getForms();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
        }
    );
  }

  public getQuestionByIdTipForm(idTip:number):void{
    this.questionService.findQuestionByIdTipForm(idTip).subscribe(
      (response: Question[]) =>
      {
       this.questions=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    );
  }

  public getAnswersByIdQuestion(idQuestion: number):void{
    this.answerService.getAnswersByIdQuestion(idQuestion).subscribe(
      (response: Answer[]) =>
      {
        this.answers=response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

 

}




