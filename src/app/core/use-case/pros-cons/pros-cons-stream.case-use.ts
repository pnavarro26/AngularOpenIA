import { environment } from 'environments/environment';

// Caso de uso para obtener pros y contras en streaming
// utilizando la API del backend
// que a su vez interactúa con el servicio de Gemini de Google
// para generar la respuesta en tiempo real
// funcion generadora asíncrona
// que devuelve un stream de datos
// cada vez que se recibe un nuevo chunk de datos
// se devuelve el texto acumulado hasta el momento
// permitiendo procesar la respuesta en tiempo real
export async function* prosConsStreamUseCase(
  prompt: string,
  abortSignal?: AbortSignal
) {
  try {
    console.log('prosConsUseCase called with prompt:', prompt);
    const response = await fetch(
      `${environment.backendApiUrl}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );

    //console.log('Response from backend:', response);

    if (!response.ok) throw new Error('No se pudo realizar la comparación');

    // Obtener el lector del cuerpo de la respuesta
    const reader = response.body?.getReader();

    // Verificar que el lector exista
    if (!reader) {
      console.error('No se pudo generar el reader');
      throw new Error('No se pudo leer la respuesta');
    }

    const decoder = new TextDecoder('utf-8');

    let text = '';
    while (true) {
      // Leer los datos del stream
      // value, valor del chunk
      // done, indica si el stream ha terminado, bandera boolean
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      yield text;
    }
    return text;
  } catch (error) {
    return null;
  }
}
