import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit, OnDestroy{
  @ViewChild('form') form!: NgForm;
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
  ) { }
  /**
   * here onint is loaded after it check constructor
   * if you want the change after view rendered we need to use this method
   * but view is rendered after so we need to user AfterViewInit
   */
  ngAfterViewInit() {
    // const user = this.authService.getUser();
    this.subscription = this.authService.user$.subscribe(user => {
      if(user) {
        setTimeout(() => {
          this.form.setValue({
            username: user.username
          });
        })
      }
    })
  }
  // ngOnInit(): void {
  //   const user = this.authService.getUser();

  //   if(user) {
  //     this.form.setValue({
  //       username: user.username
  //     })
  //   }
  // }
  onSubmit() {
    /**
     * Check the for is valid
     */
    if (!this.form.valid) {
      return;
    }
    
    this.authService.updateUsername(this.form.value)
    .subscribe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
