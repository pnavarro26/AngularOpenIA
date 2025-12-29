import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
} from 'app/core/use-case';
import { TranslateTextUseCase } from 'app/core/use-case/translate/translate-text-use-case';

@Injectable({
  providedIn: 'root',
})
export class OpenAI {
  // Metodo para interactuar con el servicio de Gemini de Google
  // y realizar la corrección ortográfica
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  // Metodo para interactuar con el servicio de Gemini de Google
  // y realizar la comparación de pros y contras
  prosCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  // Metodo para interactuar con el servicio de Gemini de Google
  // y realizar la comparación de pros y contras
  prosConsStream(prompt: string, abortSignal?: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  // Metodo para traducir texto a otro idioma //
  translate(prompt: string, lang: string) {
    return from(TranslateTextUseCase(prompt, lang));
  }
}
