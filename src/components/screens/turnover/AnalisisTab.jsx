import BarList from '../../ui/BarList';
import DonutChart from '../../ui/DonutChart';
import EduBarChart from '../../ui/EduBarChart';
import ResignTable from '../../ui/ResignTable';
import SectionHeader from '../../ui/SectionHeader';

const dimLabelStyle = { fontSize: 12, fontWeight: 700, color: '#3C4A43' };

export default function AnalisisTab({ dimReason, donutAge, donutTenure, dimEdu, dimBdp, topUnits, resignRows }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <SectionHeader title="Breakdown Resign per Dimensi" note="6 dimensi klasifikasi · klik kategori untuk cross-filter" />

        <div className="hc-dims" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '30px 34px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={dimLabelStyle}>Alasan Resign</div>
            <BarList items={dimReason} labelWidth={96} colGap={10} rowGap={8} innerGap={8} barHeight={13} labelFontSize={11} labelFontWeight={400} valueFontSize={11} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={dimLabelStyle}>Kelompok Umur</div>
            <DonutChart data={donutAge} centerValue="48%" centerLabel="usia 25–34" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={dimLabelStyle}>Lama Kerja</div>
            <DonutChart data={donutTenure} centerValue="53%" centerLabel="di bawah 3 tahun" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={dimLabelStyle}>Jenjang Pendidikan</div>
            <EduBarChart bars={dimEdu} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={dimLabelStyle}>Status BDP</div>
            <BarList items={dimBdp} labelWidth={96} colGap={10} rowGap={8} innerGap={8} barHeight={13} labelFontSize={11} labelFontWeight={400} valueFontSize={11} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={dimLabelStyle}>Organization — TO Rate per Unit/Estate</div>
            <BarList items={topUnits} labelWidth={96} colGap={10} rowGap={8} innerGap={8} barHeight={13} labelFontSize={11} labelFontWeight={400} valueFontSize={11} />
          </div>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SectionHeader title="Tabel Detail Karyawan Resign Murni" note="612 baris · menampilkan 6" />
        <ResignTable rows={resignRows} />
      </section>
    </div>
  );
}
