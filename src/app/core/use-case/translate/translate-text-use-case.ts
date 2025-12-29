import { TranslateResponse } from '@interfaces/index';
import { environment } from '../../../../environments/environment';

export const TranslateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(`${environment.backendApiUrl}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la traducción');

    console.log({ response });

    const { translation } = (await response.json()) as TranslateResponse;

    return {
      ok: true,
      message: translation,
    };
  } catch (error) {
    console.error('Error in translate use case:', error);
    console.error(error);
    return {
      ok: false,
      message: '',
    };
  }
};
