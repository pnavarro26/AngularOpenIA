import { environment } from '../../../../environments/environment';

export const TextToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(`${environment.backendApiUrl}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!response.ok)
      throw new Error('No se pudo realizar la corección ortográfica');

    const audioFile = await response.blob(); //
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioURL: audioUrl,
    };
  } catch (error) {
    //console.error('Error in orthography use case:', error);
    return {
      ok: false,
      message: 'No se pudo generar el audio',
      audioURL: '',
    };
  }
};
