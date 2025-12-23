import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
} from 'app/core/use-case';

@Injectable({
  providedIn: 'root',
})
export class OpenAI {
  // Metodo para interactuar con el servicio de Gemini de Google
  // y realizar la corrección ortográfica
  checkOrthography(promt: string) {
    return from(orthographyUseCase(promt));
  }

  // Metodo para interactuar con el servicio de Gemini de Google
  // y realizar la comparación de pros y contras
  prosCons(promt: string) {
    return from(prosConsUseCase(promt));
  }

  // Metodo para interactuar con el servicio de Gemini de Google
  // y realizar la comparación de pros y contras
  prosConsStream(promt: string, abortSignal?: AbortSignal) {
    return prosConsStreamUseCase(promt, abortSignal);
  }
}
