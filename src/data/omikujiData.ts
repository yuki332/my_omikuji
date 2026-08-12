export interface FortuneCategory {
  wish: string;        // 願事
  romance: string;     // 恋愛・縁結び
  academic: string;    // 学問・試験
  business: string;    // 商売・金運
  health: string;      // 健康・病気
  travel: string;      // 旅行・旅立
  visitor: string;     // 待人
  moving: string;      // 転居・住み替え
}

export type FortuneRank = '大吉' | '中吉' | '小吉' | '吉' | '半吉' | '末吉' | '凶' | '大凶';

export interface OmikujiFortune {
  id: string;
  number: number;
  numberKanji: string;
  rank: FortuneRank;
  rankEnglish: string;
  waka: string;
  wakaReading?: string;
  wakaMeaning: string;
  generalText: string;
  categories: FortuneCategory;
  luckyColor: string;
  luckyItem: string;
  luckyDirection: string;
}

export const FORTUNE_RANKS: { rank: FortuneRank; english: string; color: string; ratio: number }[] = [
  { rank: '大吉', english: 'Excellent Fortune', color: '#D4AF37', ratio: 0.18 },
  { rank: '中吉', english: 'Great Fortune', color: '#E5C158', ratio: 0.22 },
  { rank: '小吉', english: 'Moderate Fortune', color: '#C5A028', ratio: 0.20 },
  { rank: '吉', english: 'Good Fortune', color: '#8B732D', ratio: 0.22 },
  { rank: '末吉', english: 'Future Good Fortune', color: '#9B833D', ratio: 0.10 },
  { rank: '半吉', english: 'Half Fortune', color: '#7B631D', ratio: 0.05 },
  { rank: '凶', english: 'Bad Fortune', color: '#A31C1C', ratio: 0.02 },
  { rank: '大凶', english: 'Severe Bad Fortune', color: '#8B0000', ratio: 0.01 },
];

