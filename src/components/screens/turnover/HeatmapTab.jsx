import HeatmapGrid from '../../ui/HeatmapGrid';
import SectionHeader from '../../ui/SectionHeader';

export default function HeatmapTab({ heatCols, heatRows, heatLegend }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionHeader title="Heatmap TO Rate — Lama Kerja × Unit" note="Nilai dalam % · warna sel sudah membawa informasi, tanpa gridline" />
      <HeatmapGrid cols={heatCols} rows={heatRows} legend={heatLegend} />
    </section>
  );
}
