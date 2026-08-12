import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Helper to get Gemini AI client lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// API route for AI Shrine Priest / Miko Fortune Interpretation
app.post('/api/omikuji/interpret', async (req, res) => {
  try {
    const { fortune, waka, categories, stickNumber, userQuestion, priestRole = 'shinto_priest' } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY_MISSING',
        message: 'APIキーが設定されていません。AI神主による説法モードではなく標準の読み解きをご利用ください。'
      });
    }

    const rolePrompt = priestRole === 'miko' 
      ? 'あなたは厳かな神社に仕える巫女（みこ）です。優しく温かい言葉遣いで、参拝者に語りかけてください。'
      : 'あなたは歴史ある神社の神主（かんぬし）です。荘厳かつ温かみのある深遠な言葉遣い（〜でございます、〜と伝えております、等）で語りかけてください。';

    const prompt = `
${rolePrompt}

【参拝者の引いたおみくじ情報】
・みくじ番号: 第${stickNumber}番
・運勢: ${fortune}
・和歌: 「${waka}」
・各運勢の概略: ${JSON.stringify(categories, null, 2)}
${userQuestion ? `・参拝者の悩み・祈願事: 「${userQuestion}」` : '・特別なお悩み事: なし（総合運勢のお教え）'}

以下のフォーマットに従って、神様の御心と和歌の深意を解き明かす解釈・説法をお授けください。

レスポンスは必ず以下のJSON形式のみで返却してください:
{
  "greeting": "参拝者への最初の温かい言葉かけ（15文字程度）",
  "divineMessage": "このおみくじに込められた神様の意図と和歌の読み解き（150〜200文字程度）",
  "questionAdvice": "参拝者の悩みや心構えに対する具体的な神道の智慧・助言（100〜150文字程度）",
  "luckyItem": "今週のラッキー御守・招福アイテム（例：朱色の扇子、桜のお守り、朝摘みの緑茶）",
  "luckyColor": "吉カラー（例：金糸雀色、深緋、白磁）",
  "luckyDirection": "吉方角（例：南東、北北西）",
  "blessingWord": "心に留めるべき四字熟語または御神訓（例：明浄正直、一期一会、一念天通）"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      }
    });

    const responseText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean up markdown wrapping if present
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({ success: true, interpretation: parsedData });
  } catch (error: any) {
    console.error('Error interpreting fortune:', error);
    return res.status(500).json({
      error: 'INTERPRETATION_FAILED',
      message: '神様のお言葉の読み取り中に予期せぬエラーが発生しました。',
      details: error?.message || String(error)
    });
  }
});

// API route for generating dynamic custom AI fortune for specific theme (e.g. "猫おみくじ", "学業特別みくじ", "恋愛成就みくじ")
app.post('/api/omikuji/custom-theme', async (req, res) => {
  try {
    const { theme } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: 'GEMINI_API_KEY_MISSING' });
    }

    const prompt = `
テーマ: 「${theme || '令和の特別祈願'}」に基づく新しいオリジナルおみくじを作成してください。
以下のJSONフォーマットで返してください:
{
  "number": "特別番",
  "fortune": "大吉",
  "waka": "五・七・五・七・七の美しい和歌",
  "wakaMeaning": "和歌の現代語訳",
  "generalLuck": "総合運の説明",
  "categories": {
    "願事": "願事の運勢",
    "恋愛": "恋愛の運勢",
    "金運": "金運の運勢",
    "学問": "学問の運勢",
    "健康": "健康の運勢",
    "旅行": "旅行の運勢"
  }
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({ success: true, fortuneData: parsedData });
  } catch (error: any) {
    console.error('Error generating custom theme:', error);
    return res.status(500).json({ error: 'FAILED', message: error?.message });
  }
});

// Setup Vite or static serving
const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await import('fs').then(fs => fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8'));
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
