import React, { useState } from 'react';
import { Sparkles, HeartHandshake, Bookmark, Share2, RefreshCw, Feather } from 'lucide-react';
import { OmikujiFortune, getJapaneseDateString } from '../data/omikujiData';
import { shrineAudio } from '../utils/audioSynth';

interface FortuneResultCardProps {
  fortune: OmikujiFortune;
  intention: string;
  onTieToRope: (fortune: OmikujiFortune, wishText: string) => void;
  onSaveToLedger: (fortune: OmikujiFortune) => void;
  onOpenAiPriest: (fortune: OmikujiFortune) => void;
  onOpenShareModal: (fortune: OmikujiFortune) => void;
  onRedraw: () => void;
  isSaved: boolean;
  isTied: boolean;
}

export const FortuneResultCard: React.FC<FortuneResultCardProps> = ({
  fortune,
  intention,
  onTieToRope,
  onSaveToLedger,
  onOpenAiPriest,
  onOpenShareModal,
  onRedraw,
  isSaved,
  isTied,
}) => {
  const [showTieForm, setShowTieForm] = useState(false);
  const [wishInput, setWishInput] = useState('');
  const dateInfo = getJapaneseDateString();

  const handleTieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    shrineAudio.playTiePaperSound();
    onTieToRope(fortune, wishInput || `${intention}の成就と平和を祈願いたします`);
    setShowTieForm(false);
  };

  const getRankBadgeStyle = (rank: string) => {
    switch (rank) {
      case '大吉':
        return 'text-[#A81C1C] text-glow border-[#A81C1C] bg-[#A81C1C]/10 font-black';
      case '中吉':
        return 'text-[#B8860B] border-[#B8860B] bg-[#B8860B]/10 font-bold';
      case '小吉':
      case '吉':
        return 'text-[#8B6208] border-[#8B6208] bg-[#8B6208]/10 font-bold';
      case '末吉':
      case '半吉':
        return 'text-[#6B5722] border-[#6B5722] bg-[#6B5722]/10 font-bold';
      case '凶':
      case '大凶':
        return 'text-[#2D2A26] border-[#2D2A26] bg-gray-200 font-bold';
      default:
        return 'text-[#8B6208] border-[#8B6208]';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 animate-fadeIn relative z-10">
      
      {/* Main Fortune Paper Container (Clean Sacred Paper Style) */}
      <div className="w-full bg-[#FFFDF9] gold-border p-6 sm:p-10 shadow-xl relative rounded-sm mystic-card">
        
        {/* Four Corner Gold Traditional Borders */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#B8860B] opacity-70" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#B8860B] opacity-70" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#B8860B] opacity-70" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#B8860B] opacity-70" />

        {/* Top Header info */}
        <div className="flex justify-between items-start border-b border-[#D4AF37]/30 pb-4 mb-6">
          <div>
            <span className="text-xs text-[#8B6208] tracking-[0.3em] font-serif block mb-1 font-bold">
              {intention} 祈願御神託
            </span>
            <span className="text-lg font-serif text-[#2D2A26] font-bold tracking-widest">
              {fortune.numberKanji}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#8B6208] tracking-widest block font-bold">奉納年月日</span>
            <span className="text-xs text-[#5C5648] font-serif tracking-wider">
              {dateInfo.fullDateKanji}
            </span>
          </div>
        </div>

        {/* Fortune Rank & Seal */}
        <div className="flex flex-col items-center my-6 relative">
          
          {/* Shrine Vermilion Red Stamp Motif */}
          <div className="absolute right-2 top-0 w-16 h-16 border-2 border-[#A81C1C] text-[#A81C1C] rounded-sm p-1 flex items-center justify-center font-serif text-[10px] leading-tight text-center font-bold rotate-12 opacity-80 pointer-events-none select-none">
            令和神社<br />御朱印
          </div>

          <span className="text-xs tracking-[0.6em] text-[#8B6208] font-serif mb-2 uppercase font-bold">
            YOUR DIVINE DESTINY
          </span>

          <div
            className={`text-4xl sm:text-5xl font-black font-serif px-8 py-3 border-2 rounded tracking-[0.3em] my-2 shadow-sm ${getRankBadgeStyle(
              fortune.rank
            )}`}
          >
            {fortune.rank}
          </div>
        </div>

        {/* Waka Poetry Section */}
        <div className="my-8 bg-[#FAF6ED] border-x-2 border-[#D4AF37]/40 p-6 rounded-sm text-center relative shadow-inner">
          <div className="text-[11px] text-[#8B6208] tracking-[0.4em] font-serif mb-3 font-bold uppercase">
            【 御神詠（和歌）】
          </div>

          <p className="text-lg sm:text-xl font-serif text-[#2D2A26] font-bold tracking-widest leading-loose my-2">
            「 {fortune.waka} 」
          </p>

          <p className="text-xs sm:text-sm text-[#5C5648] font-serif leading-relaxed mt-4 pt-3 border-t border-[#D4AF37]/30">
            {fortune.wakaMeaning}
          </p>
        </div>

        {/* Lucky Guidance Attributes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 text-xs font-serif">
          <div className="bg-[#FAF6ED] p-3 rounded border border-[#D4AF37]/30 text-center">
            <span className="text-[10px] text-[#8B6208] block mb-1 font-bold">吉 方 角</span>
            <span className="font-bold text-[#2D2A26] text-sm">{fortune.luckyDirection}</span>
          </div>
          <div className="bg-[#FAF6ED] p-3 rounded border border-[#D4AF37]/30 text-center">
            <span className="text-[10px] text-[#8B6208] block mb-1 font-bold">吉 カ ラ ー</span>
            <span className="font-bold text-[#2D2A26] text-sm">{fortune.luckyColor}</span>
          </div>
          <div className="bg-[#FAF6ED] p-3 rounded border border-[#D4AF37]/30 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] text-[#8B6208] block mb-1 font-bold">吉 ア イ テ ム</span>
            <span className="font-bold text-[#2D2A26] text-sm">{fortune.luckyItem}</span>
          </div>
        </div>

        {/* Detailed Categories */}
        <div className="space-y-3 my-6 border-t border-[#D4AF37]/30 pt-6">
          <h4 className="text-xs font-serif text-[#8B6208] tracking-widest text-center font-bold mb-4">
            【 各箇条神託 】
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif">
            <div className="bg-[#FAF6ED] p-3.5 rounded border border-[#D4AF37]/30">
              <span className="font-bold text-[#A81C1C] mr-2">【願事】</span>
              <span className="text-[#2D2A26] leading-relaxed">{fortune.categories.wish}</span>
            </div>
            <div className="bg-[#FAF6ED] p-3.5 rounded border border-[#D4AF37]/30">
              <span className="font-bold text-[#A81C1C] mr-2">【恋愛・縁結び】</span>
              <span className="text-[#2D2A26] leading-relaxed">{fortune.categories.romance}</span>
            </div>
            <div className="bg-[#FAF6ED] p-3.5 rounded border border-[#D4AF37]/30">
              <span className="font-bold text-[#A81C1C] mr-2">【仕事・学問】</span>
              <span className="text-[#2D2A26] leading-relaxed">{fortune.categories.business}</span>
            </div>
            <div className="bg-[#FAF6ED] p-3.5 rounded border border-[#D4AF37]/30">
              <span className="font-bold text-[#A81C1C] mr-2">【金運・商売】</span>
              <span className="text-[#2D2A26] leading-relaxed">{fortune.categories.money}</span>
            </div>
            <div className="bg-[#FAF6ED] p-3.5 rounded border border-[#D4AF37]/30">
              <span className="font-bold text-[#A81C1C] mr-2">【健康・身体】</span>
              <span className="text-[#2D2A26] leading-relaxed">{fortune.categories.health}</span>
            </div>
            <div className="bg-[#FAF6ED] p-3.5 rounded border border-[#D4AF37]/30">
              <span className="font-bold text-[#A81C1C] mr-2">【方角・旅行】</span>
              <span className="text-[#2D2A26] leading-relaxed">{fortune.categories.travel}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 space-y-3 font-serif">
          
          {/* Primary Action 1: AI Priest Consultation */}
          <button
            onClick={() => onOpenAiPriest(fortune)}
            className="w-full bg-[#A81C1C] border border-[#D4AF37] text-white py-3.5 px-4 text-xs sm:text-sm tracking-widest font-bold hover:bg-[#B8860B] transition-all rounded shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FFF8DC]" />
            <span>AI神主・巫女にこの神託を詳しく読み解いてもらう</span>
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {/* Secondary Action 2: Tie to Rope */}
            <button
              onClick={() => setShowTieForm(!showTieForm)}
              disabled={isTied}
              className={`py-3 px-3 border rounded transition-all flex items-center justify-center gap-1.5 font-bold ${
                isTied
                  ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-default'
                  : 'bg-[#FAF6ED] border-[#D4AF37] text-[#8B6208] hover:bg-[#F3EFE6]'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-[#A81C1C]" />
              <span>{isTied ? '結び処へ結び済み' : '結び処へ結ぶ'}</span>
            </button>

            {/* Secondary Action 3: Save to Ledger */}
            <button
              onClick={() => onSaveToLedger(fortune)}
              disabled={isSaved}
              className={`py-3 px-3 border rounded transition-all flex items-center justify-center gap-1.5 font-bold ${
                isSaved
                  ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-default'
                  : 'bg-[#FAF6ED] border-[#D4AF37] text-[#8B6208] hover:bg-[#F3EFE6]'
              }`}
            >
              <Bookmark className="w-4 h-4 text-[#B8860B]" />
              <span>{isSaved ? 'おみくじ帖に保存済' : 'おみくじ帖へ保存'}</span>
            </button>

            {/* Secondary Action 4: Share Modal */}
            <button
              onClick={() => onOpenShareModal(fortune)}
              className="py-3 px-3 bg-[#FAF6ED] border border-[#D4AF37] text-[#8B6208] hover:bg-[#F3EFE6] rounded transition-all flex items-center justify-center gap-1.5 font-bold col-span-2 sm:col-span-1"
            >
              <Share2 className="w-4 h-4 text-[#A81C1C]" />
              <span>SNSで共有・カード保存</span>
            </button>
          </div>

          {/* Tie Wish Input Form Collapsible */}
          {showTieForm && (
            <form onSubmit={handleTieSubmit} className="mt-4 p-4 bg-[#FAF6ED] border border-[#D4AF37] rounded animate-fadeIn space-y-3">
              <label className="block text-xs text-[#8B6208] font-bold">
                みくじ掛けに込める【祈願・心願】をご入力ください:
              </label>
              <input
                type="text"
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
                placeholder="例: 心願成就と家族全員の健康を祈願申し上げます"
                className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 p-2.5 text-xs text-[#2D2A26] rounded focus:outline-none focus:border-[#B8860B]"
                maxLength={60}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTieForm(false)}
                  className="px-3 py-1.5 text-xs text-[#5C5648] hover:text-[#2D2A26]"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#A81C1C] text-white text-xs font-bold rounded hover:bg-[#B8860B]"
                >
                  奉納結びを行う
                </button>
              </div>
            </form>
          )}

          {/* Redraw Button */}
          <div className="pt-4 text-center">
            <button
              onClick={onRedraw}
              className="text-xs text-[#5C5648] hover:text-[#A81C1C] underline flex items-center justify-center gap-1 mx-auto transition-colors font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>もう一度おみくじを引く</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
