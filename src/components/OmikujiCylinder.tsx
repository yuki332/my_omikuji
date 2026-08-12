import React, { useState } from 'react';
import { Sparkles, Hand, RefreshCw } from 'lucide-react';
import { OmikujiFortune, getRandomFortune } from '../data/omikujiData';
import { shrineAudio } from '../utils/audioSynth';

interface OmikujiCylinderProps {
  onFortuneDrawn: (fortune: OmikujiFortune, intention: string) => void;
}

export const OmikujiCylinder: React.FC<OmikujiCylinderProps> = ({ onFortuneDrawn }) => {
  const [intention, setIntention] = useState<string>('総合運');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [drawnFortune, setDrawnFortune] = useState<OmikujiFortune | null>(null);
  const [showStick, setShowStick] = useState<boolean>(false);

  const INTENTIONS = [
    '総合運', '恋愛・縁結び', '仕事・学業', '金運・商売', '健康・平穏'
  ];

  const handleStartShake = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    setShowStick(false);
    setDrawnFortune(null);

    // Audio rattle
    shrineAudio.playShakingSound();
    const interval = setInterval(() => {
      shrineAudio.playShakingSound();
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setIsShaking(false);
      
      // Draw fortune
      const result = getRandomFortune();
      setDrawnFortune(result);
      setShowStick(true);
      shrineAudio.playStickSlideSound();
    }, 1800);
  };

  const handleOpenFortune = () => {
    if (drawnFortune) {
      shrineAudio.playFortuneRevealChime();
      onFortuneDrawn(drawnFortune, intention);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-8 px-4 text-center relative z-10">
      
      {/* Subtitle / Guidance */}
      <div className="mb-6 flex flex-col items-center">
        <div className="text-xs tracking-[0.5em] text-[#8B6208] font-bold uppercase font-serif mb-1">
          SHRINE DIVINATION RITUAL
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#A81C1C] font-serif mb-2 drop-shadow-sm">
          二拝二拍手一拝
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5648] max-w-md font-serif leading-relaxed">
          心を静め、願いごとやお悩みを胸に思い浮かべながら、御神籤（おみくじ）の筒をお振りください。
        </p>
      </div>

      {/* Intention Selector */}
      <div className="mb-8 w-full max-w-md">
        <div className="text-[11px] tracking-widest text-[#8B6208] mb-2.5 font-serif text-center font-bold">
          【 祈念する事項を選んで祈願する 】
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {INTENTIONS.map((item) => (
            <button
              key={item}
              onClick={() => setIntention(item)}
              disabled={isShaking}
              className={`px-3.5 py-1.5 text-xs font-serif tracking-wider transition-all rounded border shadow-sm ${
                intention === item
                  ? 'bg-[#A81C1C] text-white border-[#D4AF37] shadow-[0_4px_12px_rgba(168,28,28,0.25)] font-bold scale-105'
                  : 'bg-[#FFFDF9] text-[#2D2A26] border-[#D4AF37]/40 hover:border-[#B8860B] hover:bg-[#F9F5EC]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Omikuji Wooden Cylinder Graphic & Interaction Area */}
      <div className="relative my-6 flex flex-col items-center justify-center">
        
        {/* Popping Stick */}
        <div className="h-28 flex items-end justify-center mb-[-20px] relative z-0 overflow-hidden w-48">
          {showStick && drawnFortune && (
            <div className="animate-stick-out bg-gradient-to-t from-[#B8860B] via-[#E2C258] to-[#FFF8DC] text-[#2D2A26] font-serif px-3 py-6 rounded-t-sm border border-[#8B6208] shadow-[0_0_20px_rgba(212,175,55,0.6)] flex flex-col items-center justify-center font-bold tracking-widest text-sm writing-vertical">
              <span>{drawnFortune.numberKanji}</span>
            </div>
          )}
        </div>

        {/* Cylinder Graphic */}
        <div
          onClick={handleStartShake}
          className={`relative z-10 w-44 sm:w-52 h-72 sm:h-80 cursor-pointer group transition-transform ${
            isShaking ? 'animate-shake' : 'hover:scale-[1.02]'
          }`}
          title="クリックして筒を振る"
        >
          {/* Main Hexagonal Body */}
          <div className="w-full h-full bg-gradient-to-b from-[#2E1A11] via-[#1E110A] to-[#2E1A11] gold-border rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 gold-box">
            
            {/* Top Hole & Brass Rim */}
            <div className="w-full h-8 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#B8860B] rounded-t-lg flex items-center justify-center relative shadow-md">
              <div className="w-8 h-3 bg-[#1A0C06] rounded-full border border-[#D4AF37]" />
            </div>

            {/* Cylinder Label Vertical */}
            <div className="flex-1 flex items-center justify-center py-2 relative">
              {/* Background Shrine Motif Pattern */}
              <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-md shrine-pattern-light opacity-20 pointer-events-none" />

              {/* Shimenawa Rope Banner */}
              <div className="relative bg-[#A81C1C] border-y-2 border-[#D4AF37] px-4 py-6 flex flex-col items-center shadow-xl">
                <span className="text-xs text-[#FFF3D6] tracking-[0.3em] font-serif mb-1 font-bold">神託</span>
                <span className="text-2xl sm:text-3xl font-bold tracking-[0.3em] text-white font-serif writing-vertical drop-shadow">
                  御神籤
                </span>
                <span className="text-[10px] text-[#FFF8DC] tracking-widest mt-2">令和大社</span>
              </div>
            </div>

            {/* Bottom Brass Base */}
            <div className="w-full h-8 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#B8860B] rounded-b-lg flex items-center justify-center relative shadow-md">
              <div className="text-[10px] tracking-widest text-[#2E1A11] font-bold">奉納</div>
            </div>

            {/* Shaking glow overlay */}
            {isShaking && (
              <div className="absolute inset-0 bg-[#FFF5C3]/30 animate-pulse pointer-events-none" />
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          {!showStick ? (
            <button
              onClick={handleStartShake}
              disabled={isShaking}
              className="bg-[#FFFDF9] border-2 border-[#B8860B] px-8 sm:px-12 py-4 text-sm sm:text-base tracking-[0.4em] font-serif text-[#8B6208] font-bold hover:bg-[#A81C1C] hover:text-white hover:border-[#A81C1C] transition-all duration-300 shadow-md flex items-center gap-3 group disabled:opacity-50 rounded"
            >
              {isShaking ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-[#A81C1C]" />
                  <span>神意を伺うております...</span>
                </>
              ) : (
                <>
                  <Hand className="w-5 h-5 text-[#A81C1C] group-hover:text-white" />
                  <span>おみくじ筒を振る</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleOpenFortune}
              className="bg-[#A81C1C] border-2 border-[#D4AF37] px-8 sm:px-12 py-4 text-sm sm:text-base tracking-[0.4em] font-serif text-white hover:bg-[#B8860B] hover:text-white transition-all duration-300 shadow-xl flex items-center gap-3 animate-bounce rounded font-bold"
            >
              <Sparkles className="w-5 h-5 text-[#FFF8DC]" />
              <span>【{drawnFortune?.numberKanji}】みくじ紙を解く</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
