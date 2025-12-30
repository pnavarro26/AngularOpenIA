import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxFile,
  TextMessageBoxFileForm,
} from '@components/index';
import { AudioToTextResponse, Message } from '@interfaces/index';
import { OpenAI } from 'app/presentation/services/open-ai';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBoxFile,
  ],
  templateUrl: './audio-to-text-page.html',
  styles: ``,
})
export default class AudioToTextPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAI);

  //
  handleMessageWithFile(textMessageBoxFileForm: TextMessageBoxFileForm) {
    const { prompt, file } = textMessageBoxFileForm;
    console.log({ prompt, file });

    const text = prompt ?? file?.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update((prev) => [...prev, { isGpt: false, text: text }]);

    this.openAiService
      .audioToText(file!, prompt)
      .subscribe((resp) => this.handleResponse(resp));
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);

    if (!resp) return;

    const text = `## Resumen:
    ${resp.summary}
    `;

    this.messages.update((prev) => [...prev, { isGpt: true, text: text }]);

    for (const segment of resp.segments) {
      const segmentText = `
      __timestamp ${segment.timestamp}__
      __speaker ${segment.speaker}__
      __emotion ${segment.emotion}__
      ${segment.content}`;

      this.messages.update((prev) => [
        ...prev,
        { isGpt: true, text: segmentText },
      ]);
    }
  }
}
