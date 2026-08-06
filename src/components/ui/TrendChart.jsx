export default function TrendChart({ trend }) {
  return (
    <svg viewBox="0 0 760 210" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      <path d={trend.area} fill="#0B6E4F" fillOpacity="0.07" />
      <path d={trend.line} fill="none" stroke="#0B6E4F" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {trend.pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.fill} />
      ))}
      {trend.pts.map((p, i) => (
        <g key={'labels' + i}>
          {p.label && (
            <text x={p.x} y={p.ly} textAnchor="middle" fontSize={p.lsize} fontWeight={p.lweight} fill={p.lfill}>
              {p.label}
            </text>
          )}
          <text x={p.x} y={200} textAnchor="middle" fontSize={10} fill="#95A099">
            {p.month}
          </text>
        </g>
      ))}
    </svg>
  );
}
