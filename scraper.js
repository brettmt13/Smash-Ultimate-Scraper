'use strict';

import fetch from "node-fetch";
import * as cheerio from 'cheerio';

// pull the data
const pullData = (URL) => {
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            return data;
        })
}

// URL for data
const URL = "https://kuroganehammer.com/Ultimate/DashSpeed";

let initialDashes = [];

const pullInitialDashData = async () => {
    const rawData = await pullData(URL);
    const $ = cheerio.load(rawData);
    $('#AutoNumber1 tbody tr').each(function (i, elm) {
        initialDashes.push($(this).text().trim());
    });

    let string = initialDashes[0].replace(/\s/g, ' ');
    string = string.replace(/  +/g, ' ');

   
}


pullInitialDashData();