export function convertToUrlString(val: string) {
  return val?.replace(' ', '-').toLowerCase().replace("'", '');
}
