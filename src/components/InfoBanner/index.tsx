'use client';

import { useState } from "react";

type BannerType = 'announce' | 'approved' | 'executed' | 'none';

interface BannerContent {
  title: string;
  description: React.ReactNode;
}

const getBannerContent = (type: BannerType): BannerContent | null => {
  switch (type) {
    case 'announce':
      return {
        title: 'New Proposal: Coreum to join TX.',
        description: (
          <>
            A unified ecosystem, infrastructure, and marketplace for real-world assets, supported by globally regulated partners. Voting starts <span style={{ color: '#FFF', fontFamily: 'var(--font-figtree)', fontSize: '14px', fontStyle: 'normal', fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.14px' }}>February 5th</span>. Learn more at{' '}
            <a href="https://tx.org/vote" target="_blank" rel="noopener noreferrer" style={{ color: '#B1FC03', fontFamily: 'var(--font-figtree)', fontSize: '14px', fontStyle: 'normal', fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.14px', textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationSkipInk: 'auto', textDecorationThickness: 'auto', textUnderlineOffset: 'auto', textUnderlinePosition: 'from-font' }}>
              tx.org/vote
            </a>
          </>
        ),
      };
    case 'approved':
      return {
        title: 'Update: The proposal for Coreum to join TX has passed!',
        description: (
          <>
            The network migration will take effect at <span style={{ color: '#FFF', fontFamily: 'var(--font-figtree)', fontSize: '14px', fontStyle: 'normal', fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.14px' }}>00:00:00 EST on March 6th</span>. Learn more about the details{' '}
            <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: '#B1FC03', fontFamily: 'var(--font-figtree)', fontSize: '14px', fontStyle: 'normal', fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.14px', textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationSkipInk: 'auto', textDecorationThickness: 'auto', textUnderlineOffset: 'auto', textUnderlinePosition: 'from-font' }}>
              here
            </a>.
          </>
        ),
      };
    case 'executed':
      return {
        title: 'Upgrade complete: Coreum is now TX',
        description: (
          <>
            The network migration has been successfully executed. Head to{' '}
            <a href="https://tx.org" target="_blank" rel="noopener noreferrer" style={{ color: '#B1FC03', fontFamily: 'var(--font-figtree)', fontSize: '14px', fontStyle: 'normal', fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.14px', textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationSkipInk: 'auto', textDecorationThickness: 'auto', textUnderlineOffset: 'auto', textUnderlinePosition: 'from-font' }}>
              tx.org
            </a>.
          </>
        ),
      };
    case 'none':
    default:
      return null;
  }
};

export const InfoBanner = () => {
  const [isOpen, setIsOpen] = useState(true);

  const bannerType = (process.env.NEXT_PUBLIC_BANNER_TYPE as BannerType) || 'announce';

  console.log('NEXT_PUBLIC_BANNER_TYPE: ',process.env.NEXT_PUBLIC_BANNER_TYPE)
  const content = getBannerContent(bannerType);

  if (!isOpen || !content) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-6">
      <div className="flex flex-col gap-0.5 w-full px-5 py-3 relative backdrop-blur-xs bg-radial-green-gradient rounded-xl border border-banner-border-color">
        <p style={{ color: '#FFF', fontFamily: 'var(--font-figtree)', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: '165%' }} className="pr-4">
          {content.title}
        </p>
        <p style={{ color: '#BBB', fontFamily: 'var(--font-figtree)', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.14px' }}>
          {content.description}
        </p>
        <div
          className="absolute p-1 top-3 right-3 cursor-pointer hover:opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.15502 6.27981C5.17872 6.25612 5.19203 6.22398 5.19203 6.19048C5.19203 6.15697 5.17872 6.12484 5.15502 6.10114L0.195948 1.14207C-0.0653159 0.880804 -0.0653159 0.457211 0.195948 0.195948C0.457211 -0.0653159 0.880804 -0.0653159 1.14207 0.195948L6.10114 5.15502C6.15048 5.20436 6.23047 5.20436 6.27981 5.15502L11.2387 0.196142C11.5 -0.0651231 11.9235 -0.0651225 12.1848 0.196142C12.4461 0.457405 12.4461 0.880997 12.1848 1.14226L7.22593 6.10114C7.17659 6.15048 7.17659 6.23047 7.22593 6.27981L12.1848 11.2387C12.4461 11.5 12.4461 11.9235 12.1848 12.1848C11.9235 12.4461 11.5 12.4461 11.2387 12.1848L6.27981 7.22593C6.23047 7.17659 6.15048 7.17659 6.10114 7.22593L1.14207 12.185C0.880804 12.4463 0.457211 12.4463 0.195948 12.185C-0.0653159 11.9237 -0.0653159 11.5001 0.195948 11.2389L5.15502 6.27981Z"
              fill="#D2D2D2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
