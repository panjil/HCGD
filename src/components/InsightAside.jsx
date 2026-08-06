export default function InsightAside({ insights, thresholds }) {
  return (
    <aside className="hc-aside" style={{ position: 'sticky', top: 73, padding: '26px 30px 40px 6px', alignSelf: 'start' }}>
      <div style={{ background: '#FDF8EF', borderRadius: 12, padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B77A1E" strokeWidth="1.8">
            <path d="M9 18h6" />
            <path d="M10 21h4" />
            <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .9 1.6h5.2c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3z" />
          </svg>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#8A5B12', letterSpacing: 0.1 }}>Auto Insight</div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 9.5,
              fontWeight: 600,
              color: '#B08A4E',
              background: 'rgba(232,163,61,.18)',
              padding: '3px 7px',
              borderRadius: 20,
            }}
          >
            RULE-BASED
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: '#A17F45', lineHeight: 1.5, marginTop: -6 }}>
          Dirangkum otomatis dari filter aktif · klik poin untuk drill-down
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {insights.map((i, idx) => (
            <button
              key={idx}
              className="hc-insight-btn"
              style={{
                display: 'grid',
                gridTemplateColumns: '16px minmax(0,1fr)',
                gap: 9,
                alignItems: 'start',
                border: 0,
                background: 'transparent',
                textAlign: 'left',
                padding: '10px 8px',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: i.markColor, lineHeight: 1.5 }}>{i.mark}</span>
              <span style={{ fontSize: 12, lineHeight: 1.55, color: '#4A3D26' }}>
                {i.lead}
                <b style={{ fontWeight: 800, color: i.strongColor }}>{i.strong}</b>
                {i.tail}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: '#95A099' }}>AMBANG BATAS AKTIF</div>
        {thresholds.map((t, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <div style={{ fontSize: 11.5, color: '#3C4A43' }}>{t.name}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: t.color }}>{t.value}</div>
            </div>
            <div style={{ height: 5, borderRadius: 3, background: '#EFF2F0', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, background: t.color, width: `${t.w}%` }} />
            </div>
            <div style={{ fontSize: 10, color: '#95A099' }}>{t.note}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
