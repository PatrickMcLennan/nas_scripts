import fs from 'fs';
import path from 'path';
import {config} from 'dotenv';
import { correctArgCount, getDirectoryContents, getFileStats, getId, logError } from './shared';

config();

 /**
 * Rename the TV episodes within a Season directory.
 */

const [showId, seasonId] = [process.argv[2], process.argv[3]];
const { TV_DIR, TMDB_API_KEY } = process.env;

if (!showId || !seasonId || !correctArgCount(4))
    logError(`\nThis accepts needs 2 arguments -- a TV Series ID and its Season ID\n`)

async function main() {
    const allShows = await getDirectoryContents(TV_DIR ?? `NULL`);
    const show = allShows.find(show => getId(show) === showId);

    if (!show)
        return logError(`\nNothing was found with ${showId}\n`);
    
    const showStats = await getFileStats(path.join(TV_DIR ?? `NULL`, show));

    if (!showStats.isDirectory())
        return logError(`\n${show} is not a Directory\n`);

    const showDir = path.join(TV_DIR ?? `NULL`, show);
    const allSeasons = await getDirectoryContents(showDir);
    const season = allSeasons.find(season => getId(season) === seasonId);
    
    if (!season)
        return logError(`\n${seasonId} was not found in ${showDir}\n`);
    
    const seasonStats = await getFileStats(season);

    if (!seasonStats.isDirectory())
        return logError(`${season} is not a directory`);
    
    const seasonDir = path.join(showDir, season);
    
    const episodes = await getDirectoryContents(seasonDir);

    console.log(episodes);

    /**
     * TODO:  
     *  - Loop through each episode
     *  - Trim Names
     *  - Call TMDB, get ID
     *  - Match TMDB array response with each episodes index
     *  - If correct, rename the file with the ID
     */
}

main();