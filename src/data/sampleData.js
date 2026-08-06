// Illustrative sample data, ported 1:1 from the approved Claude Design
// prototype (`HC Manpower Analysis.dc.html`). Replace with real EMP_Career
// query results once the backend/API is wired up — shapes here are the
// contract the UI components expect.

import { G, GOLD, RED, OK, MUT } from '../utils/colors';
import { arc, donut, bars, heatColor, spark } from '../utils/chart';

const PALETTE = { G, GOLD };

export const screens = {
  dash: {
    title: 'Dashboard',
    sub: 'Ringkasan eksekutif workforce health · Jul 2026',
  },
  turnover: {
    title: 'Turn Over',
    sub: 'Analisis resign murni (voluntary) · 6 dimensi klasifikasi',
  },
  movement: {
    title: 'Manpower Movement',
    sub: 'Pergerakan karyawan antar posisi, unit, dan lokasi',
  },
};

export const toTabs = [
  ['ringkas', 'Ringkasan TO'],
  ['tren', 'Tren Waktu'],
  ['analisis', 'Analisis Resign'],
  ['heatmap', 'Heatmap Unit'],
];

// --- TO Rate trend (12 months) ---------------------------------------
const MONTHS = ['Ags', 'Sep', 'Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];
const SERIES = [1.1, 1.0, 1.2, 1.3, 1.2, 1.4, 1.3, 1.5, 1.4, 1.3, 1.3, 1.6];

export function buildTrend() {
  const W = 760, H = 170, PAD = 18;
  const mn = 0.8, mx = 1.8;
  const pts = SERIES.map((v, i) => ({
    v,
    month: MONTHS[i],
    x: +(PAD + i * ((W - PAD * 2) / (SERIES.length - 1))).toFixed(1),
    y: +(H - ((v - mn) / (mx - mn)) * (H - 30) - 12).toFixed(1),
  }));
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p.x + ' ' + p.y).join(' ');
  const area = line + ` L${pts[pts.length - 1].x} ${H} L${pts[0].x} ${H} Z`;
  const peak = SERIES.indexOf(Math.max(...SERIES));
  const points = pts.map((p, i) => {
    const key = i === peak || i === pts.length - 1 || i === 0;
    return {
      ...p,
      r: key ? 3.6 : 2.2,
      fill: i === pts.length - 1 ? GOLD : G,
      label: key ? p.v.toFixed(1) + '%' : '',
      ly: +(p.y - 11).toFixed(1),
      lsize: 11,
      lweight: 700,
      lfill: i === pts.length - 1 ? '#B77A1E' : G,
    };
  });
  return { line, area, pts: points };
}

// --- Sankey (mutasi antar unit) ---------------------------------------
const FLOWS = [
  ['Estate A', 'Estate D', 38], ['Estate A', 'Estate B', 28], ['Estate A', 'Mill A', 20],
  ['Estate C', 'Estate D', 30], ['Estate C', 'Estate F', 34],
  ['Mill B', 'Estate B', 22], ['Mill B', 'Mill A', 19], ['Estate D', 'Estate F', 23],
];
const SRC_NAMES = ['Estate A', 'Estate C', 'Mill B', 'Estate D'];
const DST_NAMES = ['Estate D', 'Estate F', 'Estate B', 'Mill A'];

