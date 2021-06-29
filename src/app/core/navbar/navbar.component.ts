import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

}
