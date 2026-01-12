import { ChatResponse } from '@interfaces/chat-stream.response.ts';
import { environment } from 'environments/environment';

export const createThreadUseCase = async (chatId: string, prompt?: string) => {
  try {
    console.log(chatId);
    console.log(prompt);
    const resp = await fetch(`${environment.backendApiUrl}/chat-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, prompt }),
    });

    //console.log(resp);
    if (!resp.ok) throw new Error('Error al crear chat');

    const { data } = (await resp.json()) as { data: string; chatId: string };

    //console.log(data);
    return data;
  } catch (error) {
    throw new Error('Error creating thread ID');
  }
};
