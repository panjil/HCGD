import KpiCard from '../../ui/KpiCard';
import SectionHeader from '../../ui/SectionHeader';

export default function RingkasanTab({ toKpis, exitMix }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div className="hc-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 14 }}>
        {toKpis.map((k, i) => (
          <KpiCard key={i} k={k} size="sm" />
        ))}
      </div>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: -0.25 }}>Resign Murni vs Keluar Non-Voluntary</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {exitMix.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: e.nameColor, textAlign: 'right' }}>{e.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ height: 16, borderRadius: 2, background: e.color, width: `${e.w}%` }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: '#3C4A43' }}>{e.value}</div>
                <div style={{ fontSize: 10.5, color: '#95A099' }}>{e.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
