import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { eventTypes } from 'src/app/helpers/types';

@Component({
  selector: 'crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent {
@Output('view') view = new EventEmitter(); 


constructor() { }

  onView(eventType: eventTypes) {
    this.view.emit(eventType)
  }

}
