import { G, GOLD, RED, OK, BLUE } from '../../utils/colors';

const TIER_COLOR = { A: RED, B: GOLD, C: OK };

const ROLE_STYLE = {
  Manager: { bg: 'rgba(44,82,130,.08)', bar: BLUE, text: BLUE },
  Askep: { bg: 'rgba(11,110,79,.07)', bar: G, text: G },
  Kasie: { bg: 'rgba(232,163,61,.13)', bar: GOLD, text: '#B77A1E' },
};
const DEFAULT_ROLE_STYLE = { bg: 'transparent', bar: 'transparent', text: '#1B2420' };

const STATUS_COLOR = { gold: '#B77A1E', green: G };

const ACTIVITY_STYLE = {
  DEF: { bg: 'rgba(44,82,130,.12)', color: BLUE },
  ACT: { bg: 'rgba(11,110,79,.12)', color: G },
};

function EduIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: 'none' }}>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  );
}

export default function MappingUnitCard({ unit }) {
  return (
    <div style={{ border: '1px solid #E7EBE9', borderRadius: 11, overflow: 'hidden', background: '#fff' }}>
      <div
        style={{
          background: 'linear-gradient(135deg,#0B6E4F 0%,#08553D 100%)',
          color: '#fff',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: -0.1 }}>
            {unit.code} <span style={{ fontWeight: 500, opacity: 0.75 }}>({unit.area})</span>
          </div>
          <div style={{ fontSize: 10.5, opacity: 0.78, marginTop: 2 }}>
            {unit.code}. {unit.name} ({unit.entity})
          </div>
        </div>
        <div
          style={{
            flex: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(255,255,255,.14)',
            borderRadius: 20,
            padding: '3px 9px 3px 3px',
            fontSize: 10.5,
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: TIER_COLOR[unit.tier],
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9.5,
            }}
          >
            {unit.tier}
          </span>
          {unit.estateModel && <span style={{ color: GOLD }}>★</span>}
          <span>{unit.tierLabel}</span>
          {unit.estateModel && <span style={{ opacity: 0.75, fontWeight: 500 }}>· Estate Model</span>}
        </div>
      </div>

      <table style={{ width: '100%', fontSize: 11 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '9px 8px', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, color: '#95A099', borderBottom: '1px solid #DDE3E0' }}>JABATAN</th>
            <th style={{ textAlign: 'left', padding: '9px 8px', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, color: '#95A099', borderBottom: '1px solid #DDE3E0' }}>NAMA</th>
            <th style={{ textAlign: 'left', padding: '9px 8px', fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, color: '#95A099', borderBottom: '1px solid #DDE3E0' }}>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {unit.positions.map((p) => {
            const role = ROLE_STYLE[p.jabatan] || DEFAULT_ROLE_STYLE;
            const activity = ACTIVITY_STYLE[p.activity];
            return (
              <tr key={p.nik} style={{ background: role.bg }}>
                <td style={{ padding: '9px 8px', borderLeft: `3px solid ${role.bar}`, borderBottom: '1px solid #F0F3F1' }}>
                  <div style={{ fontWeight: 700, color: role.text }}>{p.jabatan}</div>
                  {p.ha && <div style={{ fontSize: 9.5, color: '#95A099', marginTop: 1 }}>{p.ha}</div>}
                </td>
                <td style={{ padding: '9px 8px', borderBottom: '1px solid #F0F3F1' }}>
                  <div style={{ fontWeight: 600 }}>
                    {p.nama} <span style={{ fontWeight: 400, color: '#95A099' }}>({p.nik})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, borderRadius: 4, padding: '1px 5px', background: activity.bg, color: activity.color }}>
                      {p.activity}
                    </span>
                    <span style={{ fontSize: 9.5, color: '#95A099' }}>{p.tenure}</span>
                  </div>
                </td>
                <td style={{ padding: '9px 8px', borderBottom: '1px solid #F0F3F1' }}>
                  <div style={{ fontWeight: 700, color: STATUS_COLOR[p.statusTier] }}>{p.status}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3, fontSize: 9.5, color: '#6B7770' }}>
                    <EduIcon />
                    {p.edu}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
