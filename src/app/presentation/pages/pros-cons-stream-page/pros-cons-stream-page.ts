import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAI } from 'app/presentation/services/open-ai';

@Component({
  selector: 'app-pros-cons-stream-page',
  imports: [CommonModule, GptMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './pros-cons-stream-page.html',
  styles: ``,
})
export default class ProsConsStreamPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public abortSignal = signal(new AbortController());

  public openAiService = inject(OpenAI);

  // manejar el envio de mensajes
  async handleMessage(prompt: string) {
    // cancelar cualquier solicitud en curso
    this.abortSignal().abort();
    // crear una nueva señal de aborto
    this.abortSignal.set(new AbortController());

    this.messages.update((msgs) => [
      ...msgs,
      { isGpt: false, text: prompt } as Message,
      { isGpt: true, text: '...' } as Message,
    ]);

    this.isLoading.set(true);
    const stream = this.openAiService.prosConsStream(
      prompt,
      this.abortSignal().signal
    );
    this.isLoading.set(false);
    // espera todos los valores del stream generado
    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(message: string) {
    // eliminar el ultimo mensaje de '...'
    this.messages().pop();

    const messages = this.messages();

    this.messages.set([...messages, { isGpt: true, text: message } as Message]);
  }
}
