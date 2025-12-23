import { Component, Input } from '@angular/core';
import { Error } from '@interfaces/message.interface';

@Component({
  selector: 'app-gpt-message-orthography',
  imports: [],
  templateUrl: './gpt-message-orthography.html',
  styles: ``,
})
export class GptMessageOrthography {
  @Input({ required: true }) correctedText: string = '';
  @Input() errors?: Error[] = [];
  @Input() message?: string = '';
}
