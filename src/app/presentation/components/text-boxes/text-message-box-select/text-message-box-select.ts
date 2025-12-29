import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Opion {
  id: string;
  text: string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-select.html',
  styles: ``,
})
export class TextMessageBoxSelect {
  @Input() placeholder: string = '';
  @Input() options: Opion[] = [];

  @Output() onMessage: EventEmitter<any> = new EventEmitter();

  public fb = inject(FormBuilder);

  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required],
  });

  handleSumit() {
    if (this.form.invalid) return;

    const { prompt, selectedOption } = this.form.value;

    // Emit the message
    this.onMessage.emit({ prompt, selectedOption });

    // Reset the form
    this.form.reset();
  }
}
