import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { OmikujiCylinder } from './components/OmikujiCylinder';
import { FortuneResultCard } from './components/FortuneResultCard';
import { AiPriestModal } from './components/AiPriestModal';
import { ShrineTyingBoard, TiedFortuneItem } from './components/ShrineTyingBoard';
import { FortuneHistoryLedger, SavedFortuneRecord } from './components/FortuneHistoryLedger';
import { ShareCardModal } from './components/ShareCardModal';
import { MysticParticles } from './components/MysticParticles';
import { OmikujiFortune, getJapaneseDateString } from './data/omikujiData';

// Initial Preset Tied Fortune Items on Shrine Rope
const INITIAL_TIED_ITEMS: TiedFortuneItem[] = [
  {
    id: 'tie-1',
    fortuneRank: '大吉',
    waka: '雲の合間より 月の光 射し込みて',
    wishText: '新事業の立ち上げと家族の健康を祈願申し上げます。',
    dateStr: '令和八年 八月吉日',
    blessingCount: 12,
  },
  {
    id: 'tie-2',
    fortuneRank: '中吉',
    waka: '春の日に 芽吹く若竹の 如く',
    wishText: '志望校合格と素晴らしい友人との巡り合わせを。',
    dateStr: '令和八年 八月吉日',
    blessingCount: 8,
  },
  {
    id: 'tie-3',
    fortuneRank: '凶',
    waka: '向かい風 吹き荒ぶとも 根を張りて',
    wishText: '災い転じて福となす。焦らず一歩ずつ精進します。',
    dateStr: '令和八年 八月吉日',
    blessingCount: 24,
  },
  {
    id: 'tie-4',
    fortuneRank: '吉',
    waka: '秋の夜の 澄み渡りたる 大空に',
    wishText: '良縁に恵まれ、互いに高め合える関係を築けますように。',
    dateStr: '令和八年 八月吉日',
    blessingCount: 15,
  },
  {
    id: 'tie-5',
    fortuneRank: '大吉',
    waka: '波風の おさまりて 宝の舟 岸に寄る',
    wishText: '世界平和と無病息災、皆様の願いが叶いますように。',
    dateStr: '令和八年 八月吉日',
    blessingCount: 31,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('draw');
  const [currentFortune, setCurrentFortune] = useState<OmikujiFortune | null>(null);
  const [currentIntention, setCurrentIntention] = useState<string>('総合運');

  // Persistence in LocalStorage
  const [savedRecords, setSavedRecords] = useState<SavedFortuneRecord[]>(() => {
    try {
      const stored = localStorage.getItem('omikuji_saved_records');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [tiedItems, setTiedItems] = useState<TiedFortuneItem[]>(() => {
    try {
      const stored = localStorage.getItem('omikuji_tied_items');
      return stored ? JSON.parse(stored) : INITIAL_TIED_ITEMS;
    } catch {
      return INITIAL_TIED_ITEMS;
    }
  });

  // Modal States
  const [isAiPriestOpen, setIsAiPriestOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('omikuji_saved_records', JSON.stringify(savedRecords));
    } catch (e) {
      console.error('Failed to save records', e);
    }
  }, [savedRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('omikuji_tied_items', JSON.stringify(tiedItems));
    } catch (e) {
      console.error('Failed to save tied items', e);
    }
  }, [tiedItems]);

  // Handlers
  const handleFortuneDrawn = (fortune: OmikujiFortune, intention: string) => {
    setCurrentFortune(fortune);
    setCurrentIntention(intention);
  };

  const handleRedraw = () => {
    setCurrentFortune(null);
  };

  const handleSaveToLedger = (fortune: OmikujiFortune) => {
    if (savedRecords.some((r) => r.fortune.id === fortune.id)) return;

    const dateInfo = getJapaneseDateString();
    const newRecord: SavedFortuneRecord = {
      id: `rec-${Date.now()}`,
      fortune,
      drawnDate: dateInfo.fullDateKanji,
      userNote: '',
    };
    setSavedRecords([newRecord, ...savedRecords]);
  };

  const handleDeleteRecord = (id: string) => {
    setSavedRecords(savedRecords.filter((r) => r.id !== id));
  };

  const handleUpdateNote = (id: string, note: string) => {
    setSavedRecords(
      savedRecords.map((r) => (r.id === id ? { ...r, userNote: note } : r))
    );
  };

  const handleTieToRope = (fortune: OmikujiFortune, wishText: string) => {
    const dateInfo = getJapaneseDateString();
    const newItem: TiedFortuneItem = {
      id: `tie-${Date.now()}`,
      fortuneRank: fortune.rank,
      waka: fortune.waka.slice(0, 15) + '...',
      wishText: wishText,
      dateStr: dateInfo.eraDate,
      blessingCount: 1,
      userTied: true,
    };
    setTiedItems([newItem, ...tiedItems]);
  };

  const handleAddCustomTie = (wishText: string) => {
    const dateInfo = getJapaneseDateString();
    const newItem: TiedFortuneItem = {
      id: `tie-${Date.now()}`,
      fortuneRank: currentFortune ? currentFortune.rank : '心願成就',
      waka: currentFortune ? currentFortune.waka.slice(0, 15) + '...' : '神の御加護のもとにて',
      wishText: wishText,
      dateStr: dateInfo.eraDate,
      blessingCount: 1,
      userTied: true,
    };
    setTiedItems([newItem, ...tiedItems]);
  };

  const isCurrentFortuneSaved = currentFortune
    ? savedRecords.some((r) => r.fortune.id === currentFortune.id)
    : false;

  const isCurrentFortuneTied = currentFortune
    ? tiedItems.some((t) => t.id.includes(currentFortune.id))
    : false;

  return (
    <div className="min-h-screen bg-[#FAF6ED] text-[#2D2A26] font-serif flex flex-col relative overflow-x-hidden shrine-pattern-light">
      
      {/* Background Mystical Glowing Particles & Lights */}
      <MysticParticles />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedRecords.length}
        tiedCount={tiedItems.filter((t) => t.userTied).length}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 relative z-10">
        
        {/* TAB 1: Draw Omikuji */}
        {activeTab === 'draw' && (
          <div>
            {!currentFortune ? (
              <OmikujiCylinder onFortuneDrawn={handleFortuneDrawn} />
            ) : (
              <FortuneResultCard
                fortune={currentFortune}
                intention={currentIntention}
                onTieToRope={handleTieToRope}
                onSaveToLedger={handleSaveToLedger}
                onOpenAiPriest={() => setIsAiPriestOpen(true)}
                onOpenShareModal={() => setIsShareModalOpen(true)}
                onRedraw={handleRedraw}
                isSaved={isCurrentFortuneSaved}
                isTied={isCurrentFortuneTied}
              />
            )}
          </div>
        )}

        {/* TAB 2: Tying Rope Board */}
        {activeTab === 'tying' && (
          <ShrineTyingBoard
            tiedItems={tiedItems}
            onAddTieItem={handleAddCustomTie}
          />
        )}

        {/* TAB 3: Fortune History Ledger */}
        {activeTab === 'ledger' && (
          <FortuneHistoryLedger
            savedRecords={savedRecords}
            onDeleteRecord={handleDeleteRecord}
            onUpdateNote={handleUpdateNote}
            onSelectFortuneToView={(fortune) => {
              setCurrentFortune(fortune);
              setActiveTab('draw');
            }}
          />
        )}

        {/* TAB 4: AI Priest Direct Room */}
        {activeTab === 'ai_priest' && (
          <div className="max-w-2xl mx-auto py-12 text-center relative z-10">
            <div className="mystic-card p-8 rounded-lg shadow-xl gold-border">
              <h3 className="text-xl sm:text-2xl font-bold text-[#8B6208] mb-3">
                AI神主・巫女のご神託館
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5648] mb-6 leading-relaxed">
                直接神主や巫女へお悩みを相談し、神道の深遠な智慧に基づく神託・説法をお受けいただけます。
              </p>
              <button
                onClick={() => setIsAiPriestOpen(true)}
                className="bg-[#A81C1C] border-2 border-[#D4AF37] px-8 py-4 text-[#FFFDF9] hover:bg-[#B8860B] font-bold tracking-widest text-base sm:text-lg rounded shadow-xl transition-all hover:scale-105"
              >
                神託説法のお部屋を開く
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#D4AF37]/30 py-6 text-center text-xs text-[#8B732D] font-serif relative z-10 bg-[#FFFDF9]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>令和 縁結び神託御神籤 — 奉納参拝</span>
          <span className="text-[10px] opacity-75">
            Powered by Gemini AI Studio & DeepMind
          </span>
        </div>
      </footer>

      {/* Modals */}
      <AiPriestModal
        isOpen={isAiPriestOpen}
        onClose={() => setIsAiPriestOpen(false)}
        fortune={currentFortune}
      />

      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        fortune={currentFortune}
      />

    </div>
  );
}
