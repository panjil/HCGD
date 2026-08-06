export default function DonutChart({ data, centerValue, centerLabel }) {
  return (
    <svg viewBox="-118 -104 236 212" style={{ width: '100%', maxWidth: 270, height: 'auto', overflow: 'visible' }}>
      {data.map((s, i) => (
        <path key={i} d={s.d} fill={s.color} />
      ))}
      {data.map((d, i) => (
        <g key={'label' + i}>
          <text x={d.lx} y={d.ly} textAnchor={d.anchor} fontSize={10.5} fontWeight={600} fill="#3C4A43">
            {d.name}
          </text>
          <text x={d.lx} y={d.ly2} textAnchor={d.anchor} fontSize={10.5} fontWeight={700} fill={d.color}>
            {d.pct}
          </text>
        </g>
      ))}
      <text x="0" y="-4" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1B2420">
        {centerValue}
      </text>
      <text x="0" y="13" textAnchor="middle" fontSize="10" fill="#6B7770">
        {centerLabel}
      </text>
    </svg>
  );
}
