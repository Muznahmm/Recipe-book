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
  hidePassword= true;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    this.authService
    .login(form.value)
    .subscribe( _ => {
      this.router.navigateByUrl('/home');
    },
    err => {
      console.log('Login Failed', err);
    });
  }
}
