export interface AudioToTextResponse {
  summary: string;
  segments: Segment[];
}

export interface Segment {
  speaker: Speaker;
  timestamp: string;
  content: string;
  language: Language;
  language_code: LanguageCode;
  emotion: Emotion;
}

export enum Emotion {
  Happy = 'happy',
  Neutral = 'neutral',
  Sad = 'sad',
  Angry = 'angry',
}

export enum Language {
  Spanish = 'Spanish',
}

export enum LanguageCode {
  Es = 'es',
}

export enum Speaker {
  Hablante1 = 'Hablante 1',
}
