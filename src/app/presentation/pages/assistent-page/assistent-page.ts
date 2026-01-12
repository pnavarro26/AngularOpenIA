import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidV4 } from 'uuid';
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAI } from 'app/presentation/services/open-ai';

@Component({
  selector: 'app-assistent-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './assistent-page.html',
  styles: ``,
})
export default class AssistentPage implements OnInit {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAI);

  public chatId = signal<string>('');

  ngOnInit(): void {
    this.chatId.set(uuidV4());
  }

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        text: prompt,
        isGpt: false,
      },
    ]);

    // llama al servicio
    this.openAiService
      .chatStream(this.chatId(), prompt)
      .subscribe((replies) => {
        //console.log(replies);
        this.isLoading.set(false);

        this.messages.update((prev) => [
          ...prev,
          { text: replies, isGpt: true },
        ]);
      });
  }
}
