import { Component, inject, signal } from '@angular/core';

import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxFileForm,
  TypingLoader,
} from '@components/index';
import { OpenAI } from 'app/presentation/services/open-ai';
import { Message } from '@interfaces/message.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-template',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './chat-template.html',
  styles: ``,
})
export class ChatTemplate {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAI);

  handleMessage(prompt: string) {
    console.log({ prompt });
  }
}
