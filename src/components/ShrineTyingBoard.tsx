import React, { useState } from 'react';
import { HeartHandshake, Sparkles, Plus, Eye, CheckCircle2 } from 'lucide-react';
import { shrineAudio } from '../utils/audioSynth';

export interface TiedFortuneItem {
  id: string;
  fortuneRank: string;
  waka: string;
  wishText: string;
  dateStr: string;
  blessingCount: number;
  userTied?: boolean;
}

interface ShrineTyingBoardProps {
  tiedItems: TiedFortuneItem[];
  onAddTieItem: (wishText: string) => void;
}

export const ShrineTyingBoard: React.FC<ShrineTyingBoardProps> = ({
  tiedItems,
  onAddTieItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<TiedFortuneItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWishInput, setNewWishInput] = useState('');
  const [blessedIds, setBlessedIds] = useState<Record<string, boolean>>({});

  const handleSendBlessing = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (blessedIds[id]) return;

    shrineAudio.playTiePaperSound();
    setBlessedIds((prev) => ({ ...prev, [id]: true }));
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, blessingCount: selectedItem.blessingCount + 1 });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishInput.trim()) return;
    shrineAudio.playTiePaperSound();
    onAddTieItem(newWishInput.trim());
    setNewWishInput('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-serif relative z-10">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-xs tracking-[0.5em] text-[#8B6208] uppercase mb-1 font-bold">
          SHRINE FORTUNE TYING ROPE
        </div>
        <h2 className="text-3xl font-light text-[#A81C1C] tracking-[0.2em] mb-2 font-serif font-bold">
          縁結び・結び処（みくじ掛け）
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5648] max-w-lg mx-auto leading-relaxed">
          境内のみくじ掛けには、参拝者の祈りや決意を込めたおみくじが結ばれております。
          皆様の願事が神様のお心に届きますよう、ご拝礼ください。
        </p>

        <button
          onClick={() => setShowAddModal(true)}
          className="mt-6 bg-[#A81C1C] border border-[#D4AF37] text-white px-6 py-2.5 text-xs tracking-[0.2em] font-bold hover:bg-[#B8860B] transition-all rounded flex items-center gap-2 mx-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>新たに願短冊を結ぶ</span>
        </button>
      </div>

      {/* Visual Shrine Fence Rope Display */}
      <div className="bg-[#FFFDF9] gold-border p-6 sm:p-10 shadow-xl relative rounded-sm mystic-card min-h-[400px]">
        
        {/* Decorative Wooden Shrine Posts & Shimenawa Ropes */}
        <div className="absolute top-0 bottom-0 left-8 w-4 bg-gradient-to-b from-[#B8860B] via-[#8B6208] to-[#B8860B] rounded-sm shadow-inner hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-8 w-4 bg-gradient-to-b from-[#B8860B] via-[#8B6208] to-[#B8860B] rounded-sm shadow-inner hidden sm:block" />

        {/* Shimenawa Rope Lines */}
        <div className="space-y-20 relative z-10 py-6">
          
          {/* Rope 1 */}
          <div className="relative border-b-2 border-dashed border-[#B8860B]/60 flex flex-wrap items-center justify-around gap-4 pb-2 min-h-[90px]">
            <div className="absolute -top-3 left-0 text-[10px] text-[#8B6208] tracking-widest bg-[#FFFDF9] px-2 font-bold">第一縄（心願成就）</div>
            {tiedItems.slice(0, 5).map((item) => (
              <TiedPaperRibbon
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
                isBlessed={!!blessedIds[item.id]}
              />
            ))}
          </div>

          {/* Rope 2 */}
          <div className="relative border-b-2 border-dashed border-[#B8860B]/60 flex flex-wrap items-center justify-around gap-4 pb-2 min-h-[90px]">
            <div className="absolute -top-3 left-0 text-[10px] text-[#8B6208] tracking-widest bg-[#FFFDF9] px-2 font-bold">第二縄（厄除開運）</div>
            {tiedItems.slice(5, 10).map((item) => (
              <TiedPaperRibbon
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
                isBlessed={!!blessedIds[item.id]}
              />
            ))}
            {tiedItems.length <= 5 && (
              <div className="text-xs text-[#8B732D]/60 italic py-4">第二縄に新たな短冊を結べます</div>
            )}
          </div>

        </div>
      </div>

      {/* Selected Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFDF9] border-2 border-[#D4AF37] p-6 rounded-sm max-w-md w-full shadow-2xl relative font-serif">
            <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3 mb-4">
              <span className="text-xs text-[#8B6208] font-bold">【奉納短冊】 {selectedItem.dateStr}</span>
              <span className="text-sm font-bold text-[#A81C1C] border border-[#A81C1C] px-2 py-0.5 rounded">
                {selectedItem.fortuneRank}
              </span>
            </div>

            <div className="my-4 text-center">
              <p className="text-base font-bold text-[#2D2A26] my-2">「{selectedItem.waka}」</p>
              <div className="bg-[#FAF6ED] p-4 rounded border border-[#D4AF37]/30 my-3 text-left">
                <span className="text-[10px] text-[#8B6208] block mb-1 font-bold">参拝者祈願</span>
                <p className="text-xs text-[#2D2A26] leading-relaxed">{selectedItem.wishText}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/30 mt-4">
              <button
                onClick={(e) => handleSendBlessing(selectedItem.id, e)}
                className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded transition-all font-bold ${
                  blessedIds[selectedItem.id]
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-[#A81C1C] text-white hover:bg-[#B8860B]'
                }`}
              >
                {blessedIds[selectedItem.id] ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>祈願念入れ済み ({selectedItem.blessingCount})</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>合掌・共に祈念する ({selectedItem.blessingCount})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedItem(null)}
                className="text-xs text-[#5C5648] hover:text-[#2D2A26] px-3 py-1.5"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Wish Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFDF9] border-2 border-[#D4AF37] p-6 rounded-sm max-w-md w-full shadow-2xl relative font-serif">
            <h3 className="text-lg font-bold text-[#8B6208] text-center mb-4">新たに願短冊を奉納結びする</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#5C5648] mb-1 font-bold">短冊に込める祈願・決意:</label>
                <textarea
                  value={newWishInput}
                  onChange={(e) => setNewWishInput(e.target.value)}
                  placeholder="心願成就、家族の健康、良縁成就など..."
                  rows={3}
                  className="w-full bg-[#FAF6ED] border border-[#D4AF37]/50 p-2.5 text-xs text-[#2D2A26] rounded focus:outline-none focus:border-[#B8860B]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#5C5648] hover:text-[#2D2A26]"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#A81C1C] text-white text-xs font-bold rounded hover:bg-[#B8860B]"
                >
                  結び処へ結ぶ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Tied Paper Ribbon Sub-component
const TiedPaperRibbon: React.FC<{
  item: TiedFortuneItem;
  onClick: () => void;
  isBlessed: boolean;
}> = ({ item, onClick, isBlessed }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group flex flex-col items-center transition-transform hover:scale-110 relative ${
        item.userTied ? 'z-20' : 'z-10'
      }`}
      title={item.wishText}
    >
      {/* Tied Paper Knot Graphic */}
      <div
        className={`w-5 h-16 sm:w-6 sm:h-20 border border-[#B8860B] shadow-md rounded-b-sm flex flex-col items-center justify-between p-1 writing-vertical text-[9px] font-bold tracking-widest relative overflow-hidden transition-colors ${
          item.userTied
            ? 'bg-[#A81C1C] text-white border-[#D4AF37]'
            : 'bg-[#FFFDF9] text-[#2D2A26] group-hover:bg-[#FAF6ED]'
        }`}
      >
        <span className="mt-1">{item.fortuneRank}</span>
        {isBlessed && (
          <span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full animate-ping mb-1" />
        )}
      </div>

      {/* Hover Preview Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-[-35px] bg-[#FAF6ED] border border-[#D4AF37] px-2 py-1 rounded text-[10px] text-[#2D2A26] whitespace-nowrap shadow-lg pointer-events-none z-30 font-bold">
        {item.wishText.slice(0, 14)}...
      </div>
    </div>
  );
};
