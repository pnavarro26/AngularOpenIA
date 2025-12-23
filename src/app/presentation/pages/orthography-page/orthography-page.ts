import { Component, inject, signal } from '@angular/core';
import {
  GptMessage,
  GptMessageOrthography,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAI } from 'app/presentation/services/open-ai';

@Component({
  selector: 'app-orthography-page',
  imports: [
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    GptMessageOrthography,
  ],
  templateUrl: './orthography-page.html',
  styles: ``,
})
export default class OrthographyPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAI);

  handleMessage(promt: string) {
    this.isLoading.set(true);

    this.messages.update((prevmessages) => [
      ...prevmessages,
      { isGpt: false, text: promt },
    ]);

    this.openAiService.checkOrthography(promt).subscribe((response) => {
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
            text: response.correctedText,
            info: {
              correctedText: response.correctedText,
              errors: response.errors,
              message: response.message,
            },
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

  /*handleMessageWithFile(promt: TextMessageBoxFileForm) {
    console.log({ promt });
  }

  handleMessageSelect(promt: any) {
    console.log({ promt });
  }*/
}
