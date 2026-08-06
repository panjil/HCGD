import KpiCard from '../ui/KpiCard';
import TrendChart from '../ui/TrendChart';
import BarList from '../ui/BarList';
import MoveSummaryGrid from '../ui/MoveSummaryGrid';
import SectionHeader from '../ui/SectionHeader';

export default function Dashboard({ kpis, trend, topUnits, moveSummary }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <div className="hc-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 14 }}>
        {kpis.map((k, i) => (
          <KpiCard key={i} k={k} size="lg" />
        ))}
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="Tren TO Rate 12 Bulan Terakhir" note="Resign murni ÷ rata-rata karyawan aktif · dalam %" />
        <TrendChart trend={trend} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="Top 5 Unit dengan TO Tertinggi" note="Ambang perhatian 2.0% · unit tertinggi disorot" />
        <BarList items={topUnits} labelWidth={104} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: -0.25 }}>Komposisi Pergerakan Bulan Ini</h2>
        <MoveSummaryGrid items={moveSummary} />
      </section>
    </div>
  );
}
