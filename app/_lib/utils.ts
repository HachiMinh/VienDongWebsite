export function createDarkenBackground(url: string, darkenRate: number = 0.7): string {
  return `linear-gradient(rgba(0, 0, 0, ${darkenRate}), rgba(0, 0, 0, ${darkenRate})), url(${url})`;
}
