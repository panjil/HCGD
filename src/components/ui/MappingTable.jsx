import { thStyle, tdStyle } from './table';

export default function MappingTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', fontSize: 11.5, minWidth: 720 }}>
        <thead>
          <tr>
            <th style={thStyle('left')}>UNIT</th>
            <th style={thStyle('right')}>FORMASI</th>
            <th style={thStyle('right')}>REALISASI</th>
            <th style={thStyle('right')}>OKUPANSI</th>
            <th style={thStyle('right')}>GAP</th>
            <th style={thStyle('left', true)}>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hc-table-row">
              <td style={tdStyle('left', { fontWeight: 600 })}>{r.unit}</td>
              <td style={tdStyle('right', { fontVariantNumeric: 'tabular-nums', color: '#3C4A43' })}>{r.formasi.toLocaleString('id-ID')}</td>
              <td style={tdStyle('right', { fontVariantNumeric: 'tabular-nums', color: '#3C4A43' })}>{r.realisasi.toLocaleString('id-ID')}</td>
              <td style={tdStyle('right', { fontVariantNumeric: 'tabular-nums', color: '#3C4A43' })}>{r.okupansi}</td>
              <td style={tdStyle('right', { fontVariantNumeric: 'tabular-nums', fontWeight: 700, color: r.gapColor })}>{r.gapLabel}</td>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #F0F3F1' }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: r.statusColor }}>{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
