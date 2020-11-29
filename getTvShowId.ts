import axios from 'axios'
import { config } from 'dotenv';
import path from 'path';
import { correctArgCount, getTitle, queryString } from './shared';

/**
 * Get a TV series ID.
 * 
 * @param {string} title The name of the TV Show.
 * 
 * @see https://developers.themoviedb.org/3/tv/get-tv-details
 */

config({ path: path.resolve(__dirname, `../.env`) });

const [title, correctArgs] = [getTitle(), correctArgCount(3)];

if (!title || !correctArgs) 
    throw new Error(
        `A movie title must be provided as the first and only argument`
    );

const query = queryString(title);
axios
  .get(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  )
    .then(({ data }) => {
        if (!data.results.length) {
            console.error(`Nothing was found with ${query}`);
            process.exit(1);
        };
        console.log(data)
  })
  .catch(console.error);
