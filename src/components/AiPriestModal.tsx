import React, { useState } from 'react';
import { Sparkles, X, Send, RefreshCw, Feather, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { OmikujiFortune } from '../data/omikujiData';

interface AiPriestModalProps {
  isOpen: boolean;
  onClose: () => void;
  fortune: OmikujiFortune | null;
}

interface InterpretationResult {
  greeting: string;
  divineMessage: string;
  questionAdvice: string;
  luckyItem: string;
  luckyColor: string;
  luckyDirection: string;
  blessingWord: string;
}

export const AiPriestModal: React.FC<AiPriestModalProps> = ({ isOpen, onClose, fortune }) => {
  const [role, setRole] = useState<'shinto_priest' | 'miko'>('shinto_priest');
  const [userQuestion, setUserQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<InterpretationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const PRESET_QUESTIONS = [
    '意中の人とのご縁や良縁について教えてください',
    '仕事や転職、今後のキャリアで意識すべき点は？',
    '学業や資格試験での心構えをお授けください',
    '人間関係や身近な人との付き合い方について',
    '今年一年の健康と心の平穏を保つには？'
  ];

  const handleConsult = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fortune) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/omikuji/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fortune: fortune.rank,
          waka: fortune.waka,
          categories: fortune.categories,
          stickNumber: fortune.number,
          userQuestion: userQuestion.trim(),
          priestRole: role,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || '神託の読み解きに失敗しました。');
      }

      setInterpretation(data.interpretation);
    } catch (err: any) {
      console.error('Error fetching interpretation:', err);
      setErrorMessage(err.message || 'AI神主の説法を取得できませんでした。後ほど再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn font-serif">
      <div className="w-full max-w-2xl bg-[#FFFDF9] gold-border p-6 sm:p-8 rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto border-2 border-[#D4AF37]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5C5648] hover:text-[#A81C1C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 border-b border-[#D4AF37]/30 pb-4">
          <div className="text-[10px] tracking-[0.4em] text-[#8B6208] font-bold uppercase mb-1">
            DIVINE AI INTERPRETATION
          </div>
          <h3 className="text-2xl font-serif text-[#A81C1C] font-bold tracking-widest flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B8860B]" />
            AI神主・巫女による神託説法
          </h3>
          <p className="text-xs text-[#5C5648] font-serif mt-1">
            {fortune ? `【${fortune.numberKanji} - ${fortune.rank}】のおみくじの深意を読み解きます` : '神社に伝わる神道の智慧でお悩みを解き明かします'}
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRole('shinto_priest')}
            className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-2 border transition-all ${
              role === 'shinto_priest'
                ? 'bg-[#A81C1C] text-white border-[#D4AF37] shadow-sm'
                : 'bg-[#FAF6ED] text-[#5C5648] border-[#D4AF37]/30 hover:bg-[#F3EFE6]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>AI神主 (厳かな神道説法)</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('miko')}
            className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-2 border transition-all ${
              role === 'miko'
                ? 'bg-[#B8860B] text-white border-[#D4AF37] shadow-sm'
                : 'bg-[#FAF6ED] text-[#5C5648] border-[#D4AF37]/30 hover:bg-[#F3EFE6]'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>AI巫女 (温かな寄り添い・縁結び)</span>
          </button>
        </div>

        {/* Question Form */}
        <form onSubmit={handleConsult} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-[#8B6208] mb-2">
              神主・巫女へのお悩み・ご質問（任意）:
            </label>
            <textarea
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="例: 転職を考えていますが、どのような心構えで臨むべきでしょうか？"
              rows={3}
              className="w-full bg-[#FAF6ED] border border-[#D4AF37]/50 p-3 text-xs text-[#2D2A26] rounded focus:outline-none focus:border-[#B8860B]"
            />
          </div>

          {/* Presets */}
          <div>
            <span className="text-[10px] text-[#8B6208] font-bold block mb-1">【 よくあるご相談の選定 】</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setUserQuestion(q)}
                  className="text-[10px] bg-[#FAF6ED] border border-[#D4AF37]/30 text-[#5C5648] hover:text-[#A81C1C] px-2.5 py-1 rounded hover:bg-[#F3EFE6]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !fortune}
            className="w-full bg-[#A81C1C] border border-[#D4AF37] text-white py-3 text-xs tracking-widest font-bold hover:bg-[#B8860B] transition-all rounded shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>神意を授かりております...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>説法・神託の読み解きを受ける</span>
              </>
            )}
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Interpretation Result */}
        {interpretation && (
          <div className="bg-[#FAF6ED] border border-[#D4AF37] p-5 rounded-sm space-y-4 animate-fadeIn">
            <div className="border-b border-[#D4AF37]/30 pb-2 flex justify-between items-center">
              <span className="text-xs font-bold text-[#A81C1C]">
                {role === 'shinto_priest' ? '⛩️ 神主からの御説法' : '🌸 巫女からの神託のお言葉'}
              </span>
              <span className="text-[10px] text-[#8B6208] font-bold">【授与完了】</span>
            </div>

            <p className="text-xs font-bold text-[#8B6208] italic">
              「{interpretation.greeting}」
            </p>

            <div className="space-y-3 text-xs leading-relaxed text-[#2D2A26]">
              <div className="bg-[#FFFDF9] p-3 rounded border border-[#D4AF37]/30">
                <span className="font-bold text-[#A81C1C] block mb-1">【神託の深意】</span>
                <p>{interpretation.divineMessage}</p>
              </div>

              {userQuestion && (
                <div className="bg-[#FFFDF9] p-3 rounded border border-[#D4AF37]/30">
                  <span className="font-bold text-[#B8860B] block mb-1">【ご相談への導き】</span>
                  <p>{interpretation.questionAdvice}</p>
                </div>
              )}

              <div className="bg-[#FFFDF9] p-3 rounded border border-[#D4AF37]/30 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div>
                  <span className="text-[#8B6208] font-bold block">吉方角</span>
                  <span className="font-bold text-[#2D2A26]">{interpretation.luckyDirection}</span>
                </div>
                <div>
                  <span className="text-[#8B6208] font-bold block">吉カラー</span>
                  <span className="font-bold text-[#2D2A26]">{interpretation.luckyColor}</span>
                </div>
                <div>
                  <span className="text-[#8B6208] font-bold block">吉品物</span>
                  <span className="font-bold text-[#2D2A26]">{interpretation.luckyItem}</span>
                </div>
              </div>

              <div className="text-center pt-2 text-xs font-bold text-[#A81C1C]">
                「 {interpretation.blessingWord} 」
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
