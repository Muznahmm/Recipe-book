import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UsernameValidators } from '../../shared/validators/username.validator';
import { PasswordValidators, strongPasswordErrors } from '../../shared/validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword= true;

  // valueFromService = this.authService.getValue();
  
  signupForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    userName: new FormControl('', [ Validators.required, UsernameValidators.cannotContainSpace]),
    password: new FormControl('', [Validators.required, PasswordValidators.shouldBeStrong(6, 10)]),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

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
        return `Must contain more than ${errors.maxLength} charecters`;
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
