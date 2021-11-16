import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

interface NavLink {
  name: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // username = this.authService.getUser()?.username;
  username = '';

  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.subscription = this.authService.user$
    .subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });

    this.authService.getAccountDetails().subscribe();
  }

  links: NavLink[] = [
    {
      name: 'Contacts',
      path: '/contacts',
    },
    {
      name: 'Transactions',
      path: '/transactions',
    }
  ];

  // get userName() {
  //   return this.authService.getUser()?.username;
  // }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
