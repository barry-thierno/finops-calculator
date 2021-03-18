export const formatCurrency = money =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(money);

export const roundCurrency = price => Math.round(price * 100) / 100;
