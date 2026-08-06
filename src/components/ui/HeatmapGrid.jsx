export default function HeatmapGrid({ cols, rows, legend }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '112px repeat(5,minmax(0,1fr))', gap: 4, maxWidth: 760 }}>
        <div />
        {cols.map((c, i) => (
          <div key={i} style={{ fontSize: 10.5, fontWeight: 600, color: '#6B7770', textAlign: 'center', paddingBottom: 3 }}>
            {c}
          </div>
        ))}
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'contents' }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: '#3C4A43',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {row.name}
            </div>
            {row.cells.map((cell, j) => (
              <div
                key={j}
                style={{
                  height: 44,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  background: cell.bg,
                  color: cell.fg,
                }}
              >
                {cell.v}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
        <span style={{ fontSize: 10.5, color: '#95A099' }}>Rendah</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {legend.map((l, i) => (
            <div key={i} style={{ width: 30, height: 9, borderRadius: 2, background: l }} />
          ))}
        </div>
        <span style={{ fontSize: 10.5, color: '#95A099' }}>Tinggi</span>
      </div>
    </>
  );
}
