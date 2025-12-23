import { environment } from '../../../../environments/environment';
import { ProsConsResponse } from '@interfaces/index';

export const prosConsUseCase = async (prompt: string) => {
  try {
    console.log('prosConsUseCase called with prompt:', prompt);
    const response = await fetch(
      `${environment.backendApiUrl}/pros-cons-discusser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    console.log('Response from backend:', response);

    if (!response.ok) throw new Error('No se pudo realizar la comparación');

    const date = (await response.json()) as ProsConsResponse;

    return {
      ok: true,
      ...date,
    };
  } catch (error) {
    console.error('Error in prosCons use case:', error);
    return {
      ok: false,
      respuesta: '',
    };
  }
};
