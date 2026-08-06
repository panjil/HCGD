import { useMemo, useState } from 'react';
import MappingUnitCard from '../ui/MappingUnitCard';
import SectionHeader from '../ui/SectionHeader';

function ToggleButton({ active, onClick, children }) {
  return (
    <button
      className="hc-tab-btn"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        border: '1px solid ' + (active ? '#0B6E4F' : '#DDE3E0'),
        background: active ? 'rgba(11,110,79,.08)' : '#fff',
        color: active ? '#0B6E4F' : '#6B7770',
        fontSize: 11.5,
        fontWeight: 600,
        padding: '6px 12px',
        borderRadius: 20,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function ManpowerMapping({ units, legend }) {
  const [focusOnly, setFocusOnly] = useState(false);
  const [modelOnly, setModelOnly] = useState(false);

  const filtered = useMemo(
    () =>
      units.filter((u) => (!focusOnly || u.tier !== 'C') && (!modelOnly || u.estateModel)),
    [units, focusOnly, modelOnly]
  );

  const totalEmployees = units.reduce((sum, u) => sum + u.positions.length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader title="Struktur Organisasi per Unit" note={`${units.length} unit · ${totalEmployees} posisi ditampilkan`} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
          padding: '12px 16px',
          border: '1px solid #E7EBE9',
          borderRadius: 10,
          background: '#fff',
        }}
      >
        <ToggleButton active={focusOnly} onClick={() => setFocusOnly((v) => !v)}>
          Fulfilment Focus
        </ToggleButton>
        <ToggleButton active={modelOnly} onClick={() => setModelOnly((v) => !v)}>
          ★ Estate Model
        </ToggleButton>

        <div style={{ width: 1, alignSelf: 'stretch', background: '#E7EBE9' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: '#95A099', letterSpacing: 0.4 }}>UNIT VALUE</span>
          {legend.map((l) => (
            <div key={l.tier} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#3C4A43' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: l.color, display: 'inline-block' }} />
              {l.tier} · {l.label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 18 }}>
        {filtered.map((u) => (
          <MappingUnitCard key={u.code} unit={u} />
        ))}
        {filtered.length === 0 && (
          <div style={{ fontSize: 12, color: '#95A099', padding: '20px 4px' }}>Tidak ada unit yang cocok dengan filter aktif.</div>
        )}
      </div>
    </div>
  );
}
