import { AudioToTextResponse } from '@interfaces/index';
import { environment } from '../../../../environments/environment';

export const AudioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();

    formData.append('file', audioFile);

    if (prompt) {
      formData.append('prompt', prompt);
    }

    const response = await fetch(`${environment.backendApiUrl}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok)
      throw new Error('No se pudo realizar la corección ortográfica');

    const data = (await response.json()) as AudioToTextResponse; //

    return data;
  } catch (error) {
    console.error('Error in audio to text use case:', error);
    return null;
  }
};
