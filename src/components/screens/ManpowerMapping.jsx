import MoveSummaryGrid from '../ui/MoveSummaryGrid';
import HeatmapGrid from '../ui/HeatmapGrid';
import MappingTable from '../ui/MappingTable';
import SectionHeader from '../ui/SectionHeader';

export default function ManpowerMapping({ mappingSummary, mappingCols, mappingHeatRows, mappingLegend, mappingRows }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: -0.25 }}>Ringkasan Mapping — Jul 2026</h2>
        <MoveSummaryGrid items={mappingSummary} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="Okupansi — Unit x Jenjang Jabatan" note="realisasi terhadap formasi per sel" />
        <HeatmapGrid cols={mappingCols} rows={mappingHeatRows} legend={mappingLegend} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SectionHeader title="Tabel Formasi vs Realisasi per Unit" note="6 unit contoh" />
        <MappingTable rows={mappingRows} />
      </section>
    </div>
  );
}
