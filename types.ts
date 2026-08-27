export type Lang = 'en' | 'de';

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
  /** The one-off prompt written for exactly this case. */
  codeStandard?: string;
  /** The reusable method that builds the work order for any case like it. */
  codeOptimized?: string;
  codeStandardDE?: string;
  codeOptimizedDE?: string;
  /** What pass 1 produces from the method plus the current material. */
  codeWorkOrder?: string;
  codeWorkOrderDE?: string;
}
