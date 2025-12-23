import { Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-gpt-message',
  imports: [MarkdownModule],
  templateUrl: './gpt-message.html',
  styles: ``,
})
export class GptMessage {
  @Input({ required: true }) text!: string;
}
