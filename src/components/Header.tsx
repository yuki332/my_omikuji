import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Scroll, HeartHandshake, Compass } from 'lucide-react';
import { getJapaneseDateString } from '../data/omikujiData';
import { shrineAudio } from '../utils/audioSynth';

export type ActiveTab = 'draw' | 'tying' | 'ledger' | 'ai_priest';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  tiedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  tiedCount,
}) => {
  const [isMuted, setIsMuted] = useState(shrineAudio.getMuteState());
  const [isBgmOn, setIsBgmOn] = useState(shrineAudio.getBgmState());
  const dateInfo = getJapaneseDateString();

  const handleToggleMute = () => {
    const muted = shrineAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleBgm = () => {
    const bgmPlaying = shrineAudio.toggleAmbientBgm();
    setIsBgmOn(bgmPlaying);
  };

  return (
    <header className="relative z-20 border-b border-[#D4AF37]/30 bg-[#FFFDF9]/90 backdrop-blur-md px-4 sm:px-8 py-4 shadow-sm">
      {/* Top Shrine Header Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Shrine Title with Crimson Accent */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('draw')}>
          <div className="w-1.5 h-12 bg-gradient-to-b from-[#A81C1C] via-[#B8860B] to-[#A81C1C] rounded-sm shadow-[0_0_10px_rgba(168,28,28,0.3)]" />
          <div>
            <div className="text-[10px] sm:text-xs tracking-[0.4em] text-[#8B6208] uppercase font-serif flex items-center gap-2 font-bold">
              <span>Reiwa Era Divine Fortune</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#A81C1C] animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-normal tracking-[0.2em] text-[#2D2A26] font-serif flex items-center gap-3">
              令和 縁結び神託御神籤
            </h1>
          </div>
        </div>

        {/* Japanese Traditional Date & Audio Controls */}
        <div className="flex items-center gap-6 text-right">
          <div className="hidden sm:block">
            <div className="text-[10px] tracking-[0.2em] text-[#8B732D] opacity-80 font-bold">奉納参拝日</div>
            <div className="text-sm font-semibold tracking-widest text-[#8B6208] font-serif">
              {dateInfo.eraDate}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F2E6] border border-[#D4AF37]/40 p-1.5 rounded-md shadow-inner">
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded transition-colors ${
                isMuted ? 'bg-[#A81C1C]/20 text-[#A81C1C]' : 'text-[#8B6208] hover:bg-[#D4AF37]/20'
              }`}
              title={isMuted ? '消音中 (クリックで解除)' : '効果音あり'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleToggleBgm}
              className={`p-2 rounded flex items-center gap-1.5 text-xs tracking-wider transition-colors ${
                isBgmOn
                  ? 'bg-[#B8860B]/20 text-[#8B6208] border border-[#B8860B]/50 shadow-[0_0_8px_rgba(184,134,11,0.2)] font-bold'
                  : 'text-[#5C5648] hover:text-[#8B6208] hover:bg-[#EFE8D8]'
              }`}
              title="雅楽・神社鳴動音（環境音）"
            >
              <Music className="w-4 h-4 text-[#8B6208]" />
              <span className="hidden md:inline font-serif text-[11px]">{isBgmOn ? '神楽音 中' : '神楽音'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="max-w-6xl mx-auto mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-center sm:justify-start gap-1 sm:gap-3 overflow-x-auto text-xs sm:text-sm font-serif">
        <button
          onClick={() => setActiveTab('draw')}
          className={`flex items-center gap-2 px-3 sm:px-5 py-2 transition-all duration-300 border-b-2 whitespace-nowrap rounded-t ${
            activeTab === 'draw'
              ? 'border-[#B8860B] text-[#8B6208] bg-[#F4EFE3] font-bold shadow-sm'
              : 'border-transparent text-[#5C5648] hover:text-[#8B6208] hover:bg-[#F9F5EC]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#B8860B]" />
          <span>おみくじを引く</span>
        </button>

        <button
          onClick={() => setActiveTab('tying')}
          className={`flex items-center gap-2 px-3 sm:px-5 py-2 transition-all duration-300 border-b-2 whitespace-nowrap relative rounded-t ${
            activeTab === 'tying'
              ? 'border-[#B8860B] text-[#8B6208] bg-[#F4EFE3] font-bold shadow-sm'
              : 'border-transparent text-[#5C5648] hover:text-[#8B6208] hover:bg-[#F9F5EC]'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-[#A81C1C]" />
          <span>結び処（みくじ掛け）</span>
          {tiedCount > 0 && (
            <span className="text-[10px] bg-[#A81C1C] text-white px-1.5 py-0.5 rounded-full font-sans">
              {tiedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex items-center gap-2 px-3 sm:px-5 py-2 transition-all duration-300 border-b-2 whitespace-nowrap relative rounded-t ${
            activeTab === 'ledger'
              ? 'border-[#B8860B] text-[#8B6208] bg-[#F4EFE3] font-bold shadow-sm'
              : 'border-transparent text-[#5C5648] hover:text-[#8B6208] hover:bg-[#F9F5EC]'
          }`}
        >
          <Scroll className="w-4 h-4 text-[#B8860B]" />
          <span>おみくじ帖</span>
          {savedCount > 0 && (
            <span className="text-[10px] bg-[#B8860B] text-white px-1.5 py-0.5 rounded-full font-bold font-sans">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('ai_priest')}
          className={`flex items-center gap-2 px-3 sm:px-5 py-2 transition-all duration-300 border-b-2 whitespace-nowrap rounded-t ${
            activeTab === 'ai_priest'
              ? 'border-[#B8860B] text-[#8B6208] bg-[#F4EFE3] font-bold shadow-sm'
              : 'border-transparent text-[#5C5648] hover:text-[#8B6208] hover:bg-[#F9F5EC]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#B8860B] animate-pulse" />
          <span>AI神主・巫女の部屋</span>
        </button>
      </nav>
    </header>
  );
};