export function buildSankey() {
  const sum = (arr, f) => arr.reduce((a, b) => a + f(b), 0);
  const total = sum(FLOWS, (f) => f[2]);
  const TOP = 28, HGT = 240, GAP = 12;
  const kL = (HGT - GAP * (SRC_NAMES.length - 1)) / total;
  const kR = (HGT - GAP * (DST_NAMES.length - 1)) / total;
  const nodes = [];
  const posL = {}, posR = {};

  let y = TOP;
  SRC_NAMES.forEach((n) => {
    const v = sum(FLOWS.filter((f) => f[0] === n), (f) => f[2]);
    const h = v * kL;
    posL[n] = { y, h, cursor: y };
    nodes.push({
      name: n, value: v, x: 122, y: +y.toFixed(1), h: +h.toFixed(1), color: G,
      tx: 114, ty: +(y + h / 2 - 2).toFixed(1), ty2: +(y + h / 2 + 11).toFixed(1), anchor: 'end',
    });
    y += h + GAP;
  });

  y = TOP;
  DST_NAMES.forEach((n) => {
    const v = sum(FLOWS.filter((f) => f[1] === n), (f) => f[2]);
    const h = v * kR;
    posR[n] = { y, h, cursor: y };
    nodes.push({
      name: n, value: v, x: 627, y: +y.toFixed(1), h: +h.toFixed(1), color: '#7FA394',
      tx: 646, ty: +(y + h / 2 - 2).toFixed(1), ty2: +(y + h / 2 + 11).toFixed(1), anchor: 'start',
    });
    y += h + GAP;
  });

  const maxFlow = Math.max(...FLOWS.map((f) => f[2]));
  const flows = FLOWS.map(([a, b, v]) => {
    const L = posL[a], R = posR[b];
    const h1 = v * kL, h2 = v * kR;
    const y0 = L.cursor, y1 = R.cursor;
    L.cursor += h1;
    R.cursor += h2;
    const x0 = 133, x1 = 627, m = (x0 + x1) / 2;
    return {
      d: `M${x0} ${y0.toFixed(1)}C${m} ${y0.toFixed(1)},${m} ${y1.toFixed(1)},${x1} ${y1.toFixed(1)}L${x1} ${(y1 + h2).toFixed(1)}C${m} ${(y1 + h2).toFixed(1)},${m} ${(y0 + h1).toFixed(1)},${x0} ${(y0 + h1).toFixed(1)}Z`,
      color: v === maxFlow ? GOLD : G,
      op: v === maxFlow ? 0.5 : 0.18,
    };
  });

  return { nodes, flows };
}

// --- Heatmap: Lama Kerja x Unit ----------------------------------------
export const heatCols = ['<1 th', '1–3 th', '3–5 th', '5–10 th', '>10 th'];
const HEAT_DATA = [
  ['Estate A', [3.1, 2.4, 1.8, 1.1, 0.6]],
  ['Estate B', [2.2, 1.7, 1.2, 0.8, 0.4]],
  ['Estate C', [4.2, 3.3, 2.1, 1.4, 0.7]],
  ['Estate D', [1.9, 1.5, 1.1, 0.7, 0.5]],
  ['Estate F', [3.4, 2.6, 1.6, 0.9, 0.5]],
  ['Mill B', [2.6, 2.0, 1.4, 1.0, 0.6]],
];

export function buildHeatRows() {
  return HEAT_DATA.map(([name, cells]) => ({
    name,
    cells: cells.map((v) => {
      const t = v / 4.2;
      return { v: v.toFixed(1), bg: heatColor(t), fg: t > 0.55 ? '#fff' : '#3C4A43' };
    }),
  }));
}

export const heatLegend = [0, 0.17, 0.34, 0.5, 0.67, 0.84, 1].map((t) => heatColor(t));

// --- Jenjang Pendidikan bar chart ---------------------------------------
const EDU_VALS = [
  { n: 'SD', v: 6 }, { n: 'SMP', v: 18 }, { n: 'SMA/SMK', v: 44 },
  { n: 'D3', v: 14 }, { n: 'S1', v: 16 }, { n: 'S2+', v: 2 },
];
const EDU_MAX = 44;

export function buildDimEdu() {
  return EDU_VALS.map((e, i) => {
    const h = (e.v / EDU_MAX) * 118;
    return {
      name: e.n, x: 10 + i * 54, cx: 29 + i * 54, y: +(140 - h).toFixed(1), h: +h.toFixed(1),
      ty: +(134 - h).toFixed(1), label: e.v + '%', color: e.v === EDU_MAX ? GOLD : G,
    };
  });
}

