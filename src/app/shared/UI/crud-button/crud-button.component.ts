import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'crud-button',
  templateUrl: './crud-button.component.html',
  styleUrls: ['./crud-button.component.scss']
})
export class CrudButtonComponent {
  @Input('iconName') icon !: string;

  @Output('press') press = new EventEmitter()

  constructor() { }

  onClickButton(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.press.emit()
  }

}