export const PRESET_OMIKUJI_LIST: OmikujiFortune[] = [
  {
    id: 'omi-1',
    number: 1,
    numberKanji: '第一番',
    rank: '大吉',
    rankEnglish: 'Excellent Fortune',
    waka: '雲の合間より 月の光 射し込みて 闇を照らす 天の恵みあり',
    wakaReading: 'くものあいまより つきのひかり さしこみて やみをてらす てんのめぐみあり',
    wakaMeaning: '長かった試練の闇が明け、雲の切れ間から朗らかな光が射し込むように、思いがけない幸運が訪れます。素直な心で進みなさい。',
    generalText: '運気は最高潮に達しております。これまでの努力が大きな実を結び、周囲からの信頼も深まります。感謝の念を忘れずにいれば、益々吉運が続きます。',
    categories: {
      wish: '想いのままに叶う。誠心誠意を尽くすべし',
      romance: '良縁に恵まれる。意中の人との絆深まる',
      academic: '日頃の成果発揮され合格・好成績間違いなし',
      business: '利益大いにあり。新規事業も吉',
      health: '心身共に健やか。病は全快へ向かう',
      travel: '吉報あり、旅立ち・遠出は大いに良し',
      visitor: '必ず訪れる。喜びを伴う',
      moving: '障りなし。転居・模様替え共に好機'
    },
    luckyColor: '金糸雀色（かなりいいろ）',
    luckyItem: '金の根付お守り',
    luckyDirection: '南東'
  },
  {
    id: 'omi-2',
    number: 2,
    numberKanji: '第二番',
    rank: '大吉',
    rankEnglish: 'Excellent Fortune',
    waka: '波風の おさまりて 宝の舟 岸に寄る 満願成就の 時ぞ来たりぬ',
    wakaReading: 'なみかぜの おさまりて たからのふね きしによす まんがんじょうじゅの ときぞきたりぬ',
    wakaMeaning: '心の中の葛藤や激しい波風が鎮まり、黄金を積んだ宝船が 静かに岸辺へと寄せるように、願望が成就する絶好の機が整いました。',
    generalText: '穏やかで豊かな実りの季節を迎えます。他者への慈愛と配慮を忘れぬことが、さらなる福を呼び込みます。自信を持って決断しなさい。',
    categories: {
      wish: '願うことすべて円満に叶う',
      romance: '良縁あり。良き理解者が現れる',
      academic: '学問の神のご加護あり。努力結実す',
      business: '大いに繁栄す。商談・投資ともに成功',
      health: '日々の養生実を結び全快す',
      travel: 'どこに行っても好運に恵まれる',
      visitor: '音信あり。間もなくやって来る',
      moving: '非常に吉。良い住環境を得る'
    },
    luckyColor: '深緋（こきあけ）',
    luckyItem: '白磁の茶碗',
    luckyDirection: '東'
  },
  {
    id: 'omi-3',
    number: 3,
    numberKanji: '第三番',
    rank: '中吉',
    rankEnglish: 'Great Fortune',
    waka: '春の日に 芽吹く若竹の 如く ぐんぐんと 伸びゆく運気あり',
    wakaReading: 'はるのひに めぶくわかたけの ごとく ぐんぐんと のびゆくうんきあり',
    wakaMeaning: '暖かな春の陽光を浴びてスクスクと伸びる若竹のように、勢いよく運気が上昇しています。焦らず着実に基礎を固めなさい。',
    generalText: '進展の兆しが顕著です。新しい挑戦や勉強を始めるのに最適な時です。周囲と協調し、謙虚さを保つことで大成へとつながります。',
    categories: {
      wish: '焦らなければ自然と成就に向かう',
      romance: '静かな愛が育まれる。焦燥は禁物',
      academic: '計画的に励めば望みの成績を得る',
      business: '徐々に向上す。堅実な取引を心がけよ',
      health: '良好。適度な運動と休息が吉',
      travel: '近場への散策・旅行が英気を養う',
      visitor: '遅れてやって来るが頼りになる',
      moving: '焦らず準備を進めれば吉'
    },
    luckyColor: '萌黄色（もえぎいろ）',
    luckyItem: '木製の御朱印帳',
    luckyDirection: '南'
  },
  {
    id: 'omi-4',
    number: 4,
    numberKanji: '第四番',
    rank: '中吉',
    rankEnglish: 'Great Fortune',
    waka: '山あいに 咲く一輪の 姫百合の 密やかに香る 喜びの兆し',
    wakaReading: 'やまあいに さくいちりんの ひめゆりの ひそやかにかおる よろこびのきざし',
    wakaMeaning: 'ひっそりと山あいに咲く美しい百合のように、誇張せず地道に重ねてきた努力がやがて周囲に認められ、幸福が香り立ちます。',
    generalText: '派手なアピールよりも質実剛健が実を結ぶ時です。内面を磨くことで、自ずと幸運を引き寄せることができます。',
    categories: {
      wish: '時間をかければ吉結果にたどり着く',
      romance: '誠実な誠意が相手の心を動かす',
      academic: '基礎固めを重視すれば難関突破',
      business: '手堅く進めれば確実に収益が上がる',
      health: '規則正しい生活で体調整う',
      travel: '自然豊かな場所への旅が吉',
      visitor: '予期せぬ吉報を携えて訪れる',
      moving: '現状維持も良いが、移転も障りなし'
    },
    luckyColor: '月白色（げっぱくいろ）',
    luckyItem: '香木・お香',
    luckyDirection: '北西'
  },
  {
    id: 'omi-5',
    number: 5,
    numberKanji: '第五番',
    rank: '小吉',
    rankEnglish: 'Moderate Fortune',
    waka: '小川の流れ 清らかに 淀みなく 留まることなく 海へと注ぐ',
    wakaReading: 'おがわのながれ きよらかに よどみなく とどまることなく うみへとそそぐ',
    wakaMeaning: '一歩一歩の足取りは小さくとも、絶え間なく流れ続ける小川のように留まらなければ、やがて大きな大海へと繋がります。',
    generalText: '小事に注意し、怠惰を戒めることが大切な時期です。小さな善行や地道な習慣が、後々に大きな幸運をもたらす種となります。',
    categories: {
      wish: '半分は叶う。過度な欲は慎むべし',
      romance: '自然体で接すれば良好な関係に',
      academic: '復習を怠らなければ合格点に届く',
      business: '小利を得る。急激な拡張は避けるべし',
      health: '大きな病はないが暴飲暴食に注意',
      travel: '無難。安全運転・計画遵守が肝要',
      visitor: '来るが少し遅れる',
      moving: '可もなく不可もなし。慎重に'
    },
    luckyColor: '浅葱色（あさぎいろ）',
    luckyItem: '手拭い・ハンカチ',
    luckyDirection: '北'
  },
  {
    id: 'omi-6',
    number: 6,
    numberKanji: '第六番',
    rank: '吉',
    rankEnglish: 'Good Fortune',
    waka: '秋の夜の 澄み渡りたる 大空に 星の煌めき 心を洗う',
    wakaReading: 'あきのよの すみわたりたる おおぞらに ほしのきらめき こころをあらう',
    wakaMeaning: '澄み切った秋の夜空に輝く星々のように、心が澄み渡り、行くべき道筋が明確に見えてくる吉運です。周囲への感謝を忘れずに。',
    generalText: '安定した平和な運気の中にいます。奇をてらわず、日々の務めに誠実に励むことで良きご縁や喜びが得られます。',
    categories: {
      wish: '叶う。人の意見によく耳を傾けること',
      romance: '穏やかな良縁。焦らず信頼を築け',
      academic: '着実に学力が向上する',
      business: '順調。誠意ある取引が成功を呼ぶ',
      health: '健やか。精神の安定が第一',
      travel: '吉。歴史ある参拝地など好適',
      visitor: '訪れる。吉事の報せあり',
      moving: '障りなし。支度を整えて進めよ'
    },
    luckyColor: '琥珀色（こはくいろ）',
    luckyItem: '鈴のお守り',
    luckyDirection: '西'
  },
  {
    id: 'omi-7',
    number: 7,
    numberKanji: '第七番',
    rank: '末吉',
    rankEnglish: 'Future Good Fortune',
    waka: '冬の木の 梢に秘めし 蕾かな 春待つ心 忘れるなかれ',
    wakaReading: 'ふゆのきの こずえにひめし つぼみかな はるまつこころ わすれるなかれ',
    wakaMeaning: '厳しい冬の寒さに耐える枝先の小さな蕾のように、今は爪を研ぎ、力を蓄える時です。やがて春が訪れ大輪の花が咲き誇ります。',
    generalText: '今は大望を焦らず、実力を蓄える潜伏期です。忍耐強く準備を進めることで、将来大きな飛躍をとげることができます。',
    categories: {
      wish: '後になれば叶う。今は時期尚早',
      romance: '今は焦らず時間をかけて見極めよ',
      academic: '後半に伸びる。諦めずに継続せよ',
      business: '現状維持に努めるが賢明',
      health: '冷え・疲れに注意。保温を心掛けよ',
      travel: '見合わせるか近場にとどめるが吉',
      visitor: '遅くなるが頼りになる',
      moving: 'しばらく待つが吉'
    },
    luckyColor: '銀煤竹（ぎんすすたけ）',
    luckyItem: '温かいお茶',
    luckyDirection: '東北'
  },
  {
    id: 'omi-8',
    number: 8,
    numberKanji: '第八番',
    rank: '半吉',
    rankEnglish: 'Half Fortune',
    waka: '朝モヤの 晴れゆく先の 道筋を 一歩一歩 確めて進む',
    wakaReading: 'あさもやの はれゆくさきの みちすじを いっぽいっぽ たしかめてすすむ',
    wakaMeaning: '立ち込める朝靄（あさもや）が少しずつ晴れていくように、状況が見え始めています。油断せず、慎重に足元を確かめながら歩みなさい。',
    generalText: '吉凶が半々に交錯する時期です。調子に乗らず、足元をすくわれないよう自己点検を怠らないことが幸運へのカギとなります。',
    categories: {
      wish: '努力次第で叶う。慎重さを要す',
      romance: '勘違いや早合点に注意。対話を重視せよ',
      academic: '油断すれば不覚をとる。気を引き締めよ',
      business: '出費を抑え堅実に維持せよ',
      health: '体調の波あり。休養を優先すべし',
      travel: '事前調査を念入りに行えば吉',
      visitor: '連絡あり。少し待たされる',
      moving: '急ぐべからず'
    },
    luckyColor: '鳩羽色（はとばいろ）',
    luckyItem: '扇子',
    luckyDirection: '南西'
  },
  {
    id: 'omi-9',
    number: 9,
    numberKanji: '第九番',
    rank: '凶',
    rankEnglish: 'Bad Fortune',
    waka: '向かい風 吹き荒ぶとも 根を張りて 耐え忍ぶ木に 恵みの雨散る',
    wakaReading: 'むかいかぜ ふきすさぶとも ねをはりて たえしのぶきに めぐみのあめちる',
    wakaMeaning: '激しい向かい風が吹く苦難の時ですが、大地にしっかりと根を張り耐え忍べば、やがて恵みの雨が降り恵みをもたらします。結び処に結びて神に祈りなさい。',
    generalText: '災いを福に転じる転換点（転禍為福）です。このおみくじを境に、慎みと祈りの心を持てば、難を逃れ吉へと転じます。',
    categories: {
      wish: '今は叶いにくし。神仏に祈り心を整えよ',
      romance: '意執を捨てよ。相手の立場を想え',
      academic: '基礎から見直し再起を図れ',
      business: '新規事業・大望は控えよ',
      health: '早期の検診・養生を心掛けよ',
      travel: '延期せよ。災いあり',
      visitor: '来ない。連絡も滞りがち',
      moving: '見送るが賢明'
    },
    luckyColor: '朱色（しゅいろ）',
    luckyItem: '神社のお札・厄除け塩',
    luckyDirection: '北東（鬼門除け）'
  },
  {
    id: 'omi-10',
    number: 10,
    numberKanji: '第十番',
    rank: '大吉',
    rankEnglish: 'Excellent Fortune',
    waka: '天満てる 神の御光 受け止めて 天地開ける 黄金の道',
    wakaReading: 'あまみてる かみのみひかり うけとめて てんちひらける こがねのみち',
    wakaMeaning: '天に満ちる神のまばゆい御光を受け、遮るもののない黄金の道が開かれます。感謝と報恩の志を持てば、子孫まで至る福徳となります。',
    generalText: '無上の吉運に包まれています。自分のためだけでなく、世のため人のために力を尽くすことで、運気は永遠に輝きます。',
    categories: {
      wish: '大いなる願いも成就す',
      romance: '最高の縁結び。生涯の伴侶を得る',
      academic: 'トップの成績・望む道が開かれる',
      business: '大繁盛。名声と利益を共に得る',
      health: '万全。気力溢れる',
      travel: '最高の旅路となる',
      visitor: '吉報とともに即座に現る',
      moving: '最高の好機。大いに進め'
    },
    luckyColor: '金色（きんいろ）',
    luckyItem: '破魔矢・絵馬',
    luckyDirection: '全方角吉'
  }
];

