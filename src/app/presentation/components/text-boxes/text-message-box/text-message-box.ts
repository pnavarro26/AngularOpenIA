import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box.html',
  styles: ``,
})
export class TextMessageBox {
  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;

  @Output() onMessage: EventEmitter<string> = new EventEmitter();

  public fb = inject(FormBuilder);

  public form = this.fb.group({
    promt: ['', Validators.required],
  });

  handleSumit() {
    if (this.form.invalid) return;

    const { promt } = this.form.value;
    console.log({ promt });

    // Emit the message
    this.onMessage.emit(promt ?? '');

    // Reset the form
    this.form.reset();
  }
}
