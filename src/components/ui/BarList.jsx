export default function BarList({
  items,
  labelWidth = 104,
  colGap = 14,
  rowGap = 11,
  innerGap = 9,
  barHeight = 17,
  labelFontSize = 12,
  labelFontWeight = 600,
  valueFontSize = 12,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: rowGap }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: `${labelWidth}px minmax(0,1fr)`,
            alignItems: 'center',
            gap: colGap,
          }}
        >
          <div style={{ fontSize: labelFontSize, fontWeight: labelFontWeight, color: '#3C4A43', textAlign: 'right' }}>
            {it.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: innerGap }}>
            <div style={{ height: barHeight, borderRadius: 2, background: it.color, width: `${it.w}%` }} />
            <div style={{ fontSize: valueFontSize, fontWeight: 700, color: it.color }}>{it.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
