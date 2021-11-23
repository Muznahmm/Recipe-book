import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UsernameValidators,PasswordValidators, StrongPasswordErrors  } from '../../utils/validators';
import { FormCanDeactivate } from 'src/app/utils/guards/form-alert/form-can-deactivate';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends FormCanDeactivate implements OnInit, OnDestroy {
  public hidePassword = true;
  public hideConfirmPassword= true;
  public signUpInProgress = false;

  // valueFromService = this.authService.getValue();
  
  signupForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    username: new FormControl(
      '',
      [ Validators.required, UsernameValidators.cannotContainSpace],
      [ this.usernameValidators.taken ],
    ),
    password: new FormControl('', [Validators.required, PasswordValidators.shouldBeStrong(6, 10)]),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService,
    private usernameValidators: UsernameValidators,
  ) {
    super();
  }

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

  onSignUp() {
    if (this.signupForm.valid) {
      this.signUpInProgress = true;

      this.authService.signup(this.signupForm.value)
      .subscribe(res => {
      //   this.notifierService.notify(
      //     'success',
      //     'Account Created Successfully'
      //   );
      
      //   this.signUpInProgress = false;
      //   this.resetSignupForm();
      //   this.router.navigateByUrl('/login');
      // },
      // err => {
      //   this.signUpInProgress = false;
        //   if (err.error.errors.email) {
          //     this.email.setErrors({taken: true})
          //   }
      // });

        this.signUpInProgress = false;
        if (res.success) {

          this.notifierService.notify(
            'success',
            'Account Created Successfully',
          );
    
          this.resetSignupForm();
          this.router.navigateByUrl('/login');

          } else {
            if (res.error) {
              if (res.error.email) {
                this.email.setErrors({ taken: true })
              }
            }
          }
        
      });
    }
  }

  private resetSignupForm() {
    this.signupForm.reset();

    for (let control in this.signupForm.controls) {
      this.signupForm.controls[control].setErrors(null);
    }
  }

  get formRef() {
    return this.signupForm;
  }

  get username() {
    return this.signupForm.get('username') as FormControl;
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
    if (this.email.hasError('required')) {
      return 'This field is required!';
    }

    if (this.email.hasError('email')) {
      return 'Invalid email!';
    }

    if (this.email.hasError('taken')) {
      return 'Email is aleady in use!'
    }
    return null;
  }

  getUsernameError(){
    if(this.username.hasError('required')){
      return 'This field is required!';
    }
    if(this.username.hasError('cannotContainSpace')){
      return 'Should not contain spaces!'
    }

    if(this.username.hasError('taken')){
      return 'Username is already in use!'
    }

    return null;
  }

  getPasswordError(){
    if (this.password.hasError('required')) {
      return 'This field is required!';
    }

    if (this.password.hasError('shouldBeStrong')) {
      const errors = (this.password.errors! as StrongPasswordErrors).shouldBeStrong;

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

}
