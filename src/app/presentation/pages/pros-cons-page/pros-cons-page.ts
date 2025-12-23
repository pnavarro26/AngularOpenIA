import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAI } from 'app/presentation/services/open-ai';

@Component({
  selector: 'app-pros-cons-page',
  imports: [CommonModule, GptMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './pros-cons-page.html',
  styles: ``,
})
export default class ProsConsPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAI);

  // Maneja el envío de un nuevo mensaje //
  handleMessage(promt: string) {
    this.isLoading.set(true);

    this.messages.update((prevmessages) => [
      ...prevmessages,
      { isGpt: false, text: promt },
    ]);

    this.openAiService.prosCons(promt).subscribe((response) => {
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
            text: response.respuesta!,
          },
        ]);
      }
      // error en la respuesta
      else {
        this.messages.update((prevmessages) => [
          ...prevmessages,
          {
            isGpt: true,
            text: response.respuesta || 'Hubo un error, intenta de nuevo.',
          },
        ]);
      }
    });
  }
}
