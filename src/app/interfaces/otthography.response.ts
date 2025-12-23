export interface Error {
  original: string;
  correction: string;
  position: number;
}

export interface OrtographyResponse {
  correctedText: string;
  errors: Error[];
  message: string;
}
