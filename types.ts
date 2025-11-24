export interface ProcessedImage {
  originalUrl: string;
  generatedUrl: string | null;
}

export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface GenerationError {
  message: string;
}
