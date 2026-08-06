import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import InsightAside from './components/InsightAside';
import Dashboard from './components/screens/Dashboard';
import TurnOver from './components/screens/TurnOver';
import Movement from './components/screens/Movement';
import ManpowerMapping from './components/screens/ManpowerMapping';
import {
  screens,
  insightSets,
  thresholds,
  buildTrend,
  buildSankey,
  buildHeatRows,
  heatCols,
  heatLegend,
  buildDimEdu,
  buildDonutAge,
  buildDonutTenure,
  buildKpis,
  toKpis,
  buildTopUnits,
  buildByLevel,
  exitMix,
  buildDimReason,
  buildDimBdp,
  resignRows,
  moveSummary,
  moveRows,
  employeeHistory,
  timeline,
  mappingSummary,
  mappingCols,
  buildMappingHeatRows,
  mappingLegend,
  mappingRows,
} from './data/sampleData';

export default function App() {
  const [screen, setScreen] = useState('dash');
  const [tab, setTab] = useState('analisis');

  // Sample data is static/illustrative (see data/sampleData.js); memoized
  // once so the derived SVG geometry (trend path, donut arcs, sankey flows)
  // isn't recomputed on every render.
  const data = useMemo(
    () => ({
      trend: buildTrend(),
      sankey: buildSankey(),
      heatRows: buildHeatRows(),
      dimEdu: buildDimEdu(),
      donutAge: buildDonutAge(),
      donutTenure: buildDonutTenure(),
      kpis: buildKpis(),
      topUnits: buildTopUnits(),
      byLevel: buildByLevel(),
      dimReason: buildDimReason(),
      dimBdp: buildDimBdp(),
      mappingHeatRows: buildMappingHeatRows(),
    }),
    []
  );

  const insights = insightSets[screen];
  const { title, sub } = screens[screen];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffffff' }}>
      <Sidebar screen={screen} onNavigate={setScreen} />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Header title={title} subtitle={sub} />

        <div
          className="hc-grid"
          style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 336px', gap: 0, alignItems: 'start' }}
        >
          <div style={{ padding: '26px 30px 46px', display: 'flex', flexDirection: 'column', gap: 34, minWidth: 0 }}>
            {screen === 'dash' && <Dashboard kpis={data.kpis} trend={data.trend} topUnits={data.topUnits} moveSummary={moveSummary} />}
            {screen === 'turnover' && (
              <TurnOver
                tab={tab}
                onTabChange={setTab}
                data={{
                  toKpis,
                  exitMix,
                  trend: data.trend,
                  byLevel: data.byLevel,
                  dimReason: data.dimReason,
                  donutAge: data.donutAge,
                  donutTenure: data.donutTenure,
                  dimEdu: data.dimEdu,
                  dimBdp: data.dimBdp,
                  topUnits: data.topUnits,
                  resignRows,
                  heatCols,
                  heatRows: data.heatRows,
                  heatLegend,
                }}
              />
            )}
            {screen === 'movement' && (
              <Movement
                moveSummary={moveSummary}
                sankey={data.sankey}
                moveRows={moveRows}
                employeeHistory={employeeHistory}
                timeline={timeline}
              />
            )}
            {screen === 'mapping' && (
              <ManpowerMapping
                mappingSummary={mappingSummary}
                mappingCols={mappingCols}
                mappingHeatRows={data.mappingHeatRows}
                mappingLegend={mappingLegend}
                mappingRows={mappingRows}
              />
            )}
          </div>

          <InsightAside insights={insights} thresholds={thresholds} />
        </div>
      </main>
    </div>
  );
}