// Helper to pick random or seed fortune
export function getRandomFortune(): OmikujiFortune {
  // Pick rank based on ratios
  const rand = Math.random();
  let cumulative = 0;
  let selectedRank = '大吉';
  
  for (const item of FORTUNE_RANKS) {
    cumulative += item.ratio;
    if (rand <= cumulative) {
      selectedRank = item.rank;
      break;
    }
  }

  // Find matching preset fortunes or adapt
  const matching = PRESET_OMIKUJI_LIST.filter(f => f.rank === selectedRank);
  if (matching.length > 0) {
    const picked = matching[Math.floor(Math.random() * matching.length)];
    // Randomize stick number from 1 to 50
    const randomNum = Math.floor(Math.random() * 50) + 1;
    return {
      ...picked,
      id: `draw-${Date.now()}-${Math.random()}`,
      number: randomNum,
      numberKanji: numberToKanji(randomNum)
    };
  }

  // Fallback to first item
  const fallback = PRESET_OMIKUJI_LIST[0];
  const randomNum = Math.floor(Math.random() * 50) + 1;
  return {
    ...fallback,
    id: `draw-${Date.now()}-${Math.random()}`,
    number: randomNum,
    numberKanji: numberToKanji(randomNum)
  };
}

export function numberToKanji(num: number): string {
  const kanjiNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  if (num <= 10) return `第${kanjiNums[num]}番`;
  if (num < 20) return `第十${num % 10 === 0 ? '' : kanjiNums[num % 10]}番`;
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  return `第${kanjiNums[tens]}十${ones === 0 ? '' : kanjiNums[ones]}番`;
}

