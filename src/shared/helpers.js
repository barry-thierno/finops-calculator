export const formatCurrency = money =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(money);

export const roundCurrency = price => Math.round(price * 100) / 100;
