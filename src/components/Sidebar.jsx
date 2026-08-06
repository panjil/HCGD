const NAV_ITEMS = [
  {
    id: 'dash',
    label: 'Dashboard',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ position: 'relative' }}>
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'turnover',
    label: 'Turn Over',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ position: 'relative' }}>
        <path d="M3 17l5.5-6 4 4L21 6" />
        <path d="M21 11V6h-5" />
      </svg>
    ),
  },
  {
    id: 'movement',
    label: 'Manpower Movement',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ position: 'relative' }}>
        <path d="M4 8h13" />
        <path d="M14 5l3 3-3 3" />
        <path d="M20 16H7" />
        <path d="M10 13l-3 3 3 3" />
      </svg>
    ),
  },
];

export default function Sidebar({ screen, onNavigate }) {
  return (
    <aside
      style={{
        width: 238,
        flex: 'none',
        background: 'linear-gradient(178deg,#0B6E4F 0%,#08553D 55%,#06422F 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <div style={{ padding: '26px 22px 22px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div
          style={{
            width: 34,
            height: 34,
            flex: 'none',
            borderRadius: 9,
            background: '#E8A33D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 14,
            color: '#06422F',
            letterSpacing: -0.4,
          }}
        >
          BGA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: -0.2 }}>Human Capital</div>
          <div style={{ fontSize: 10.5, fontWeight: 400, color: 'rgba(255,255,255,.62)' }}>Manpower Analysis</div>
        </div>
      </div>

      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 3, marginTop: 6 }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, color: 'rgba(255,255,255,.42)', padding: '10px 10px 8px' }}>
          MODUL
        </div>

        {NAV_ITEMS.map((item) => {
          const active = screen === item.id;
          return (
            <button
              key={item.id}
              className="hc-nav-btn"
              onClick={() => onNavigate(item.id)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '11px 12px',
                border: 0,
                background: 'transparent',
                color: 'rgba(255,255,255,.78)',
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              {active && (
                <>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'rgba(255,255,255,.13)' }} />
                  <span style={{ position: 'absolute', left: 0, top: 9, bottom: 9, width: 3, borderRadius: '0 3px 3px 0', background: '#E8A33D' }} />
                </>
              )}
              {item.icon}
              <span style={{ position: 'relative' }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', padding: '18px 22px 22px', borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', lineHeight: 1.5 }}>
          Data per 31 Jul 2026
          <br />
          Sumber: EMP_Career
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 14 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            RA
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 500, color: 'rgba(255,255,255,.85)' }}>Rizky A. · HC Analyst</div>
        </div>
      </div>
    </aside>
  );
}
