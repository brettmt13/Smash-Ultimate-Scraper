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

const pullInitialDashData = async () => {
    const rawData = await pullData(URL);
    const $ = cheerio.load(rawData);
    const initialDashData = $('#AutoNumber1 tbody tr');
    // console.log(initialDashData.text());

}

pullInitialDashData();