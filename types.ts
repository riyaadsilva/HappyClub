
export enum TranslationStatus {
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface TranslationHistoryItem {
  id: string;
  timestamp: number;
  type: 'sign-to-text' | 'text-to-sign';
  input: string; // text or video filename/thumb
  output: string; // text or sign video sequence
}

export interface SignSequence {
  word: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface TranslationResponse {
  result: string;
  confidence: number;
  metadata?: any;
}
