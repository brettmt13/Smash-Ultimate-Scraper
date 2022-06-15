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

const getInitialDash = (name, value) => {
    name = name.replace(/\s+/g, ''); // remove white spaces
    name = name.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
    value = value.replace(/\s+/g, ''); // remove white spaces
    value = value.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers

    let currentCharacter = [];
    name = name.replace(/[0-9].+/, '');
    value = value.replace(/^[A-Z]([A-Z]|[a-z]|\D)+/, ''); // remove names
    value = value.replace(/[A-Z].+/, ''); // remove special cases
    currentCharacter = [name, value];
    return currentCharacter;
}

// URL for data
const URL = "https://kuroganehammer.com/Ultimate/DashSpeed";

let initialDashes = [];

const pullInitialDashData = async() => {
    let initialDash = [];
    const rawData = await pullData(URL);
    const $ = cheerio.load(rawData);
    $('#AutoNumber1 tbody tr').each(function (i, elm) {
        initialDashes.push($(this).text().trim());
        let name = initialDashes[i].replace(/\s/g, ' '); // remove endlines
        let value = initialDashes[i].replace(/\s/g, ' '); // remove endlines
        const cc = getInitialDash(name, value);
        initialDash.push(cc);
    });
    return initialDash;
}

let initialDash = []
pullInitialDashData().then(result => {
    initialDash = result;
});

