export type Lang = 'en' | 'de';

export type GuideMode = 'coding' | 'serviceOps';

export enum SlideType {
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  COMPARISON = 'COMPARISON',
  PLAYGROUND = 'PLAYGROUND',
  END = 'END'
}

export type IconName = keyof typeof import('lucide-react');

export interface SlideData {
  id: number;
  type: SlideType;
  icon?: IconName;
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
  codeVokuprompt?: string;
  codeVokupromptDE?: string;
}
