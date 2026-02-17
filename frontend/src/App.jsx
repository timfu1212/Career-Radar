import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

const MOCK_DB = {
  台積電: {
    score: 72,
    total: 1284,
    positive: 641,
    negative: 231,
    neutral: 412,
    trend: [
      { month: "08月", pos: 58, neg: 20 },
      { month: "09月", pos: 61, neg: 18 },
      { month: "10月", pos: 55, neg: 24 },
      { month: "11月", pos: 63, neg: 17 },
      { month: "12月", pos: 67, neg: 15 },
      { month: "01月", pos: 70, neg: 14 },
      { month: "02月", pos: 68, neg: 16 },
      { month: "03月", pos: 72, neg: 13 },
      { month: "04月", pos: 75, neg: 12 },
      { month: "05月", pos: 71, neg: 15 },
      { month: "06月", pos: 74, neg: 13 },
      { month: "07月", pos: 76, neg: 11 },
    ],
    keywords: [
      { text: "技術領先", count: 182 },
      { text: "薪資優渥", count: 154 },
      { text: "加班文化", count: 132 },
      { text: "學習機會", count: 118 },
      { text: "制度完善", count: 97 },
      { text: "高壓環境", count: 89 },
      { text: "福利好", count: 85 },
      { text: "升遷空間", count: 72 },
    ],
    radar: [
      { attr: "薪資福利", score: 85 },
      { attr: "工作環境", score: 68 },
      { attr: "升遷發展", score: 78 },
      { attr: "生活平衡", score: 52 },
      { attr: "管理文化", score: 65 },
      { attr: "學習成長", score: 88 },
    ],
    events: [
      { date: "2025-01", label: "調薪公告 +15%", type: "positive" },
      { date: "2025-04", label: "CoWoS 訂單大增", type: "positive" },
      { date: "2024-10", label: "部門重組傳聞", type: "negative" },
    ],
    recent: [
      {
        text: "待遇很好，但工時真的長，要有心理準備",
        sentiment: "neutral",
        date: "2025-07-28",
      },
      {
        text: "技術環境一流，學到很多業界少見的東西",
        sentiment: "positive",
        date: "2025-07-25",
      },
      {
        text: "薪水調幅很大，整體非常滿意",
        sentiment: "positive",
        date: "2025-07-18",
      },
      {
        text: "加班文化嚴重，假日也要on call",
        sentiment: "negative",
        date: "2025-07-15",
      },
    ],
  },
  聯發科: {
    score: 68,
    total: 876,
    positive: 430,
    negative: 198,
    neutral: 248,
    trend: [
      { month: "08月", pos: 52, neg: 25 },
      { month: "09月", pos: 55, neg: 23 },
      { month: "10月", pos: 50, neg: 27 },
      { month: "11月", pos: 58, neg: 22 },
      { month: "12月", pos: 61, neg: 20 },
      { month: "01月", pos: 64, neg: 19 },
      { month: "02月", pos: 62, neg: 21 },
      { month: "03月", pos: 65, neg: 18 },
      { month: "04月", pos: 67, neg: 17 },
      { month: "05月", pos: 63, neg: 20 },
      { month: "06月", pos: 69, neg: 16 },
      { month: "07月", pos: 70, neg: 15 },
    ],
    keywords: [
      { text: "IC設計龍頭", count: 145 },
      { text: "薪水不錯", count: 128 },
      { text: "競爭激烈", count: 115 },
      { text: "技術挑戰", count: 102 },
      { text: "加班多", count: 98 },
      { text: "同事優秀", count: 88 },
      { text: "股票", count: 76 },
      { text: "管理混亂", count: 65 },
    ],
    radar: [
      { attr: "薪資福利", score: 80 },
      { attr: "工作環境", score: 65 },
      { attr: "升遷發展", score: 72 },
      { attr: "生活平衡", score: 48 },
      { attr: "管理文化", score: 60 },
      { attr: "學習成長", score: 82 },
    ],
    events: [
      { date: "2025-02", label: "AI晶片新品發布", type: "positive" },
      { date: "2024-11", label: "Q3財報優於預期", type: "positive" },
      { date: "2025-05", label: "部分職缺凍結傳聞", type: "negative" },
    ],
    recent: [
      {
        text: "競爭氛圍很強，適合想快速成長的人",
        sentiment: "positive",
        date: "2025-07-27",
      },
      {
        text: "股票選擇權算是業界數一數二",
        sentiment: "positive",
        date: "2025-07-22",
      },
      {
        text: "PM和RD溝通有時很混亂",
        sentiment: "negative",
        date: "2025-07-19",
      },
      {
        text: "工時算長，但報酬相對來說可以接受",
        sentiment: "neutral",
        date: "2025-07-14",
      },
    ],
  },
  Google台灣: {
    score: 88,
    total: 542,
    positive: 402,
    negative: 48,
    neutral: 92,
    trend: [
      { month: "08月", pos: 78, neg: 10 },
      { month: "09月", pos: 80, neg: 9 },
      { month: "10月", pos: 76, neg: 12 },
      { month: "11月", pos: 82, neg: 8 },
      { month: "12月", pos: 84, neg: 7 },
      { month: "01月", pos: 83, neg: 8 },
      { month: "02月", pos: 85, neg: 7 },
      { month: "03月", pos: 87, neg: 6 },
      { month: "04月", pos: 86, neg: 7 },
      { month: "05月", pos: 88, neg: 6 },
      { month: "06月", pos: 89, neg: 5 },
      { month: "07月", pos: 90, neg: 5 },
    ],
    keywords: [
      { text: "工作生活平衡", count: 168 },
      { text: "福利超好", count: 155 },
      { text: "高標準面試", count: 134 },
      { text: "國際團隊", count: 112 },
      { text: "免費餐廳", count: 98 },
      { text: "彈性上班", count: 92 },
      { text: "難進", count: 78 },
      { text: "資源豐富", count: 71 },
    ],
    radar: [
      { attr: "薪資福利", score: 92 },
      { attr: "工作環境", score: 95 },
      { attr: "升遷發展", score: 75 },
      { attr: "生活平衡", score: 90 },
      { attr: "管理文化", score: 88 },
      { attr: "學習成長", score: 85 },
    ],
    events: [
      { date: "2025-03", label: "Gemini 台灣團隊擴編", type: "positive" },
      { date: "2025-06", label: "新辦公室啟用", type: "positive" },
      { date: "2024-09", label: "全球裁員波及少數", type: "negative" },
    ],
    recent: [
      {
        text: "福利是台灣業界最頂，各種補貼都有",
        sentiment: "positive",
        date: "2025-07-29",
      },
      {
        text: "工作和生活平衡做得很好，不會無故加班",
        sentiment: "positive",
        date: "2025-07-24",
      },
      {
        text: "面試過程很長，但進去後真的值得",
        sentiment: "positive",
        date: "2025-07-20",
      },
      {
        text: "升遷需要靠自己積極爭取，不會自動來",
        sentiment: "neutral",
        date: "2025-07-16",
      },
    ],
  },
  LINE: {
    score: 76,
    total: 324,
    positive: 178,
    negative: 42,
    neutral: 104,
    trend: [
      { month: "08月", pos: 68, neg: 12 },
      { month: "09月", pos: 70, neg: 10 },
      { month: "10月", pos: 65, neg: 15 },
      { month: "11月", pos: 72, neg: 9 },
      { month: "12月", pos: 75, neg: 8 },
      { month: "01月", pos: 73, neg: 10 },
      { month: "02月", pos: 76, neg: 7 },
      { month: "03月", pos: 78, neg: 6 },
      { month: "04月", pos: 77, neg: 8 },
      { month: "05月", pos: 79, neg: 5 },
      { month: "06月", pos: 81, neg: 4 },
      { month: "07月", pos: 80, neg: 6 },
    ],
    keywords: [
      { text: "通訊軟體龍頭", count: 98 },
      { text: "日本母公司", count: 87 },
      { text: "福利不錯", count: 82 },
      { text: "面試關卡多", count: 76 },
      { text: "薪資中上", count: 72 },
      { text: "工作彈性", count: 68 },
      { text: "國際化", count: 65 },
      { text: "產品多元", count: 58 },
    ],
    radar: [
      { attr: "薪資福利", score: 82 },
      { attr: "工作環境", score: 85 },
      { attr: "升遷發展", score: 68 },
      { attr: "生活平衡", score: 78 },
      { attr: "管理文化", score: 72 },
      { attr: "學習成長", score: 80 },
    ],
    events: [
      { date: "2025-02", label: "LINE Bank 用戶破百萬", type: "positive" },
      { date: "2024-12", label: "年度分紅發放", type: "positive" },
      { date: "2024-08", label: "組織調整傳聞", type: "negative" },
    ],
    recent: [
      {
        text: "日本總公司文化，但台灣辦公室氛圍不錯",
        sentiment: "positive",
        date: "2025-07-28",
      },
      {
        text: "面試考很多邏輯，但流程有點冗長",
        sentiment: "neutral",
        date: "2025-07-25",
      },
      {
        text: "薪資不如預期，但福利還行",
        sentiment: "negative",
        date: "2025-07-20",
      },
      {
        text: "很適合新鮮人累積經驗",
        sentiment: "positive",
        date: "2025-07-18",
      },
    ],
  },
  富邦金: {
    score: 64,
    total: 456,
    positive: 189,
    negative: 112,
    neutral: 155,
    trend: [
      { month: "08月", pos: 55, neg: 25 },
      { month: "09月", pos: 58, neg: 22 },
      { month: "10月", pos: 52, neg: 28 },
      { month: "11月", pos: 60, neg: 20 },
      { month: "12月", pos: 62, neg: 18 },
      { month: "01月", pos: 61, neg: 19 },
      { month: "02月", pos: 63, neg: 17 },
      { month: "03月", pos: 65, neg: 15 },
      { month: "04月", pos: 64, neg: 16 },
      { month: "05月", pos: 66, neg: 14 },
      { month: "06月", pos: 67, neg: 13 },
      { month: "07月", pos: 68, neg: 12 },
    ],
    keywords: [
      { text: "金融業龍頭", count: 142 },
      { text: "年終獎金", count: 128 },
      { text: "業績壓力", count: 115 },
      { text: "銀行體系", count: 102 },
      { text: "壽險", count: 95 },
      { text: "加班常態", count: 88 },
      { text: "福利中上", count: 82 },
      { text: "內部轉調", count: 70 },
    ],
    radar: [
      { attr: "薪資福利", score: 78 },
      { attr: "工作環境", score: 62 },
      { attr: "升遷發展", score: 70 },
      { attr: "生活平衡", score: 48 },
      { attr: "管理文化", score: 58 },
      { attr: "學習成長", score: 68 },
    ],
    events: [
      { date: "2025-01", label: "年終獎金發放", type: "positive" },
      { date: "2024-11", label: "銀行系統升級", type: "positive" },
      { date: "2024-09", label: "組織改組傳聞", type: "negative" },
    ],
    recent: [
      {
        text: "年終真的不錯，但平常壓力不小",
        sentiment: "neutral",
        date: "2025-07-27",
      },
      {
        text: "理專業績壓力大，適合抗壓性強的人",
        sentiment: "negative",
        date: "2025-07-24",
      },
      {
        text: "福利在金融業算前段班",
        sentiment: "positive",
        date: "2025-07-21",
      },
      {
        text: "內部系統有點老舊，常加班",
        sentiment: "negative",
        date: "2025-07-19",
      },
    ],
  },
  中華電信: {
    score: 71,
    total: 612,
    positive: 312,
    negative: 98,
    neutral: 202,
    trend: [
      { month: "08月", pos: 65, neg: 15 },
      { month: "09月", pos: 68, neg: 13 },
      { month: "10月", pos: 62, neg: 18 },
      { month: "11月", pos: 70, neg: 12 },
      { month: "12月", pos: 72, neg: 10 },
      { month: "01月", pos: 71, neg: 11 },
      { month: "02月", pos: 73, neg: 9 },
      { month: "03月", pos: 74, neg: 8 },
      { month: "04月", pos: 73, neg: 9 },
      { month: "05月", pos: 75, neg: 7 },
      { month: "06月", pos: 76, neg: 6 },
      { month: "07月", pos: 77, neg: 6 },
    ],
    keywords: [
      { text: "國營龍頭", count: 156 },
      { text: "穩定", count: 148 },
      { text: "薪資普通", count: 125 },
      { text: "福利佳", count: 118 },
      { text: "升遷慢", count: 105 },
      { text: "養老", count: 98 },
      { text: "5G建設", count: 85 },
      { text: "子公司", count: 72 },
    ],
    radar: [
      { attr: "薪資福利", score: 70 },
      { attr: "工作環境", score: 75 },
      { attr: "升遷發展", score: 55 },
      { attr: "生活平衡", score: 82 },
      { attr: "管理文化", score: 68 },
      { attr: "學習成長", score: 62 },
    ],
    events: [
      { date: "2025-03", label: "5G用戶突破", type: "positive" },
      { date: "2024-12", label: "年終獎金公告", type: "positive" },
      { date: "2024-10", label: "民營化傳聞", type: "neutral" },
    ],
    recent: [
      {
        text: "很穩定，適合想做到退休的人",
        sentiment: "positive",
        date: "2025-07-29",
      },
      {
        text: "薪資漲幅慢，但不用擔心被裁",
        sentiment: "neutral",
        date: "2025-07-26",
      },
      {
        text: "同事都待很久，氛圍像公務員",
        sentiment: "neutral",
        date: "2025-07-23",
      },
      {
        text: "升遷真的要等，要有耐心",
        sentiment: "negative",
        date: "2025-07-20",
      },
    ],
  },
  緯創: {
    score: 62,
    total: 384,
    positive: 152,
    negative: 108,
    neutral: 124,
    trend: [
      { month: "08月", pos: 52, neg: 28 },
      { month: "09月", pos: 54, neg: 26 },
      { month: "10月", pos: 50, neg: 30 },
      { month: "11月", pos: 55, neg: 25 },
      { month: "12月", pos: 58, neg: 22 },
      { month: "01月", pos: 57, neg: 23 },
      { month: "02月", pos: 59, neg: 21 },
      { month: "03月", pos: 60, neg: 20 },
      { month: "04月", pos: 61, neg: 19 },
      { month: "05月", pos: 62, neg: 18 },
      { month: "06月", pos: 63, neg: 17 },
      { month: "07月", pos: 64, neg: 16 },
    ],
    keywords: [
      { text: "電子代工", count: 132 },
      { text: "薪資普通", count: 118 },
      { text: "加班多", count: 112 },
      { text: "Server", count: 98 },
      { text: "福利一般", count: 85 },
      { text: "流動率高", count: 82 },
      { text: "學習機會", count: 78 },
      { text: "工作穩定", count: 72 },
    ],
    radar: [
      { attr: "薪資福利", score: 58 },
      { attr: "工作環境", score: 60 },
      { attr: "升遷發展", score: 62 },
      { attr: "生活平衡", score: 48 },
      { attr: "管理文化", score: 55 },
      { attr: "學習成長", score: 70 },
    ],
    events: [
      { date: "2025-02", label: "AI伺服器訂單", type: "positive" },
      { date: "2024-11", label: "季報優於預期", type: "positive" },
      { date: "2024-09", label: "組織調整", type: "neutral" },
    ],
    recent: [
      {
        text: "學得到東西，但薪水真的不高",
        sentiment: "neutral",
        date: "2025-07-28",
      },
      {
        text: "常常加班，流動率蠻高的",
        sentiment: "negative",
        date: "2025-07-25",
      },
      {
        text: "當跳板不錯，累積經驗後跳槽",
        sentiment: "positive",
        date: "2025-07-22",
      },
      {
        text: "主管管理方式傳統",
        sentiment: "negative",
        date: "2025-07-19",
      },
    ],
  },
  廣達: {
    score: 65,
    total: 412,
    positive: 182,
    negative: 98,
    neutral: 132,
    trend: [
      { month: "08月", pos: 55, neg: 25 },
      { month: "09月", pos: 58, neg: 22 },
      { month: "10月", pos: 52, neg: 28 },
      { month: "11月", pos: 60, neg: 20 },
      { month: "12月", pos: 62, neg: 18 },
      { month: "01月", pos: 61, neg: 19 },
      { month: "02月", pos: 63, neg: 17 },
      { month: "03月", pos: 65, neg: 15 },
      { month: "04月", pos: 64, neg: 16 },
      { month: "05月", pos: 66, neg: 14 },
      { month: "06月", pos: 68, neg: 12 },
      { month: "07月", pos: 67, neg: 13 },
    ],
    keywords: [
      { text: "筆電代工", count: 142 },
      { text: "伺服器", count: 128 },
      { text: "林口", count: 115 },
      { text: "薪資中上", count: 105 },
      { text: "加班費", count: 98 },
      { text: "福利尚可", count: 88 },
      { text: "流動率", count: 82 },
      { text: "客戶導向", count: 76 },
    ],
    radar: [
      { attr: "薪資福利", score: 68 },
      { attr: "工作環境", score: 62 },
      { attr: "升遷發展", score: 60 },
      { attr: "生活平衡", score: 52 },
      { attr: "管理文化", score: 58 },
      { attr: "學習成長", score: 72 },
    ],
    events: [
      { date: "2025-03", label: "AI伺服器出貨", type: "positive" },
      { date: "2024-12", label: "年終獎金", type: "positive" },
      { date: "2024-08", label: "組織異動", type: "neutral" },
    ],
    recent: [
      {
        text: "薪資在代工廠算不錯",
        sentiment: "positive",
        date: "2025-07-29",
      },
      {
        text: "加班有給加班費，但常態加班",
        sentiment: "neutral",
        date: "2025-07-26",
      },
      {
        text: "林口總部環境不錯",
        sentiment: "positive",
        date: "2025-07-23",
      },
      {
        text: "客戶要求多，壓力不小",
        sentiment: "negative",
        date: "2025-07-20",
      },
    ],
  },
};

