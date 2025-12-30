export interface Error {
  original: string;
  correction: string;
  position: number;
}

export interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    correctedText: string;
    errors: Error[];
    message: string;
  };
  audioURL?: string;
}
