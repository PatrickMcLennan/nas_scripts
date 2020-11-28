import axios from 'axios'
import { config } from 'dotenv';
import path from 'path';


config({ path: path.resolve(__dirname, `../.env`) });

const title = process.argv[2] ?? null;
const wrongArgCount = process.argv.length !== 3;

if (!title || wrongArgCount) throw new Error(`A movie title must be provided as the first and only argument`);

const query = title.replace(/ /g, `+`);

axios
  .get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  )
    .then(({ data }) => {
        if (!data.results.length) {
            console.error(`Nothing was found with ${query}`);
            process.exit(1);
        };
        console.log(data)
  })
  .catch(console.error);