const allCompanies = Object.keys(MOCK_DB);
const scoreColor = (s) =>
  s >= 75 ? "#10b981" : s >= 50 ? "#f59e0b" : "#ef4444";
const PIE_COLORS = ["#10b981", "#ef4444", "#6b7280"];
const BADGE = {
  positive: {
    bg: "#10b98120",
    color: "#10b981",
    border: "#10b98140",
    label: "正面",
  },
  negative: {
    bg: "#ef444420",
    color: "#ef4444",
    border: "#ef444440",
    label: "負面",
  },
  neutral: {
    bg: "#6b728020",
    color: "#9ca3af",
    border: "#6b728040",
    label: "中立",
  },
};

function ScoreRing({ score }) {
  const r = 52,
    circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const c = scoreColor(score);
  return (
    <div
      style={{
        position: "relative",
        width: 132,
        height: 132,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        width="132"
        height="132"
        viewBox="0 0 132 132"
      >
        <circle
          cx="66"
          cy="66"
          r={r}
          fill="none"
          stroke="#1f2937"
          strokeWidth="10"
        />
        <circle
          cx="66"
          cy="66"
          r={r}
          fill="none"
          stroke={c}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: c, lineHeight: 1 }}>
          {score}
        </div>
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>
          風評分數
        </div>
      </div>
    </div>
  );
}