// Japanese traditional date string
export function getJapaneseDateString(): { eraDate: string; fullDateKanji: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Reiwa era
  const reiwaYear = year - 2018;
  const reiwaKanji = reiwaYear === 1 ? '元' : numberToKanjiSimple(reiwaYear);

  const traditionalMonths = [
    '睦月', '如月', '弥生', '卯月', '皐月', '水無月',
    '文月', '葉月', '長月', '神無月', '霜月', '師走'
  ];

  const monthName = traditionalMonths[month - 1];

  return {
    eraDate: `令和${reiwaKanji}年 ${monthName}吉日`,
    fullDateKanji: `令和${reiwaKanji}年${numberToKanjiSimple(month)}月${numberToKanjiSimple(day)}日`
  };
}

function numberToKanjiSimple(n: number): string {
  const map: Record<number, string> = {
    1: '一', 2: '二', 3: '三', 4: '四', 5: '五',
    6: '六', 7: '七', 8: '八', 9: '九', 10: '十',
    11: '十一', 12: '十二', 13: '十三', 14: '十四', 15: '十五',
    16: '十六', 17: '十七', 18: '十八', 19: '十九', 20: '二十',
    21: '二十一', 22: '二十二', 23: '二十三', 24: '二十四', 25: '二十五',
    26: '二十六', 27: '二十七', 28: '二十八', 29: '二十九', 30: '三十',
    31: '三十一'
  };
  return map[n] || String(n);
}
