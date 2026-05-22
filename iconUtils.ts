import * as Icons from 'lucide-react';
import { IconName } from './types';

const isLucideIcon = (candidate: unknown): candidate is Icons.LucideIcon =>
  typeof candidate === 'function';

export const resolveIcon = (iconName?: IconName): Icons.LucideIcon => {
  const candidate = iconName ? Icons[iconName] : undefined;
  return isLucideIcon(candidate) ? candidate : Icons.HelpCircle;
};
