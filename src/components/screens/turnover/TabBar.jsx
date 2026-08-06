const TABS = [
  ['ringkas', 'Ringkasan TO'],
  ['tren', 'Tren Waktu'],
  ['analisis', 'Analisis Resign'],
  ['heatmap', 'Heatmap Unit'],
];

export default function TabBar({ active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #E7EBE9' }}>
      {TABS.map(([id, name]) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            className="hc-tab-btn"
            onClick={() => onChange(id)}
            style={{
              position: 'relative',
              border: 0,
              background: 'transparent',
              padding: '0 0 11px',
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#1B2420' : '#6B7770',
              cursor: 'pointer',
            }}
          >
            {name}
            {isActive && (
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: '#0B6E4F' }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
