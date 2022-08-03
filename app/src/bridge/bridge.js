import * as s from './scraper.js';

const ID = new s.AirSpeed();
ID.getArray().then(r => {
    console.log(r);
});
