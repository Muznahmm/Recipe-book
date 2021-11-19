import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hidePassword = true;
  public disableButton = false;
  private loginError = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    this.disableButton = true;
    this.authService
    .login(form.value)
    .subscribe( _ => {
      this.disableButton = false;
      this.router.navigateByUrl('/contacts');
    },
    err => {
      this.disableButton = false;
      this.loginError = true;
      console.log('Login Failed', err);
    });
  }
}
