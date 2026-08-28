export type Lang = 'en' | 'de';

export enum SlideType {
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  COMPARISON = 'COMPARISON',
  END = 'END'
}

export type IconName = keyof typeof import('lucide-react');

export type VisualKind =
  | 'legacy-recap'
  | 'legacy-timejump'
  | 'carwash'
  | 'noise-hallucination'
  | 'tokens'
  | 'next-token'
  | 'compiler'
  | 'authority-map'
  | 'evidence-board'
  | 'agent-loop'
  | 'toolbox'
  | 'library';

export interface SlideData {
  id: number;
  type: SlideType;
  icon?: IconName;
  visual?: VisualKind;
  title: string;
  subtitle?: string;
  content?: string | string[];
  technique?: string;
  titleDE?: string;
  subtitleDE?: string;
  contentDE?: string | string[];
  techniqueDE?: string;
  codeStandard?: string;
  codeOptimized?: string;
  codeStandardDE?: string;
  codeOptimizedDE?: string;
  codeWorkOrder?: string;
  codeWorkOrderDE?: string;
}
