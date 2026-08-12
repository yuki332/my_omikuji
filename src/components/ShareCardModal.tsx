import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { OmikujiFortune, getJapaneseDateString } from '../data/omikujiData';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  fortune: OmikujiFortune | null;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({ isOpen, onClose, fortune }) => {
  const [copied, setCopied] = useState(false);
  const dateInfo = getJapaneseDateString();

  if (!isOpen || !fortune) return null;

  const shareText = `【令和 縁結び神託御神籤】
${fortune.numberKanji}【${fortune.rank}】を引きました！

御神詠（和歌）:
「${fortune.waka}」

吉カラー: ${fortune.luckyColor}
吉アイテム: ${fortune.luckyItem}

#おみくじ #令和神社 #神託御神籤`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn font-serif">
      <div className="w-full max-w-lg bg-[#FFFDF9] border-2 border-[#D4AF37] p-6 rounded-sm shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5C5648] hover:text-[#A81C1C]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="text-[10px] text-[#8B6208] tracking-widest font-bold uppercase">DIVINE SHRINE CARD</div>
          <h3 className="text-xl text-[#A81C1C] font-bold">御朱印・神託カード</h3>
        </div>

        {/* Card Canvas preview */}
        <div id="share-card-container" className="bg-[#FAF6ED] border-2 border-[#D4AF37] p-6 rounded-sm shadow-lg relative text-center my-4 mystic-card">
          
          <div className="text-[10px] text-[#8B6208] font-bold tracking-widest mb-1">
            令和神社 縁結び神託御神籤
          </div>

          <div className="text-xs text-[#5C5648] mb-4">{dateInfo.fullDateKanji}</div>

          <div className="text-4xl font-black text-[#A81C1C] my-3 border-y border-[#D4AF37]/30 py-3">
            {fortune.numberKanji} 【{fortune.rank}】
          </div>

          <p className="text-sm font-bold text-[#2D2A26] my-3 leading-relaxed">
            「{fortune.waka}」
          </p>

          <p className="text-xs text-[#5C5648] leading-relaxed my-3 px-2">
            {fortune.wakaMeaning}
          </p>

          <div className="bg-[#FFFDF9] p-3 rounded border border-[#D4AF37]/30 text-[11px] grid grid-cols-2 gap-2 text-left mt-4">
            <div><span className="text-[#8B6208] font-bold">願事:</span> {fortune.categories.wish}</div>
            <div><span className="text-[#8B6208] font-bold">恋愛:</span> {fortune.categories.romance}</div>
            <div><span className="text-[#8B6208] font-bold">商売:</span> {fortune.categories.business}</div>
            <div><span className="text-[#8B6208] font-bold">健康:</span> {fortune.categories.health}</div>
          </div>

          <div className="text-[9px] text-[#8B6208] tracking-widest mt-4 uppercase font-bold opacity-80">
            SEALED BY REIWA SHRINE DIVINE PROVIDENCE
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleCopyText}
            className="w-full bg-[#A81C1C] border border-[#D4AF37] text-white py-3 text-xs tracking-widest font-bold hover:bg-[#B8860B] transition-all rounded shadow flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-300" />
                <span>SNSテキストをコピーしました！</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>おみくじ結果の共有テキストをコピー</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
