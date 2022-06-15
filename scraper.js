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


const getName = (string) => {
    let name = string.replace(/\s/g, ' '); // remove endlines
    name = name.replace(/\s+/g, ''); // remove white spaces
    name = name.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
    name = name.replace(/[0-9].+/, ''); // remove values
    return name;
}

const getValue = (string) => {
    let value = string.replace(/\s/g, ' '); // remove endlines
    value = value.replace(/\s+/g, ''); // remove white spaces
    value = value.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
    value = value.replace(/^[A-Z]([A-Z]|[a-z]|\D)+/, ''); // remove names
    value = value.replace(/[A-Z].+/, ''); // remove special cases
    return value;
}

const getInitialDash = (string) => {
    let name = getName(string);
    let value = getValue(string);
    let currentCharacter = [];
    currentCharacter = [name, value];
    return currentCharacter;
}

// URL for data
const URL = "https://kuroganehammer.com/Ultimate/DashSpeed";

let rawInitialDashes = [];

const pullInitialDashData = async() => {
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

let initialDash = []
pullInitialDashData().then(result => {
    initialDash = result;
    console.log(initialDash);
});



let Mythra = {};
Mythra["data"] = "5";
console.log(Mythra);

let arrayt = [["Mythra", {}]]

let Mario = {};
let DonkeyKong = {};
let Link = {};
let Samus = {};
let DarkSamus = {};
let Yoshi = {};
let Kirby = {};
let Fox = {};
let Pikachu = {};
let Luigi = {};
let Ness = {};
let CaptainFalcon = {};
let Jigglypuff = {};
let Peach = {};
let Daisy = {};
let Bowser = {};
let IceClibers = {};