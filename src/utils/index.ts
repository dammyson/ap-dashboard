export function convertToUrlString(val: string) {
  return val?.replace(' ', '-').toLowerCase().replace("'", '');
}

export function formatNumber(value: number) {
  return value?.toLocaleString(undefined);
}

export function formatToDollar(value: number) {
  return value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
