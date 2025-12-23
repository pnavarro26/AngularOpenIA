import { OrtographyResponse } from '@interfaces/otthography.response';
import { environment } from '../../../../environments/environment';

export const orthographyUseCase = async (promt: string) => {
  try {
    const response = await fetch(
      `${environment.backendApiUrl}/otthography-check`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promt }),
      }
    );

    if (!response.ok)
      throw new Error('No se pudo realizar la corección ortográfica');

    const date = (await response.json()) as OrtographyResponse;

    return {
      ok: true,
      ...date,
    };
  } catch (error) {
    console.error('Error in orthography use case:', error);
    return {
      ok: false,
      correctedText: '',
      errors: [],
      message: 'No se pudo realizar la corrección ortográfica en este momento.',
    };
  }
};
