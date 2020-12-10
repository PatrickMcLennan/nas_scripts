import path from 'path';
import fs from 'fs';
import { correctArgCount, getTitle } from './shared';

/**
 * Call this from the directory of a TV Season to format each episodes name
 * into S0$E$$, etc.
 * 
 */

const [directory, correctArgs] = [getTitle(), correctArgCount(3)];

if (!directory || !correctArgs) {
    console.error(`\nOnly 1 argument is accepted, the directory to be reformatted.\n`);
    process.exit(1);
}

fs.readdir(path.resolve(directory), (err, files) => {
    if (err) throw new Error(`Problem reading the directory: ${err.toString()}`);

    console.log(files);
})