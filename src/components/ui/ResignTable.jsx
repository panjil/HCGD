import { thStyle, tdStyle } from './table';

export default function ResignTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', fontSize: 11.5, minWidth: 820 }}>
        <thead>
          <tr>
            <th style={thStyle('left')}>NIK</th>
            <th style={thStyle('left')}>NAMA</th>
            <th style={thStyle('left')}>JABATAN</th>
            <th style={thStyle('left')}>UNIT</th>
            <th style={thStyle('right')}>MASA KERJA</th>
            <th style={thStyle('right')}>UMUR</th>
            <th style={thStyle('left')}>PENDIDIKAN</th>
            <th style={thStyle('left', true)}>ALASAN KELUAR</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hc-table-row">
              <td style={tdStyle('left', { fontVariantNumeric: 'tabular-nums', color: '#6B7770' })}>{r.nik}</td>
              <td style={tdStyle('left', { fontWeight: 600 })}>{r.nama}</td>
              <td style={tdStyle('left', { color: '#3C4A43' })}>{r.jabatan}</td>
              <td style={tdStyle('left', { color: '#3C4A43' })}>{r.unit}</td>
              <td style={tdStyle('right', { fontVariantNumeric: 'tabular-nums' })}>{r.masa}</td>
              <td style={tdStyle('right', { fontVariantNumeric: 'tabular-nums' })}>{r.umur}</td>
              <td style={tdStyle('left', { color: '#3C4A43' })}>{r.edu}</td>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #F0F3F1' }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: r.alasanColor }}>{r.alasan}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
