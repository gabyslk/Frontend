import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  img1 : string = "assets/img/Login2.jpg"
  img2 : string = "assets/img/slider-img.jpg"
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUsername: string[] = [];
  idCurrentUser: number[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.currentUsername = this.tokenStorage.getUser().username;
      this.idCurrentUser = this.tokenStorage.getUser().id;

    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = "Wrong username or password! Please try again.";
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }

  isAdmin():any {
    if(this.roles.includes("ROLE_ADMIN")){
      return true;
    }
  }
}