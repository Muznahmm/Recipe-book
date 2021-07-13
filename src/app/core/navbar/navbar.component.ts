import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
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

  get userName() {
    return this.authService.getUser()?.username;
  }

}
