export const thStyle = (align = 'left', last = false) => ({
  textAlign: align,
  padding: last ? '0 0 9px 0' : '0 12px 9px 0',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 0.6,
  color: '#95A099',
  borderBottom: '1px solid #DDE3E0',
});

export const tdStyle = (align = 'left', extra = {}) => ({
  textAlign: align,
  padding: '10px 12px 10px 0',
  borderBottom: '1px solid #F0F3F1',
  ...extra,
});
