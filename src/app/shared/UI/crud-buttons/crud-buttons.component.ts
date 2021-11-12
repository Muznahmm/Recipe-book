import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudEventTypes } from 'src/app/helpers/types';

@Component({
  selector: 'crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent {
  @Input('hideAddIcon') hideAdd!: boolean;
  @Input('hideEditIcon') hideEdit!: boolean;
  @Input('hideViewIcon') hideView!: boolean;
  @Input('hideDeleteIcon') hideDelete!: boolean;
  
  @Output('view') view = new EventEmitter(); 


constructor() { }

  onView(eventType: CrudEventTypes) {
    this.view.emit(eventType)
  }

}
