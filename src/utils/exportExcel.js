import * as XLSX from 'xlsx';

// We only build workbooks from trusted in-app data and call writeFile — the
// known SheetJS advisories (prototype pollution, ReDoS) live in the file
// *parsing* path, which this app never exercises.
function downloadWorkbook(sheets, filename) {
  const wb = XLSX.utils.book_new();
  sheets.forEach(({ name, rows }) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, name.slice(0, 31));
  });
  XLSX.writeFile(wb, filename);
}

export function exportDashboard(kpis, moveSummary) {
  downloadWorkbook(
    [
      {
        name: 'KPI Dashboard',
        rows: kpis.map(({ label, value, delta, note }) => ({
          Indikator: label,
          Nilai: value,
          Perubahan: delta,
          Keterangan: note,
        })),
      },
      {
        name: 'Ringkasan Movement',
        rows: moveSummary.map(({ label, note, value }) => ({
          Kategori: label,
          Keterangan: note,
          Jumlah: value,
        })),
      },
    ],
    'HC-Dashboard.xlsx'
  );
}

export function exportResign(resignRows) {
  downloadWorkbook(
    [
      {
        name: 'Resign',
        rows: resignRows.map(({ nik, nama, jabatan, unit, masa, umur, edu, alasan }) => ({
          NIK: nik,
          Nama: nama,
          Jabatan: jabatan,
          Unit: unit,
          'Masa Kerja': masa,
          Umur: umur,
          Pendidikan: edu,
          'Alasan Keluar': alasan,
        })),
      },
    ],
    'HC-TurnOver-Resign.xlsx'
  );
}

export function exportMovement(moveRows) {
  downloadWorkbook(
    [
      {
        name: 'Movement',
        rows: moveRows.map(({ nik, nama, jabatan, unit, tgl, jenis }) => ({
          NIK: nik,
          Nama: nama,
          'Jabatan Lama → Baru': jabatan,
          'Unit Lama → Baru': unit,
          'Tanggal Efektif': tgl,
          Jenis: jenis,
        })),
      },
    ],
    'HC-Movement.xlsx'
  );
}
