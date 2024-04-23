export function createDarkenBackground(url: string): string {
    return `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${url})`;
}
