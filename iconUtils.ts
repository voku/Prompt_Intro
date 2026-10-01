import {
  AlertTriangle,
  Binary,
  BookOpen,
  BrainCircuit,
  Calculator,
  CarFront,
  CheckCircle,
  Code,
  Compass,
  Eye,
  FastForward,
  FileSpreadsheet,
  Globe,
  HelpCircle,
  History,
  Layers,
  Library,
  ListOrdered,
  LucideIcon,
  NotebookPen,
  Puzzle,
  Repeat,
  ScanSearch,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserCog,
} from 'lucide-react';

/**
 * Explicit registry instead of `import * as Icons`: slide data names its icon as a
 * string, and a namespace import would pull every lucide icon into the bundle.
 */
export const ICONS = {
  AlertTriangle,
  Binary,
  BookOpen,
  BrainCircuit,
  Calculator,
  CarFront,
  CheckCircle,
  Code,
  Compass,
  Eye,
  FastForward,
  FileSpreadsheet,
  Globe,
  History,
  Layers,
  Library,
  ListOrdered,
  NotebookPen,
  Puzzle,
  Repeat,
  ScanSearch,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserCog,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export const resolveIcon = (iconName?: IconName): LucideIcon => (iconName ? ICONS[iconName] : undefined) ?? HelpCircle;
