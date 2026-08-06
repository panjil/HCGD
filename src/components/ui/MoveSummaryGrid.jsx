export default function MoveSummaryGrid({ items }) {
  return (
    <div className="hc-move" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12 }}>
      {items.map((m, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #E7EBE9',
            borderRadius: 10,
            padding: '13px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#3C4A43' }}>{m.label}</div>
            <div style={{ fontSize: 10.5, color: '#95A099' }}>{m.note}</div>
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: -0.6, color: m.color }}>{m.value}</div>
        </div>
      ))}
    </div>
  );
}
