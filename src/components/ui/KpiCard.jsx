export default function KpiCard({ k, size = 'lg' }) {
  const valueSize = size === 'lg' ? 27 : 26;
  const valueLetterSpacing = size === 'lg' ? -1 : -0.9;

  return (
    <div
      className={size === 'lg' ? 'hc-kpi-card' : undefined}
      style={{
        border: '1px solid #E7EBE9',
        borderRadius: 11,
        padding: size === 'lg' ? '16px 16px 13px' : 16,
        display: 'flex',
        flexDirection: 'column',
        gap: size === 'lg' ? 10 : 9,
        background: '#fff',
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7770', letterSpacing: 0.1 }}>{k.label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontSize: valueSize, fontWeight: 800, letterSpacing: valueLetterSpacing, lineHeight: 1 }}>{k.value}</div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: k.deltaColor }}>{k.delta}</div>
      </div>
      {size === 'lg' ? (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ fontSize: 10.5, color: '#95A099' }}>{k.note}</div>
          <svg width="76" height="22" viewBox="0 0 76 22" fill="none" style={{ flex: 'none' }}>
            <polyline points={k.spark} fill="none" stroke={k.deltaColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : (
        <div style={{ fontSize: 10.5, color: '#95A099' }}>{k.note}</div>
      )}
    </div>
  );
}
