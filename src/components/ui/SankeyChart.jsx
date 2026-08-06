export default function SankeyChart({ sankey }) {
  return (
    <svg viewBox="0 0 760 290" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      {sankey.flows.map((f, i) => (
        <path key={i} d={f.d} fill={f.color} fillOpacity={f.op} />
      ))}
      {sankey.nodes.map((n, i) => (
        <rect key={i} x={n.x} y={n.y} width="11" height={n.h} rx="1.5" fill={n.color} />
      ))}
      {sankey.nodes.map((n, i) => (
        <g key={'label' + i}>
          <text x={n.tx} y={n.ty} textAnchor={n.anchor} fontSize={11.5} fontWeight={600} fill="#3C4A43">
            {n.name}
          </text>
          <text x={n.tx} y={n.ty2} textAnchor={n.anchor} fontSize={10.5} fontWeight={700} fill={n.color}>
            {n.value}
          </text>
        </g>
      ))}
      <text x="122" y="14" textAnchor="end" fontSize="10" fontWeight="700" fill="#95A099">
        UNIT ASAL
      </text>
      <text x="640" y="14" textAnchor="start" fontSize="10" fontWeight="700" fill="#95A099">
        UNIT TUJUAN
      </text>
    </svg>
  );
}
