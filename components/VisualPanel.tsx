import React from 'react';
import { Lang, VisualKind } from '../types';
import CarwashVisual from './visuals/CarwashVisual';
import UnpuzzleVisual from './visuals/UnpuzzleVisual';
import NoiseVisual from './visuals/NoiseVisual';
import TokensVisual from './visuals/TokensVisual';
import NextTokenVisual from './visuals/NextTokenVisual';
import GuidanceLadderVisual from './visuals/GuidanceLadderVisual';
import VpnStatusVisual from './visuals/VpnStatusVisual';
import BugQuotaVisual from './visuals/BugQuotaVisual';
import ComplianceGatesVisual from './visuals/ComplianceGatesVisual';
import EvidenceBoardVisual from './visuals/EvidenceBoardVisual';

interface VisualPanelProps { kind: VisualKind; lang: Lang; revealed?: boolean; }

const VisualPanel: React.FC<VisualPanelProps> = ({ kind, lang, revealed = false }) => {
  switch (kind) {
    case 'carwash': return <CarwashVisual lang={lang} revealed={revealed} />;
    case 'unpuzzle': return <UnpuzzleVisual lang={lang} revealed={revealed} />;
    case 'noise-hallucination': return <NoiseVisual lang={lang} revealed={revealed} />;
    case 'tokens': return <TokensVisual lang={lang} />;
    case 'next-token': return <NextTokenVisual lang={lang} />;
    case 'guidance-ladder': return <GuidanceLadderVisual lang={lang} />;
    case 'vpn-status': return <VpnStatusVisual lang={lang} revealed={revealed} />;
    case 'bug-quota': return <BugQuotaVisual lang={lang} />;
    case 'compliance-gates': return <ComplianceGatesVisual lang={lang} />;
    case 'evidence-board': return <EvidenceBoardVisual lang={lang} />;
    default: return null;
  }
};

export default VisualPanel;
