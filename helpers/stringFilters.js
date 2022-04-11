const toRemoveUnderScore = (value) => {
  if (!value) return '';
  return value.replace(/_/g, ' ');
}

const toUpperCaseFirst = (value) => {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : '';
}

module.exports = {
  toUpperCaseFirst,
  toRemoveUnderScore,
}