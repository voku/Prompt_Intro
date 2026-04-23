export type Lang = 'en' | 'de';

export enum SlideType {
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  COMPARISON = 'COMPARISON',
  END = 'END'
}

export interface SlideData {
  id: number;
  type: SlideType;
  // Name of a lucide-react icon (e.g. "BrainCircuit"). Resolved dynamically via `(Icons as any)[icon]`.
  icon?: string;
  // English (primary)
  title: string;
  subtitle?: string;
  content?: string | string[];
  technique?: string;
  // German variants
  titleDE?: string;
  subtitleDE?: string;
  contentDE?: string | string[];
  techniqueDE?: string;
  // Prompts / code examples (English)
  codeStandard?: string;
  codeOptimized?: string;
  // German variants for the prompt examples
  codeStandardDE?: string;
  codeOptimizedDE?: string;
  // vokuprompt-improved version (hidden/expandable in the slide)
  codeVokuprompt?: string;
  codeVokupromptDE?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}