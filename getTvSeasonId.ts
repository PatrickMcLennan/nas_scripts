import axios from 'axios'
import { config } from 'dotenv';
import path from 'path';
import { correctArgCount, getTitle, queryString } from './shared';


/**
 * Search for the ID of a specific season of a show.
 * 
 * @param {number} showId The ID of the TV series.
 * @param {number} seasonNumber The season number.
 * 
 * @see https://developers.themoviedb.org/3/tv-seasons/get-tv-season-details
 */

config({ path: path.resolve(__dirname, `../.env`) });

const [tvId, season, correctArgs] = [process.argv[2], process.argv[3], correctArgCount(4)];

if (!tvId || !season || !correctArgs) 
    throw new Error(
        `Only 2 arguments accepted -- the ID of the TV series and the season being queried.`
    );

axios
  .get(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${season}?api_key=${process.env.TMDB_API_KEY}`
  )
  .then(({ data }) => console.log(data))
  .catch(console.error);
