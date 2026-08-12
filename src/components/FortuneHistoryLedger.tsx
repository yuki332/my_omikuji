import React, { useState } from 'react';
import { Bookmark, Calendar, Sparkles, Trash2, Edit3, Check, Filter } from 'lucide-react';
import { OmikujiFortune } from '../data/omikujiData';

export interface SavedFortuneRecord {
  id: string;
  fortune: OmikujiFortune;
  drawnDate: string;
  userNote?: string;
}

interface FortuneHistoryLedgerProps {
  savedRecords: SavedFortuneRecord[];
  onDeleteRecord: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onSelectFortuneToView: (fortune: OmikujiFortune) => void;
}

export const FortuneHistoryLedger: React.FC<FortuneHistoryLedgerProps> = ({
  savedRecords,
  onDeleteRecord,
  onUpdateNote,
  onSelectFortuneToView,
}) => {
  const [filterRank, setFilterRank] = useState<string>('ALL');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  const filteredRecords = savedRecords.filter((rec) => {
    if (filterRank === 'ALL') return true;
    return rec.fortune.rank === filterRank;
  });

  // Calculate Rank Stats
  const rankCounts = savedRecords.reduce((acc, rec) => {
    acc[rec.fortune.rank] = (acc[rec.fortune.rank] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleStartEditNote = (rec: SavedFortuneRecord) => {
    setEditingId(rec.id);
    setNoteInput(rec.userNote || '');
  };

  const handleSaveNote = (id: string) => {
    onUpdateNote(id, noteInput);
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-serif relative z-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="text-xs tracking-[0.5em] text-[#8B6208] font-bold uppercase mb-1">
          PERSONAL DIVINE RECORD
        </div>
        <h2 className="text-3xl font-light text-[#A81C1C] tracking-[0.2em] mb-2 font-serif font-bold">
          御朱印・おみくじ帖
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5648] max-w-md mx-auto">
          これまで授かられた神託と心身の記録でございます。日々の指針として振り返りご活用ください。
        </p>
      </div>

      {/* Statistics Banner */}
      <div className="bg-[#FFFDF9] gold-border p-6 rounded-sm mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center shadow-md mystic-card">
        <div>
          <span className="text-[10px] text-[#8B6208] block uppercase font-bold">総参拝授与数</span>
          <span className="text-2xl font-bold text-[#A81C1C]">{savedRecords.length} <span className="text-xs font-normal text-[#5C5648]">体</span></span>
        </div>
        <div>
          <span className="text-[10px] text-[#8B6208] block uppercase font-bold">大吉 授与</span>
          <span className="text-2xl font-bold text-[#A81C1C]">{rankCounts['大吉'] || 0} <span className="text-xs font-normal text-[#5C5648]">回</span></span>
        </div>
        <div>
          <span className="text-[10px] text-[#8B6208] block uppercase font-bold">吉・中吉 授与</span>
          <span className="text-2xl font-bold text-[#B8860B]">{(rankCounts['吉'] || 0) + (rankCounts['中吉'] || 0) + (rankCounts['小吉'] || 0)} <span className="text-xs font-normal text-[#5C5648]">回</span></span>
        </div>
        <div>
          <span className="text-[10px] text-[#8B6208] block uppercase font-bold">凶・厄除 授与</span>
          <span className="text-2xl font-bold text-[#2D2A26]">{(rankCounts['凶'] || 0) + (rankCounts['大凶'] || 0)} <span className="text-xs font-normal text-[#5C5648]">回</span></span>
        </div>
      </div>

      {/* Rank Filter Options */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-2 text-xs text-[#8B6208] font-bold">
          <Filter className="w-4 h-4" />
          <span>運勢絞り込み:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {['ALL', '大吉', '中吉', '小吉', '吉', '末吉', '凶'].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRank(r)}
              className={`px-3 py-1 rounded transition-colors font-bold ${
                filterRank === r
                  ? 'bg-[#A81C1C] text-white'
                  : 'bg-[#FFFDF9] border border-[#D4AF37]/40 text-[#5C5648] hover:border-[#B8860B]'
              }`}
            >
              {r === 'ALL' ? '全授与一覧' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Records List */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-12 bg-[#FFFDF9] border border-dashed border-[#D4AF37]/40 rounded p-8">
          <Bookmark className="w-8 h-8 text-[#B8860B] mx-auto mb-2 opacity-50" />
          <p className="text-sm text-[#5C5648]">保存されたおみくじ結果はまだございません。</p>
          <p className="text-xs text-[#8B6208] mt-1 font-bold">おみくじを引いた後、「おみくじ帖へ保存」を押すと記録されます。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="bg-[#FFFDF9] border border-[#D4AF37]/40 p-5 rounded-sm shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative mystic-card"
            >
              <div>
                <div className="flex justify-between items-start mb-3 border-b border-[#D4AF37]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#8B6208]">{rec.drawnDate}</span>
                  </div>
                  <span className="text-sm font-bold text-[#A81C1C] border border-[#A81C1C] px-2 py-0.5 rounded bg-[#A81C1C]/10">
                    {rec.fortune.rank}
                  </span>
                </div>

                <div
                  onClick={() => onSelectFortuneToView(rec.fortune)}
                  className="cursor-pointer group hover:bg-[#FAF6ED] p-2 rounded transition-colors"
                >
                  <span className="text-[10px] text-[#8B6208] block mb-1 font-bold">【{rec.fortune.numberKanji}】</span>
                  <p className="text-sm font-bold text-[#2D2A26] leading-relaxed group-hover:text-[#A81C1C]">
                    「{rec.fortune.waka}」
                  </p>
                </div>

                {/* User Note Section */}
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-[#8B6208] font-bold">参拝メモ・心境日記:</span>
                    {editingId !== rec.id && (
                      <button
                        onClick={() => handleStartEditNote(rec)}
                        className="text-[10px] text-[#5C5648] hover:text-[#A81C1C] flex items-center gap-1 font-bold"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>編集</span>
                      </button>
                    )}
                  </div>

                  {editingId === rec.id ? (
                    <div className="mt-1 space-y-2">
                      <textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="この日感じたことや神託への想いを記録..."
                        rows={2}
                        className="w-full bg-[#FAF6ED] border border-[#D4AF37] p-2 text-xs text-[#2D2A26] rounded focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs text-[#5C5648]"
                        >
                          消去
                        </button>
                        <button
                          onClick={() => handleSaveNote(rec.id)}
                          className="bg-[#A81C1C] text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>保存</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#5C5648] bg-[#FAF6ED] p-2 rounded italic">
                      {rec.userNote || 'メモ未記入 (編集ボタンから入力可能です)'}
                    </p>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <div className="flex justify-between items-center pt-3 mt-4 border-t border-[#D4AF37]/20 text-xs">
                <button
                  onClick={() => onSelectFortuneToView(rec.fortune)}
                  className="text-[#A81C1C] hover:underline font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>神託カードを再表示</span>
                </button>

                <button
                  onClick={() => onDeleteRecord(rec.id)}
                  className="text-[#5C5648] hover:text-[#A81C1C] p-1"
                  title="おみくじ帖から削除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
