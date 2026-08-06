import MoveSummaryGrid from '../ui/MoveSummaryGrid';
import SankeyChart from '../ui/SankeyChart';
import MoveTable from '../ui/MoveTable';
import Timeline from '../ui/Timeline';
import SectionHeader from '../ui/SectionHeader';

export default function Movement({ moveSummary, sankey, moveRows, employeeHistory, timeline }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: -0.25 }}>Ringkasan Movement — Jul 2026</h2>
        <MoveSummaryGrid items={moveSummary} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="Flow Diagram — Mutasi Antar Unit" note="214 perpindahan · tebal pita = jumlah karyawan" />
        <SankeyChart sankey={sankey} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SectionHeader title="Tabel Pergerakan Karyawan" note="821 baris · menampilkan 6" />
        <MoveTable rows={moveRows} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: -0.25 }}>Riwayat Karyawan</h2>
          <input
            placeholder="Cari NIK atau nama…"
            style={{ border: '1px solid #DDE3E0', borderRadius: 7, padding: '7px 12px', fontSize: 12, width: 220, fontFamily: 'inherit' }}
          />
        </div>
        <Timeline employee={employeeHistory} entries={timeline} />
      </section>
    </div>
  );
}
