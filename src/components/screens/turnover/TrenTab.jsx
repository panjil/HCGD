import TrendChart from '../../ui/TrendChart';
import BarList from '../../ui/BarList';
import SectionHeader from '../../ui/SectionHeader';

export default function TrenTab({ trend, byLevel }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="TO Rate per Bulan" note="Puncak dan titik terakhir diberi label" />
        <TrendChart trend={trend} />
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: -0.25 }}>Breakdown per Level Jabatan</h2>
        <BarList items={byLevel} labelWidth={150} />
      </section>
    </div>
  );
}
