import { SlideData, SlideType } from './types';

const LEGACY_VISUALS = ['legacy-recap', 'legacy-timejump'];
const WIDE_VISUALS = ['guidance-ladder', 'compliance-gates', 'bug-quota'];

/**
 * How many times "next" reveals more of a slide before moving on.
 * Boxes appear one by one so the audience is not hit with everything at once;
 * a punchline, if present, always comes last.
 */
export const getRevealSteps = (slide: SlideData): number => {
  const points = Array.isArray(slide.content) ? slide.content.length : 0;
  const punch = slide.punchline ? 1 : 0;
  // Title: guardrail chain, then level 1 card, then the level 2 loader.
  if (slide.type === SlideType.TITLE) return 3;
  if (slide.type === SlideType.STATEMENT || slide.type === SlideType.END) return points;
  if (slide.type === SlideType.CONTENT && slide.visual) {
    if (LEGACY_VISUALS.includes(slide.visual) || WIDE_VISUALS.includes(slide.visual)) return points + punch;
  }
  return punch;
};
