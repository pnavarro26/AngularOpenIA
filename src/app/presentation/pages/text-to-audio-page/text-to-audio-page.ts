import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxEvent,
  TextMessageBoxSelect,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAI } from 'app/presentation/services/open-ai';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBoxSelect,
  ],
  templateUrl: './text-to-audio-page.html',
  styles: ``,
})
export default class TextToAudioPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAI);

  public voices = signal([
    { id: 'Puck', text: 'Puck' },
    { id: 'Kore', text: 'Kore' },
  ]);

  //
  handleMessageSelect(textMessageBoxEvent: TextMessageBoxEvent) {
    const { prompt, selectedOption } = textMessageBoxEvent;

    const message = `${selectedOption} - ${prompt}`;

    console.log({ prompt, selectedOption });

    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);
    this.isLoading.set(true);

    this.openAiService
      .textToAudio(prompt, selectedOption)
      .subscribe(({ message, audioURL }) => {
        this.isLoading.set(false);

        this.messages.update((prev) => [
          ...prev,
          { text: message, isGpt: true, audioURL: audioURL },
        ]);
      });
  }
}
