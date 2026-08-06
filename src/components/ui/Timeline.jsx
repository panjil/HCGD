export default function Timeline({ employee, entries }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>
        {employee.nik} · {employee.nama}{' '}
        <span style={{ fontWeight: 500, color: '#6B7770' }}>— {employee.role}</span>
      </div>
      {entries.map((t, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '88px 18px minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
          <div style={{ fontSize: 11, color: '#95A099', textAlign: 'right', paddingTop: 2, fontVariantNumeric: 'tabular-nums' }}>
            {t.date}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: t.color, marginTop: 5, flex: 'none' }} />
            <div style={{ width: 1.5, flex: 1, background: '#E7EBE9', minHeight: 26 }} />
          </div>
          <div style={{ paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.color }}>{t.kind}</div>
            <div style={{ fontSize: 11.5, color: '#3C4A43' }}>{t.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
