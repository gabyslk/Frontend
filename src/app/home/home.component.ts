import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

    div1:boolean=true;
    div2:boolean=true;
    div3:boolean=true;

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  div1Function(){
    this.div1=true;
    this.div2=false;
    this.div3=false
}

  div2Function(){
    this.div2=true;
    this.div1=false;
    this.div3=false
  }

  div3Function(){
    this.div3=true;
    this.div2=false;
    this.div1=false
  }
}
