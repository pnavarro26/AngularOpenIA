import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message',
  imports: [],
  templateUrl: './gpt-message.html',
  styles: ``,
})
export class GptMessage {
  @Input({ required: true }) text!: string;
}
