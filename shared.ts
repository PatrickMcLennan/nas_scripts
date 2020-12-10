import fs, { Stats } from 'fs';

export function getTitle(): string {
    return process.argv[2] ?? null;
}

export function correctArgCount(argCount: number): boolean {
    return process.argv.length === argCount;
}

export function queryString(title: string): string {
    return title.replace(/ /g, `+`)
}

export function logError(error: string | Error): void {
    console.error(error);
    return process.exit(1);
}

export function getDirectoryContents(path: string): Promise<string[]> {
    return new Promise((res, rej) => 
        fs.readdir(path, (err, files) => err
            ? rej(err)
            : res(files)
        )
    )
}

export function getFileStats(path: string): Promise<Stats> {
    return new Promise((res, rej) => 
        fs.stat(path, (err, stats) => err
            ? rej(err)
            : res(stats)
        )
    )
}

export function getId(file: string): string {
    return file.split(`[`)[1].split(`]`)[0];
}