import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `<div class="container">
      <mat-card>
        <ng-content></ng-content>
      </mat-card>
    </div>`,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