function KeywordCloud({ keywords }) {
  const max = Math.max(...keywords.map((k) => k.count));
  const colors = [
    "#818cf8",
    "#34d399",
    "#fb923c",
    "#f472b6",
    "#60a5fa",
    "#a78bfa",
    "#fbbf24",
    "#2dd4bf",
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {keywords.map((kw, i) => {
        const size = 12 + (kw.count / max) * 10;
        const c = colors[i % colors.length];
        return (
          <span
            key={kw.text}
            style={{
              fontSize: size,
              padding: "6px 14px",
              borderRadius: 99,
              fontWeight: 600,
              background: c + "22",
              color: c,
              border: `1px solid ${c}44`,
              cursor: "default",
            }}
          >
            {kw.text}{" "}
            <span style={{ opacity: 0.6, fontSize: 11 }}>{kw.count}</span>
          </span>
        );
      })}
    </div>
  );
}

const tt = {
  background: "#0f172a",
  border: "1px solid #1f2937",
  borderRadius: 8,
  color: "#fff",
  fontSize: 12,
};

export default function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [company, setCompany] = useState(null);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [compareQuery, setCompareQuery] = useState("");
  const [compareData, setCompareData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (name) => {
    const key = name || query;
    if (!key.trim()) return;

    setLoading(true);
    setError(null);
    setCompany(key);
    setData(null);
    setCompareData(null);
    setCompareQuery("");
    setCurrentPage(1);

    // 直接從 MOCK_DB 拿資料
    setTimeout(() => {
      if (MOCK_DB[key]) {
        setData(MOCK_DB[key]);
      } else {
        setData("not_found");
      }
      setLoading(false);
    }, 800); // 模擬載入時間
  };

  const handleCompare = async (name) => {
    if (!name || !data) return;

    setCompareQuery(name);

    // 先檢查 MOCK_DB
    if (MOCK_DB[name]) {
      setCompareData(MOCK_DB[name]);
      return;
    }

    // 嘗試從 API 獲取
    try {
      const res = await fetch(`/api/company/${encodeURIComponent(name)}`);
      if (res.ok) {
        const apiData = await res.json();
        setCompareData(apiData);
      }
    } catch (err) {
      console.error("比較資料獲取失敗:", err);
    }
  };

  const handleInput = (v) => {
    setQuery(v);
    setSuggestions(v ? allCompanies.filter((c) => c.includes(v)) : []);
  };

  const tabs = [
    { id: "overview", label: "📊 總覽" },
    { id: "trend", label: "📈 趨勢" },
    { id: "keywords", label: "🏷️ 關鍵詞" },
    { id: "radar", label: "🎯 評分雷達" },
    { id: "compare", label: "⚖️ 比較" },
  ];

  const isMockData =
    data && (data === "not_found" || data === "timeout" || data.is_mock);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#fff",
        fontFamily: "'Inter','Noto Sans TC',sans-serif",
      }}
    >
      {/* Header 保持不變 */}
      <header
        style={{
          borderBottom: "1px solid #111827",
          background: "#030712",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "linear-gradient(135deg,#6366f1,#9333ea)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              R
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Career Radar</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>
                PTT 職場輿情分析平台
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: "#6b7280",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
              }}
            ></span>
            即時更新
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>
        {/* Hero 保持不變 */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              background: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 10,
              letterSpacing: -1,
            }}
          >
            找工作前，先聽聽大家怎麼說
          </h1>
          <p style={{ color: "#6b7280", fontSize: 16, marginBottom: 32 }}>
            整合 PTT Gossiping · Salary · Tech_Job 板的真實職場聲音
          </p>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <input
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "#0f172a",
                      border: "1px solid #1f2937",
                      borderRadius: 12,
                      padding: "13px 18px",
                      color: "#fff",
                      fontSize: 15,
                      outline: "none",
                    }}
                    placeholder="輸入公司名稱，例如：台積電、Google台灣"
                    value={query}
                    onChange={(e) => handleInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  {suggestions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        marginTop: 4,
                        background: "#0f172a",
                        border: "1px solid #1f2937",
                        borderRadius: 12,
                        zIndex: 50,
                        overflow: "hidden",
                      }}
                    >
                      {suggestions.map((s) => (
                        <div
                          key={s}
                          style={{
                            padding: "12px 18px",
                            cursor: "pointer",
                            color: "#d1d5db",
                            fontSize: 14,
                          }}
                          onClick={() => {
                            setQuery(s);
                            handleSearch(s);
                          }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleSearch()}
                  style={{
                    padding: "13px 22px",
                    background: "#4f46e5",
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 15,
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {loading ? "分析中..." : "搜尋"}
                </button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 14,
                flexWrap: "wrap",
              }}
            >
              {[
                "台積電",
                "聯發科",
                "Google",
                "LINE",
                "富邦金",
                "中華電信",
                "緯創",
                "廣達",
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setQuery(c);
                    handleSearch(c);
                  }}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 99,
                    fontSize: 12,
                    background: "#0f172a",
                    color: "#6b7280",
                    border: "1px solid #1f2937",
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 錯誤提示 */}
        {error && (
          <div
            style={{
              background: "#ef444420",
              border: "1px solid #ef4444",
              borderRadius: 8,
              padding: "12px 20px",
              marginBottom: 20,
              fontSize: 14,
              color: "#ef4444",
              textAlign: "center",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* 載入中 */}
        {loading && (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>正在分析 PTT 討論中...</div>
          </div>
        )}

        {/* 搜尋結果 */}
        {company && !loading && (
          <>
            {!data || data === "not_found" || data === "timeout" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 0",
                  color: "#6b7280",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
                <div style={{ fontSize: 16 }}>
                  找不到「{company}」的相關資料
                </div>
                <div style={{ fontSize: 13, marginTop: 8, color: "#4b5563" }}>
                  目前支援：{allCompanies.join("、")}
                </div>
              </div>
            ) : (
              <>
                {/* 模擬資料提示 - 移到最上方 */}
                {isMockData && (
                  <div
                    style={{
                      background: "#f59e0b20",
                      border: "1px solid #f59e0b",
                      borderRadius: 8,
                      padding: "12px 20px",
                      marginBottom: 20,
                      fontSize: 14,
                      color: "#f59e0b",
                      textAlign: "center",
                    }}
                  >
                    ⚠️ 目前找不到「{company}」的 PTT
                    討論，這裡顯示的是模擬參考資料
                  </div>
                )}

                {/* Company Header Card */}
                <div
                  style={{
                    background: "#0a0f1e",
                    border: "1px solid #111827",
                    borderRadius: 20,
                    padding: 24,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 20,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 16 }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 12,
                          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                          fontWeight: 700,
                        }}
                      >
                        {company[0]}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {company}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#6b7280",
                            marginBottom: 8,
                          }}
                        >
                          共分析{" "}
                          <strong style={{ color: "#fff" }}>
                            {data.total?.toLocaleString()}
                          </strong>{" "}
                          則討論 · 過去 12 個月
                        </div>
                        <div
                          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                        >
                          {[
                            ["#10b981", `正面 ${data.positive}`],
                            ["#ef4444", `負面 ${data.negative}`],
                            ["#6b7280", `中立 ${data.neutral}`],
                          ].map(([c, l]) => (
                            <span
                              key={l}
                              style={{
                                fontSize: 11,
                                padding: "4px 10px",
                                borderRadius: 99,
                                background: c + "20",
                                color: c,
                                border: `1px solid ${c}40`,
                              }}
                            >
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ScoreRing score={data.score} />
                  </div>
                </div>

                {/* Tabs */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    background: "#0a0f1e",
                    padding: 4,
                    borderRadius: 14,
                    border: "1px solid #111827",
                    marginBottom: 24,
                    overflowX: "auto",
                  }}
                >
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      style={{
                        padding: "9px 18px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        background: tab === t.id ? "#4f46e5" : "transparent",
                        color: tab === t.id ? "#fff" : "#6b7280",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Overview Tab */}
                {/* 最新討論區塊 - 加入分頁 */}
                <div
                  style={{
                    background: "#0a0f1e",
                    border: "1px solid #111827",
                    borderRadius: 20,
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#e2e8f0" }}>
                      最新討論
                    </div>

                    {/* 分頁控制 */}
                    {data.recent && data.recent.length > 5 && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            background: "#1f2937",
                            border: "1px solid #374151",
                            color: currentPage === 1 ? "#4b5563" : "#fff",
                            cursor:
                              currentPage === 1 ? "not-allowed" : "pointer",
                            fontSize: 12,
                          }}
                        >
                          上一頁
                        </button>
                        <span
                          style={{
                            padding: "4px 10px",
                            background: "#0f172a",
                            borderRadius: 6,
                            fontSize: 12,
                            color: "#9ca3af",
                          }}
                        >
                          {currentPage} / {Math.ceil(data.recent.length / 5)}
                        </span>
                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(
                                Math.ceil(data.recent.length / 5),
                                currentPage + 1,
                              ),
                            )
                          }
                          disabled={
                            currentPage === Math.ceil(data.recent.length / 5)
                          }
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            background: "#1f2937",
                            border: "1px solid #374151",
                            color:
                              currentPage === Math.ceil(data.recent.length / 5)
                                ? "#4b5563"
                                : "#fff",
                            cursor:
                              currentPage === Math.ceil(data.recent.length / 5)
                                ? "not-allowed"
                                : "pointer",
                            fontSize: 12,
                          }}
                        >
                          下一頁
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 顯示當前頁面的 5 則留言 */}
                  {data.recent
                    ?.slice((currentPage - 1) * 5, currentPage * 5)
                    .map((r, i) => (
                      <div
                        key={i}
                        style={{
                          padding: 12,
                          background: "#0f172a",
                          borderRadius: 12,
                          marginBottom: 8,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            color: "#d1d5db",
                            lineHeight: 1.6,
                            marginBottom: 8,
                          }}
                        >
                          {/* 看板標籤 */}
                          {r.board && (
                            <span
                              style={{
                                fontSize: 10,
                                padding: "2px 6px",
                                background: "#1f2937",
                                borderRadius: 4,
                                marginRight: 8,
                                color: "#9ca3af",
                                display: "inline-block",
                              }}
                            >
                              {r.board}
                            </span>
                          )}

                          {/* 文章標題（如果有連結） */}
                          {r.url ? (
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#d1d5db",
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.color = "#818cf8")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.color = "#d1d5db")
                              }
                            >
                              {r.text.length > 50
                                ? r.text.substring(0, 50) + "..."
                                : r.text}
                            </a>
                          ) : (
                            <span>
                              {r.text.length > 50
                                ? r.text.substring(0, 50) + "..."
                                : r.text}
                            </span>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 4,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              padding: "3px 8px",
                              borderRadius: 99,
                              fontWeight: 600,
                              background: BADGE[r.sentiment].bg,
                              color: BADGE[r.sentiment].color,
                              border: `1px solid ${BADGE[r.sentiment].border}`,
                            }}
                          >
                            {BADGE[r.sentiment].label}
                          </span>
                          <span style={{ fontSize: 11, color: "#4b5563" }}>
                            {r.date}
                          </span>
                        </div>
                      </div>
                    ))}

                  {/* 如果沒有留言 */}
                  {(!data.recent || data.recent.length === 0) && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px 0",
                        color: "#6b7280",
                      }}
                    >
                      尚無最新討論
                    </div>
                  )}
                </div>

                {/* Trend Tab */}
                {tab === "trend" && (
                  <div
                    style={{
                      background: "#0a0f1e",
                      border: "1px solid #111827",
                      borderRadius: 20,
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#e2e8f0",
                        marginBottom: 20,
                      }}
                    >
                      過去 12 個月情緒趨勢
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={data.trend}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "#6b7280", fontSize: 11 }}
                        />
                        <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                        <Tooltip contentStyle={tt} />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          formatter={(v) => (
                            <span style={{ color: "#9ca3af", fontSize: 11 }}>
                              {v === "pos" ? "正面" : "負面"}
                            </span>
                          )}
                        />
                        <Line
                          type="monotone"
                          dataKey="pos"
                          stroke="#10b981"
                          strokeWidth={2.5}
                          dot={{ r: 3 }}
                          name="pos"
                        />
                        <Line
                          type="monotone"
                          dataKey="neg"
                          stroke="#ef4444"
                          strokeWidth={2.5}
                          dot={{ r: 3 }}
                          name="neg"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Keywords Tab */}
                {tab === "keywords" && (
                  <div>
                    <div
                      style={{
                        background: "#0a0f1e",
                        border: "1px solid #111827",
                        borderRadius: 20,
                        padding: 24,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#e2e8f0",
                          marginBottom: 6,
                        }}
                      >
                        高頻關鍵詞雲
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginBottom: 16,
                        }}
                      >
                        字體越大代表出現次數越多
                      </div>
                      <KeywordCloud keywords={data.keywords} />
                    </div>
                    <div
                      style={{
                        background: "#0a0f1e",
                        border: "1px solid #111827",
                        borderRadius: 20,
                        padding: 24,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#e2e8f0",
                          marginBottom: 16,
                        }}
                      >
                        關鍵詞出現頻率
                      </div>
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart
                          data={data.keywords}
                          layout="vertical"
                          margin={{ left: 10 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#111827"
                            horizontal={false}
                          />
                          <XAxis
                            type="number"
                            tick={{ fill: "#6b7280", fontSize: 11 }}
                          />
                          <YAxis
                            dataKey="text"
                            type="category"
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                            width={85}
                          />
                          <Tooltip contentStyle={tt} />
                          <Bar
                            dataKey="count"
                            radius={[0, 6, 6, 0]}
                            fill="#818cf8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Radar Tab */}
                {tab === "radar" && (
                  <div
                    style={{
                      background: "#0a0f1e",
                      border: "1px solid #111827",
                      borderRadius: 20,
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#e2e8f0",
                        marginBottom: 20,
                      }}
                    >
                      多維度職場評分
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                      <RadarChart
                        data={data.radar}
                        cx="50%"
                        cy="50%"
                        outerRadius="68%"
                      >
                        <PolarGrid stroke="#1f2937" />
                        <PolarAngleAxis
                          dataKey="attr"
                          tick={{ fill: "#9ca3af", fontSize: 12 }}
                        />
                        <Radar
                          name={company}
                          dataKey="score"
                          stroke="#818cf8"
                          fill="#818cf8"
                          fillOpacity={0.25}
                          strokeWidth={2}
                        />
                        <Tooltip contentStyle={tt} />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 10,
                        marginTop: 16,
                      }}
                    >
                      {data.radar?.map((r) => (
                        <div
                          key={r.attr}
                          style={{
                            background: "#0f172a",
                            borderRadius: 12,
                            padding: 12,
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              color: "#6b7280",
                              marginBottom: 4,
                            }}
                          >
                            {r.attr}
                          </div>
                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 700,
                              color: scoreColor(r.score),
                            }}
                          >
                            {r.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compare Tab */}
                {tab === "compare" && (
                  <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                      <input
                        style={{
                          flex: 1,
                          background: "#0f172a",
                          border: "1px solid #1f2937",
                          borderRadius: 12,
                          padding: "13px 18px",
                          color: "#fff",
                          fontSize: 15,
                          outline: "none",
                        }}
                        placeholder="輸入要比較的公司名稱..."
                        value={compareQuery}
                        onChange={(e) => setCompareQuery(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleCompare(compareQuery)
                        }
                      />
                      <button
                        onClick={() => handleCompare(compareQuery)}
                        style={{
                          padding: "13px 22px",
                          background: "#4f46e5",
                          borderRadius: 12,
                          fontWeight: 600,
                          fontSize: 15,
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        比較
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginBottom: 20,
                        flexWrap: "wrap",
                      }}
                    >
                      {allCompanies
                        .filter((c) => c !== company)
                        .map((c) => (
                          <button
                            key={c}
                            onClick={() => {
                              setCompareQuery(c);
                              handleCompare(c);
                            }}
                            style={{
                              padding: "5px 14px",
                              borderRadius: 99,
                              fontSize: 12,
                              background: "#0f172a",
                              color: "#6b7280",
                              border: "1px solid #1f2937",
                              cursor: "pointer",
                            }}
                          >
                            {c}
                          </button>
                        ))}
                    </div>
                    {compareData && (
                      <div
                        style={{
                          background: "#0a0f1e",
                          border: "1px solid #111827",
                          borderRadius: 20,
                          padding: 24,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginBottom: 32,
                          }}
                        >
                          {[
                            { name: company, d: data },
                            { name: compareQuery, d: compareData },
                          ].map(({ name, d }, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                              <div
                                style={{
                                  fontSize: 13,
                                  color: "#6b7280",
                                  marginBottom: 10,
                                }}
                              >
                                {name}
                              </div>
                              <ScoreRing score={d.score} />
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "#4b5563",
                                  marginTop: 6,
                                }}
                              >
                                {d.total} 則討論
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#e2e8f0",
                            marginBottom: 14,
                          }}
                        >
                          各維度比較
                        </div>
                        {data.radar?.map((r, i) => {
                          const b = compareData.radar[i]?.score || 0;
                          const max = Math.max(r.score, b, 1);
                          return (
                            <div key={r.attr} style={{ marginBottom: 12 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: 12,
                                  color: "#6b7280",
                                  marginBottom: 4,
                                }}
                              >
                                <span>{r.attr}</span>
                                <span style={{ display: "flex", gap: 16 }}>
                                  <span style={{ color: "#818cf8" }}>
                                    {r.score}
                                  </span>
                                  <span style={{ color: "#34d399" }}>{b}</span>
                                </span>
                              </div>
                              <div
                                style={{
                                  height: 5,
                                  background: "#1f2937",
                                  borderRadius: 99,
                                  marginBottom: 3,
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    height: "100%",
                                    width: `${(r.score / max) * 100}%`,
                                    background: "#818cf8",
                                    borderRadius: 99,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  height: 5,
                                  background: "#1f2937",
                                  borderRadius: 99,
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    height: "100%",
                                    width: `${(b / max) * 100}%`,
                                    background: "#34d399",
                                    borderRadius: 99,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#e2e8f0",
                            margin: "24px 0 12px",
                          }}
                        >
                          正面情緒趨勢比較
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                          <LineChart
                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#111827"
                            />
                            <XAxis
                              dataKey="month"
                              data={data.trend}
                              tick={{ fill: "#6b7280", fontSize: 11 }}
                            />
                            <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                            <Tooltip contentStyle={tt} />
                            <Legend
                              formatter={(v) => (
                                <span
                                  style={{ color: "#9ca3af", fontSize: 11 }}
                                >
                                  {v}
                                </span>
                              )}
                            />
                            <Line
                              data={data.trend}
                              type="monotone"
                              dataKey="pos"
                              stroke="#818cf8"
                              strokeWidth={2.5}
                              dot={{ r: 3 }}
                              name={company}
                            />
                            <Line
                              data={compareData.trend}
                              type="monotone"
                              dataKey="pos"
                              stroke="#34d399"
                              strokeWidth={2.5}
                              dot={{ r: 3 }}
                              name={compareQuery}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Empty State */}
        {!company && !loading && (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#4b5563" }}
          >
            <div style={{ fontSize: 56, marginBottom: 12 }}>📡</div>
            <div style={{ fontSize: 16, color: "#6b7280" }}>
              輸入公司名稱，開始分析職場聲音
            </div>
            <div style={{ fontSize: 13, marginTop: 6 }}>
              整合 PTT 真實討論，提供客觀風評分析
            </div>
          </div>
        )}
      </main>

      <footer
        style={{
          borderTop: "1px solid #0f172a",
          padding: "24px 0",
          textAlign: "center",
          fontSize: 12,
          color: "#374151",
        }}
      >
        Career Radar · 資料來源：PTT Gossiping / Salary / Tech_Job 板 · 僅供參考
      </footer>
    </div>
  );
}