// --- Donuts ---------------------------------------------------------
export function buildDonutAge() {
  return donut(
    [{ n: '<25', v: 14 }, { n: '25–34', v: 48, hi: true }, { n: '35–44', v: 22 }, { n: '45–54', v: 11 }, { n: '55+', v: 5 }],
    PALETTE
  );
}

export function buildDonutTenure() {
  return donut(
    [{ n: '<1 th', v: 22, hi: true }, { n: '1–3 th', v: 31, hi: true }, { n: '3–5 th', v: 19 }, { n: '5–10 th', v: 17 }, { n: '>10 th', v: 11 }],
    PALETTE
  );
}

// --- KPI cards ---------------------------------------------------------
export function buildKpis() {
  return [
    { label: 'Total Karyawan Aktif', value: '12.480', delta: '▲ 0,8%', deltaColor: OK, note: 'vs 12.381 bulan lalu', spark: spark([12210, 12250, 12300, 12290, 12340, 12381, 12480], 76, 22) },
    { label: 'TO Rate Bulan Ini', value: '1,6%', delta: '▲ 0,3pp', deltaColor: RED, note: 'ambang perhatian 2,0%', spark: spark([1.3, 1.5, 1.4, 1.3, 1.3, 1.3, 1.6], 76, 22) },
    { label: 'Mutasi Bulan Ini', value: '214', delta: '▼ 5%', deltaColor: OK, note: 'dari 225 bulan lalu', spark: spark([198, 230, 241, 236, 225, 229, 214], 76, 22) },
    { label: 'Resign YTD', value: '612', delta: '▲ 12%', deltaColor: RED, note: '546 pada periode sama 2025', spark: spark([88, 168, 240, 321, 402, 505, 612], 76, 22) },
  ];
}

export const toKpis = [
  { label: 'TO Rate Jul 2026', value: '1,6%', delta: '▲ 0,3pp', deltaColor: RED, note: 'resign murni saja' },
  { label: 'Resign Murni', value: '198', delta: '▲ 21', deltaColor: RED, note: 'TRANSITION TYPE = RESIGN' },
  { label: 'Rata-rata Karyawan Aktif', value: '12.431', delta: '▲ 0,5%', deltaColor: MUT, note: 'penyebut formula TO' },
  { label: 'Exit Non-Voluntary', value: '96', delta: '—', deltaColor: MUT, note: 'tidak dihitung dalam TO' },
];

export function buildTopUnits() {
  return bars([{ n: 'Estate C', v: 2.8 }, { n: 'Estate A', v: 2.3 }, { n: 'Estate F', v: 2.1 }, { n: 'Mill B', v: 1.7 }, { n: 'Estate D', v: 1.4 }], '%', 0, PALETTE);
}

export function buildByLevel() {
  return bars([{ n: 'Karyawan Harian', v: 2.4 }, { n: 'Staf', v: 1.5 }, { n: 'Asisten', v: 1.1 }, { n: 'Asisten Kepala', v: 0.7 }, { n: 'Manajer ke atas', v: 0.3 }], '%', 0, PALETTE);
}

export const exitMix = [
  { name: 'Resign (voluntary)', value: '198', w: '100', color: G, nameColor: '#1B2420', tag: 'dihitung dalam TO Rate' },
  { name: 'PHK / Terminate', value: '54', w: '27.3', color: '#C3D0C9', nameColor: '#6B7770', tag: 'tidak dihitung dalam TO' },
  { name: 'Migrate antar entitas', value: '31', w: '15.7', color: '#C3D0C9', nameColor: '#6B7770', tag: 'tidak dihitung dalam TO' },
  { name: 'Meninggal dunia', value: '11', w: '5.6', color: '#C3D0C9', nameColor: '#6B7770', tag: 'tidak dihitung dalam TO' },
];

export function buildDimReason() {
  return bars([{ n: 'Gaji/Kompensasi', v: 34 }, { n: 'Jenjang Karir', v: 21 }, { n: 'Jarak/Lokasi', v: 16 }, { n: 'Keluarga', v: 13 }, { n: 'Kesehatan', v: 9 }, { n: 'Lainnya', v: 7 }], '%', 0, PALETTE);
}

