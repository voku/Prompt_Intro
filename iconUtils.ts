import * as Icons from 'lucide-react';
import { IconName } from './types';

/**
 * Lucide icons are `forwardRef` objects, not plain functions, so a `typeof ===
 * 'function'` guard rejects every real icon and falls back to HelpCircle.
 */
const isLucideIcon = (candidate: unknown): candidate is Icons.LucideIcon =>
  typeof candidate === 'function'
  || (typeof candidate === 'object' && candidate !== null && '$$typeof' in candidate);

export const resolveIcon = (iconName?: IconName): Icons.LucideIcon => {
  const candidate = iconName ? Icons[iconName] : undefined;
  return isLucideIcon(candidate) ? candidate : Icons.HelpCircle;
};
