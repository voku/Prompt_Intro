export type Lang = 'en' | 'de';

export enum SlideType {
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  COMPARISON = 'COMPARISON',
  CHAPTER = 'CHAPTER',
  STATEMENT = 'STATEMENT',
  END = 'END'
}

export type { IconName } from './iconUtils';
import type { IconName } from './iconUtils';

export type VisualKind =
  | 'legacy-recap'
  | 'legacy-timejump'
  | 'carwash'
  | 'unpuzzle'
  | 'noise-hallucination'
  | 'tokens'
  | 'next-token'
  | 'toolbox'
  | 'guidance-ladder'
  | 'vpn-status'
  | 'bug-quota'
  | 'compliance-gates';

export interface SlideData {
  id: number;
  type: SlideType;
  icon?: IconName;
  visual?: VisualKind;
  /** 1-based chapter number, only used by CHAPTER slides. */
  chapter?: number;
  /** Step on the guidance staircase (1–4) a comparison slide illustrates. */
  step?: number;
  title: string;
  subtitle?: string;
  content?: string | string[];
  technique?: string;
  topic?: string;
  /** Pointe revealed on the next click before advancing. */
  punchline?: string;
  /** Question that leads into the next slide ("follow the white rabbit"). */
  punchlineNext?: string;
  titleDE?: string;
  subtitleDE?: string;
  contentDE?: string | string[];
  techniqueDE?: string;
  topicDE?: string;
  punchlineDE?: string;
  punchlineNextDE?: string;
  codeStandard?: string;
  codeOptimized?: string;
  codeStandardDE?: string;
  codeOptimizedDE?: string;
  /** Output of the optimised prompt (e.g. script result or a `| table |`), shown under it. */
  codeResult?: string;
  codeResultDE?: string;
  /** Stable deep-link anchor, e.g. `#vorlagen`. */
  anchor?: string;
  codeWorkOrder?: string;
  codeWorkOrderDE?: string;
}