export function buildDimBdp() {
  return bars([{ n: 'Non-BDP', v: 62 }, { n: 'BDP Aktif', v: 28 }, { n: 'BDP Selesai', v: 10 }], '%', 1, PALETTE);
}

export const resignRows = [
  { nik: '2104882', nama: 'Andi Saputra', jabatan: 'Mandor Panen', unit: 'Estate C', masa: '0 th 8 bl', umur: '27', edu: 'SMA/SMK', alasan: 'Gaji/Kompensasi', alasanColor: '#B77A1E' },
  { nik: '1998231', nama: 'Rina Kusuma', jabatan: 'Staf Administrasi', unit: 'Estate A', masa: '4 th 2 bl', umur: '31', edu: 'D3', alasan: 'Jenjang Karir', alasanColor: '#3C4A43' },
  { nik: '2201774', nama: 'Joko Prasetyo', jabatan: 'Operator Mill', unit: 'Mill B', masa: '1 th 5 bl', umur: '29', edu: 'SMA/SMK', alasan: 'Jarak/Lokasi', alasanColor: '#3C4A43' },
  { nik: '1907550', nama: 'Sri Wahyuni', jabatan: 'Krani Divisi', unit: 'Estate F', masa: '6 th 11 bl', umur: '38', edu: 'SMA/SMK', alasan: 'Keluarga', alasanColor: '#3C4A43' },
  { nik: '2306019', nama: 'Bagus Hermawan', jabatan: 'Asisten Divisi', unit: 'Estate C', masa: '0 th 6 bl', umur: '25', edu: 'S1', alasan: 'Gaji/Kompensasi', alasanColor: '#B77A1E' },
  { nik: '2011938', nama: 'Nurul Aini', jabatan: 'Krani Gudang', unit: 'Estate D', masa: '3 th 1 bl', umur: '33', edu: 'SMA/SMK', alasan: 'Kesehatan', alasanColor: '#3C4A43' },
];

export const moveSummary = [
  { label: 'Rekrutmen Baru', note: 'karyawan masuk', value: '342', color: G },
  { label: 'Mutasi Internal', note: 'antar unit / lokasi', value: '214', color: G },
  { label: 'Promosi', note: 'naik jabatan', value: '87', color: OK },
  { label: 'Pengangkatan', note: 'kontrak → tetap', value: '54', color: G },
  { label: 'Demosi', note: 'turun jabatan', value: '6', color: MUT },
  { label: 'Keluar', note: 'semua jenis exit', value: '294', color: RED },
];

export const moveRows = [
  { nik: '2210447', nama: 'Bayu Nugroho', jabatan: 'Asisten Divisi → Asisten Kepala', unit: 'Estate A → Estate D', tgl: '01 Jul 2026', jenis: 'Promosi', jenisColor: OK },
  { nik: '1988021', nama: 'Dewi Lestari', jabatan: 'Krani Divisi → Krani Divisi', unit: 'Estate C → Estate F', tgl: '01 Jul 2026', jenis: 'Mutasi', jenisColor: G },
  { nik: '2304556', nama: 'Fajar Ramadhan', jabatan: '— → Operator Mill', unit: '— → Mill B', tgl: '05 Jul 2026', jenis: 'Rekrutmen Baru', jenisColor: G },
  { nik: '2109983', nama: 'Yusuf Maulana', jabatan: 'Mandor → Mandor I', unit: 'Estate D → Estate D', tgl: '10 Jul 2026', jenis: 'Promosi', jenisColor: OK },
  { nik: '2002314', nama: 'Siti Rahayu', jabatan: 'Staf HC → Staf HC', unit: 'Mill B → Estate B', tgl: '15 Jul 2026', jenis: 'Mutasi', jenisColor: G },
  { nik: '2207781', nama: 'Ahmad Fauzi', jabatan: 'Krani Kontrak → Krani Tetap', unit: 'Estate A → Estate A', tgl: '21 Jul 2026', jenis: 'Pengangkatan', jenisColor: G },
];

