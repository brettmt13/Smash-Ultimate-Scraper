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

// pulls the name of the current character in the string of data
const getName = (string) => {
    let name = string.replace(/\s/g, ' '); // remove endlines
    name = name.replace(/\s+/g, ''); // remove white spaces
    name = name.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
    name = name.replace(/[0-9].+/, ''); // remove values
    return name;
}

// pulls the value of the current character in the string of data
const getValue = (string) => {
    let value = string.replace(/\s/g, ' '); // remove endlines
    value = value.replace(/\s+/g, ''); // remove white spaces
    value = value.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
    value = value.replace(/^[A-Z]([A-Z]|[a-z]|\D)+/, ''); // remove names
    value = value.replace(/[A-Z].+/, ''); // remove special cases
    return value;
}

// gets the current character's name and initial dash value
const getInitialDash = (string) => {
    let name = getName(string);
    let value = getValue(string);
    let currentCharacter = [];
    currentCharacter = [name, value];
    return currentCharacter;
}

// URL for data
const URL = "https://kuroganehammer.com/Ultimate/DashSpeed";

// returns an array of every character and their inital dash value
const getArray = async () => {
    let rawInitialDashes = [];
    let initialDash = [];
    const rawData = await pullData(URL);
    const $ = cheerio.load(rawData);
    $('#AutoNumber1 tbody tr').each(function (i, elm) {
        rawInitialDashes.push($(this).text().trim());
        let string = rawInitialDashes[i];
        const currentCharacter = getInitialDash(string);
        initialDash.push(currentCharacter);
    });
    return initialDash;
}

let initialDash = [];
// creating the array
getArray().then(result => {
    initialDash = result;
});