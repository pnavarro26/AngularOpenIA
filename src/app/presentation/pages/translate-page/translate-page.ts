import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  TextMessageBoxEvent,
} from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAI } from 'app/presentation/services/open-ai';

@Component({
  selector: 'app-translate-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBoxSelect,
  ],
  templateUrl: './translate-page.html',
  styles: ``,
})
export default class TranslatePage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAI);

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  handleMessageSelect(textMessageBoxEvent: TextMessageBoxEvent) {
    const { prompt, selectedOption: lang } = textMessageBoxEvent;

    console.log({ prompt, lang });

    this.isLoading.set(true);

    const message = `Traduce el siguiente texto al idioma ${lang}: ${prompt}`;

    this.messages.update((prevmessages) => [
      ...prevmessages,
      { isGpt: false, text: message },
    ]);

    this.openAiService.translate(prompt, lang).subscribe((response) => {
      // ocultar loader
      this.isLoading.set(false);
      console.log({ response });

      // respuesta correcta
      if (response.ok) {
        // actualiza la señal de mensajes con la respuesta del GPT
        this.messages.update((prevmessages) => [
          ...prevmessages,
          {
            isGpt: true,
            text: response.message,
          },
        ]);
      }
      // error en la respuesta
      else {
        this.messages.update((prevmessages) => [
          ...prevmessages,
          {
            isGpt: true,
            text: response.message,
          },
        ]);
      }
    });
  }
}
