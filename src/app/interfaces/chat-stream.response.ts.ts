export interface ChatResponse {
  data: Data;
  chatId: string;
}

export interface Data {
  sdkHttpResponse: SDKHTTPResponse;
  candidates: Candidate[];
  modelVersion: string;
  responseId: string;
  usageMetadata: UsageMetadata;
}

export interface Candidate {
  content: Content;
  finishReason: string;
  index: number;
}

export interface Content {
  parts: Part[];
  role: string;
}

export interface Part {
  text: string;
}

export interface SDKHTTPResponse {
  headers: Headers;
}

export interface Headers {
  'alt-svc': string;
  'content-encoding': string;
  'content-type': string;
  date: string;
  server: string;
  'server-timing': string;
  'transfer-encoding': string;
  vary: string;
  'x-content-type-options': string;
  'x-frame-options': string;
  'x-xss-protection': string;
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  promptTokensDetails: PromptTokensDetail[];
  thoughtsTokenCount: number;
}

export interface PromptTokensDetail {
  modality: string;
  tokenCount: number;
}
