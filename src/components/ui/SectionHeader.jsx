export default function SectionHeader({ title, note, gap = 16 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap }}>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: -0.25 }}>{title}</h2>
      <div style={{ fontSize: 11, color: '#6B7770' }}>{note}</div>
    </div>
  );
}