export const employeeHistory = {
  nik: '2210447',
  nama: 'Bayu Nugroho',
  role: 'Asisten Kepala, Estate D',
};

export const timeline = [
  { date: '01 Jul 2026', kind: 'Promosi', detail: 'Asisten Divisi → Asisten Kepala · Estate A → Estate D', color: OK },
  { date: '14 Mar 2025', kind: 'Mutasi', detail: 'Asisten Divisi · Estate B → Estate A', color: G },
  { date: '02 Jan 2024', kind: 'Pengangkatan', detail: 'Kontrak → Karyawan Tetap · Estate B', color: G },
  { date: '02 Jan 2023', kind: 'Perpanjangan Kontrak', detail: 'Kontrak tahun ke-2 · Estate B', color: MUT },
  { date: '02 Jan 2022', kind: 'Rekrutmen Baru', detail: 'Asisten Divisi (MT) · Estate B', color: G },
];

export const thresholds = [
  { name: 'TO Rate bulanan', value: '1,6% / 2,0%', color: GOLD, w: '80', note: '80% dari ambang — status waspada' },
  { name: 'Resign masa kerja <1 th', value: '22% / 15%', color: RED, w: '100', note: 'melewati ambang, perlu tindak lanjut' },
  { name: 'Unit di atas ambang', value: '3 / 5', color: GOLD, w: '60', note: 'Estate C, Estate A, Estate F' },
];

export const insightSets = {
  dash: [
    { mark: '▲', markColor: RED, lead: 'TO rate naik ', strong: '0.3pp', strongColor: RED, tail: ' vs bulan lalu, kontributor terbesar Estate C.' },
    { mark: '▼', markColor: OK, lead: 'Mutasi internal turun ', strong: '5%', strongColor: OK, tail: ' — indikasi retensi struktural membaik.' },
    { mark: '!', markColor: GOLD, lead: '', strong: '3 unit', strongColor: GOLD, tail: ' berturut-turut berada di atas ambang TO 2.0%.' },
    { mark: '▲', markColor: RED, lead: 'Resign YTD sudah mencapai ', strong: '612 orang', strongColor: RED, tail: ', 12% di atas periode sama tahun lalu.' },
  ],
  turnover: [
    { mark: '●', markColor: GOLD, lead: 'Alasan resign dominan ', strong: 'Gaji/Kompensasi (34%)', strongColor: '#B77A1E', tail: ', naik dari 29% kuartal lalu.' },
    { mark: '▲', markColor: RED, lead: 'Kelompok usia 25–34 th menyumbang ', strong: '48%', strongColor: RED, tail: ' dari seluruh resign murni.' },
    { mark: '!', markColor: GOLD, lead: 'Masa kerja <1 tahun berkontribusi ', strong: '22%', strongColor: '#B77A1E', tail: ' — indikasi masalah pada onboarding.' },
    { mark: '▲', markColor: RED, lead: 'Estate C tertinggi ', strong: '3 bulan berturut', strongColor: RED, tail: '-turut pada 2.8%.' },
    { mark: 'i', markColor: MUT, lead: '', strong: '96 exit', strongColor: '#3C4A43', tail: ' non-voluntary dikecualikan dari perhitungan TO Rate.' },
  ],
  movement: [
    { mark: '▲', markColor: OK, lead: 'Promosi naik ', strong: '18%', strongColor: OK, tail: ' dibanding kuartal lalu.' },
    { mark: '●', markColor: G, lead: 'Jalur mutasi terpadat ', strong: 'Estate A → Estate D', strongColor: G, tail: ' sebanyak 38 karyawan.' },
    { mark: '!', markColor: GOLD, lead: '', strong: '12 kontrak', strongColor: '#B77A1E', tail: ' akan berakhir dalam 30 hari ke depan.' },
    { mark: '▼', markColor: OK, lead: 'Demosi hanya ', strong: '6 kasus', strongColor: OK, tail: ' — terendah dalam 8 bulan.' },
  ],
};
