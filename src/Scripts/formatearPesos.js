function formatCompact(value) {
  if (value <= 999999) {
    const result = new Intl.NumberFormat(
      'es-CO',
      {  currency: 'COP',
      style: 'currency',
      minimumFractionDigits: 0}
    ).format(value)
    return result;
  }else if (value >= 1000000) {
    const result = new Intl.NumberFormat(
      'es-CO',
      {  currency: 'COP',
      style: 'currency',
      minimumFractionDigits: 0}
    ).format(value).replace('.', "'")
    return result;
  }

  }

export default formatCompact;