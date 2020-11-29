export function getTitle(): string {
    return process.argv[2] ?? null;
}

export function correctArgCount(argCount: number): boolean {
    return process.argv.length === argCount;
}

export function queryString(title: string): string {
    return title.replace(/ /g, `+`)
}