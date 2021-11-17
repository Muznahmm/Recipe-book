import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UsernameValidators,PasswordValidators, strongPasswordErrors  } from '../../utils/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  hidePassword = true;
  hideConfirmPassword= true;
  signUpInProgress = false;

  // valueFromService = this.authService.getValue();
  
  signupForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    userName: new FormControl('', [ Validators.required, UsernameValidators.cannotContainSpace]),
    password: new FormControl('', [Validators.required, PasswordValidators.shouldBeStrong(6, 10)]),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private passwordSubs!: Subscription;

  ngOnInit(): void {
    this.passwordSubs = this.password.valueChanges
    .subscribe( value => {
      this.confirmPassword.clearValidators();
      this.confirmPassword.setValidators([
        Validators.required,
        PasswordValidators.shouldMatch(value),
      ]);
      this.confirmPassword.updateValueAndValidity();
    });
  }

  ngOnDestroy() {
    this.passwordSubs.unsubscribe();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signUpInProgress = true;

      this.authService.signup(this.signupForm.value)
      .subscribe(_ => {
        this.signUpInProgress = false;
        this.resetSignupForm();
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log('Error:',err)
      });
    }
  }

  private resetSignupForm() {
    this.signupForm.reset();

    for (let control in this.signupForm.controls) {
      this.signupForm.controls[control].setErrors(null);
    }
  }

  get userName() {
    return this.signupForm.get('userName') as FormControl;
  }

  get email() {
    return this.signupForm.get('email') as FormControl;
  }

  get password() {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  getEmailError(){
    if(this.email.hasError('required')){
      return 'This field is required!';
    }
    if(this.email.hasError('email')){
      return 'Invalid email!';
    }
    return null;
  }

  getUsernameError(){
    if(this.userName.hasError('required')){
      return 'This field is required!';
    }
    if(this.userName.hasError('cannotContainSpace')){
      return 'Should not contain spaces!'
    }
    return null;
  }

  getPasswordError(){
    if (this.password.hasError('required')) {
      return 'This field is required!';
    }

    if (this.password.hasError('shouldBeStrong')) {
      const errors = (this.password.errors! as strongPasswordErrors).shouldBeStrong;

      if ( errors.requiredLength) {
        return `Required minimum ${errors.requiredLength} charecters`;
      }

      if ( errors.maxLength) {
        return `Must not contain more than ${errors.maxLength} charecters`;
      }

      if ( errors.requireSpecialCharacter) {
        return `Must contain atleast one special charecters`;
      }

      if ( errors.requiredLowerCaseCharacter) {
        return `Must contain atleat one lower case charecters`;
      }

      if ( errors.requiredUpperCaseCharacter) {
        return `Must contain atleat one Upper case charecters`
      }

      if ( errors.requiredNumericalCharacter) {
        return `Must contain atleat one numerical charecters`
      }

    }

    return null;
  }

  getConfirmPasswordError(){
    if(this.confirmPassword.hasError('required')){
      return 'This field is required!';
    }

    if(this.confirmPassword.hasError('shouldMatch')){
      return 'Does not match the original password!';
    }

    return null;
  }

  // setValue() {
  //   this.authService.setValue('Sign up');
  // }

  // getValue() {
  //   this.valueFromService = this.authService.getValue();
  // }

}
