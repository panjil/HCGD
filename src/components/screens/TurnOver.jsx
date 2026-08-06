import TabBar from './turnover/TabBar';
import RingkasanTab from './turnover/RingkasanTab';
import TrenTab from './turnover/TrenTab';
import AnalisisTab from './turnover/AnalisisTab';
import HeatmapTab from './turnover/HeatmapTab';

export default function TurnOver({ tab, onTabChange, data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <TabBar active={tab} onChange={onTabChange} />

      <div style={{ borderLeft: '2px solid #E8A33D', padding: '2px 0 2px 14px' }}>
        <div style={{ fontSize: 12, lineHeight: 1.6, color: '#3C4A43' }}>
          <b style={{ fontWeight: 700 }}>Definisi TO Rate:</b> hanya <b style={{ fontWeight: 700 }}>RESIGN MURNI</b> (voluntary). PHK/Terminate, Meninggal Dunia, dan Migrasi antar entitas tercatat di tabel Attrition namun{' '}
          <b style={{ fontWeight: 700 }}>tidak dihitung</b> dalam TO Rate.
        </div>
      </div>

      {tab === 'ringkas' && <RingkasanTab toKpis={data.toKpis} exitMix={data.exitMix} />}
      {tab === 'tren' && <TrenTab trend={data.trend} byLevel={data.byLevel} />}
      {tab === 'analisis' && (
        <AnalisisTab
          dimReason={data.dimReason}
          donutAge={data.donutAge}
          donutTenure={data.donutTenure}
          dimEdu={data.dimEdu}
          dimBdp={data.dimBdp}
          topUnits={data.topUnits}
          resignRows={data.resignRows}
        />
      )}
      {tab === 'heatmap' && <HeatmapTab heatCols={data.heatCols} heatRows={data.heatRows} heatLegend={data.heatLegend} />}
    </div>
  );
}
