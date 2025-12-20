import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  imports: [],
  templateUrl: './my-message.html',
  styles: ``,
})
export class MyMessage {
  @Input({ required: true }) text!: string;
}
