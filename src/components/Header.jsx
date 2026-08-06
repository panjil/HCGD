export default function Header({ title, subtitle }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(255,255,255,.94)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E7EBE9',
        padding: '16px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 'auto' }}>
        <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: -0.4 }}>{title}</h1>
        <div style={{ fontSize: 11.5, color: '#6B7770' }}>{subtitle}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: '#6B7770', fontWeight: 500 }}>Periode</span>
        <select className="hc-select" style={{ fontWeight: 600 }}>
          <option>Jul 2026</option>
          <option>Jun 2026</option>
          <option>Q2 2026</option>
          <option>YTD 2026</option>
        </select>
        <select className="hc-select" style={{ fontWeight: 500 }}>
          <option>Semua Regional</option>
          <option>Regional Kalbar</option>
          <option>Regional Kalteng</option>
          <option>Regional Riau</option>
        </select>
        <select className="hc-select" style={{ fontWeight: 500 }}>
          <option>Semua Unit</option>
          <option>Estate A</option>
          <option>Estate C</option>
          <option>Mill B</option>
        </select>
        <button
          className="hc-export-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            border: 0,
            background: '#0B6E4F',
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            padding: '8px 14px',
            borderRadius: 7,
            cursor: 'pointer',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12" />
            <path d="M7 11l5 5 5-5" />
            <path d="M4 20h16" />
          </svg>
          Ekspor .xlsx
        </button>
      </div>
    </header>
  );
}
