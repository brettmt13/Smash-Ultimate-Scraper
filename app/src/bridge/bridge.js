import * as s from './scraper.js';

const ID = new s.WalkSpeed();
ID.getArray().then(r => {
    console.log(r);
})
