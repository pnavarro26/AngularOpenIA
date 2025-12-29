import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from '@angular/forms';

export interface TextMessageBoxFileForm {
  prompt: string;
  file: File | null;
}

@Component({
  selector: 'app-text-message-box-file',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-file.html',
  styles: ``,
})
export class TextMessageBoxFile {
  @Input() placeholder: string = '';

  @Output() onMessage: EventEmitter<TextMessageBoxFileForm> =
    new EventEmitter();

  public fb = inject(FormBuilder);

  public form = this.fb.group({
    prompt: [''],
    file: [null, Validators.required],
  });

  public file: File | undefined = undefined;

  handleSelectFile(event: any) {
    const file = event.target.files.item(0);
    this.form.controls.file.setValue(file);

    console.log({ file });
  }

  handleSumit() {
    if (this.form.invalid) return;

    const { prompt, file } = this.form.value;
    const message: TextMessageBoxFileForm = {
      prompt: prompt ?? '',
      file: file ?? null,
    };
    console.log({ prompt });

    // Emit the message
    this.onMessage.emit(message);

    // Reset the form
    this.form.reset();
  }
}
