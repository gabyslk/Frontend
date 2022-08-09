import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Forms } from '../forms';
import { FormsService } from '../forms.service';
import { FormResponseService } from './services/form-response.service';
import { formResponse } from './services/formResponse';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { QuestionService } from './services/question.service';
import { Question } from './services/question';
import { AnswerService } from './services/answer.service';
import { Answer } from './services/answer';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  idUser: number;
  showDiv: boolean = true;
  showForm1: boolean = false;

  public forms: Forms[];

  public form: Forms;

  public questions: Question[];

  public answers: Answer[];
  
  public formResponse: formResponse;

  public currentFormType: number;

  public answerBySelectedValue: Answer;

  content?: string;


  constructor(private token: TokenStorageService, private formsService: FormsService, 
    private FormResponseService: FormResponseService, 
    private questionService: QuestionService,
    private answerService: AnswerService) { }

  ngOnInit(): void {
   this.idUser=this.token.getUser().id;
  //  this.getForms();
   
      
  }

  showDivFunction(){
    this.showDiv=false;
    this.showForm1=true;
  }

  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

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

  public getFormByIdTip(idTip:number):void{
    this.formsService.getFormByIdTip(idTip).subscribe(
      (response:Forms) =>
      {
        this.form = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public setFormTypeAsReviewOthers(){
    this.currentFormType=1;
    this.getFormByIdTip(this.currentFormType);
    this.getQuestionByIdTipForm(this.currentFormType);
  }

  public setFormTypeAsReviewYourself(){
    this.currentFormType=2;
    this.getFormByIdTip(this.currentFormType);
    this.getQuestionByIdTipForm(this.currentFormType);
  
  }

  public addIdAnswerByIdQuestionAndSelectedValue(idQuestion:number, selectedValue:number){
    this.answerService.getIdAnswerByIdQuestionAndSelectedValue(idQuestion, selectedValue).subscribe(
      (response: Answer) =>
      {
        this.answerBySelectedValue=response;
        this.formResponse.responses += this.answerBySelectedValue.id.toString() + ",";
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addIdAnswer(idAnswer:number){
    this.formResponse.responses += idAnswer.toString() + ",";
  }

  





}
