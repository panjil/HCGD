export default function EduBarChart({ bars }) {
  return (
    <svg viewBox="0 0 340 170" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width="38" height={b.h} rx="2" fill={b.color} />
      ))}
      {bars.map((b, i) => (
        <g key={'label' + i}>
          <text x={b.cx} y={b.ty} textAnchor="middle" fontSize={11} fontWeight={700} fill={b.color}>
            {b.label}
          </text>
          <text x={b.cx} y={162} textAnchor="middle" fontSize={10} fill="#6B7770">
            {b.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
