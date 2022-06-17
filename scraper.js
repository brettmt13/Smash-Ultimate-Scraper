'use strict';

import fetch from "node-fetch";
import * as cheerio from 'cheerio';

class InitialDash {
    // holds this array which this class is returning
    constructor() {
        this.array = [];
        this.URL = "https://kuroganehammer.com/Ultimate/DashSpeed"; // URL of Kurogane Hammer's I.D data
    }

    // pull the data
    pullData() {
        return fetch(this.URL)
            .then((response) => response.text())
            .then((data) => {
                return data;
            })
    }

    // given an Initial Dash string, this method will return the name of the character in that string
    getName(string) {
        let name = string.replace(/\s/g, ' '); // remove endlines
        name = name.replace(/\s+/g, ''); // remove white spaces
        name = name.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
        name = name.replace(/[0-9].+/, ''); // remove values
        return name;
    }

    // given an Initial Dash (I.D) string, this method will return the name of the I.D value in that string
    getValue(string) {
        let value = string.replace(/\s/g, ' '); // remove endlines
        value = value.replace(/\s+/g, ''); // remove white spaces
        value = value.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
        value = value.replace(/^[A-Z]([A-Z]|[a-z]|\D)+/, ''); // remove names
        value = value.replace(/[A-Z].+/, ''); // remove special cases
        return value;
    }

    // given an Initial Dash string, this method will return an array of a single character's name and I.D value
    getInitialDash(string) {
        let name = this.getName(string);
        let value = this.getValue(string);
        let currentCharacter = [];
        currentCharacter = [name, value];
        return currentCharacter;
    }


    // returns an array of every character and their inital dash value
    async getArray() {
        let rawInitialDashes = [];
        this.array = [];
        const rawData = await this.pullData(this.URL);
        const $ = cheerio.load(rawData);
        $('#AutoNumber1 tbody tr').each(function (i, elm) {
            rawInitialDashes.push($(this).text().trim());
        });

        for (let i = 0; i < rawInitialDashes.length; i++) {
            let string = rawInitialDashes[i];
            let fighter = this.getInitialDash(string);
            this.array.push(fighter);
        }

        return this.array;
    }

    // finds the requested character, returning the name and value in an array
    async findCharacter(c) {
        let character = String(c);
        await this.getArray();
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i][0] == character) {
                return this.array[i];
            }
        }
        console.log(`Character _${character}_ not found.`);
    }
}


class AirSpeed {
    // holds this array which this class is returning
    constructor() {
        this.array = [];
        this.URL = "https://kuroganehammer.com/Ultimate/AirSpeed"; // URL of Kurogane Hammer's A.S data
    }

    // pull the data
    pullData() {
        return fetch(this.URL)
            .then((response) => response.text())
            .then((data) => {
                return data;
            })
    }

    // given an Air Speed string, this method will return the name of the character in that string
    getName(string) {
        let name = string.replace(/\s/g, ' '); // remove endlines
        name = name.replace(/\s+/g, ''); // remove white spaces
        name = name.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
        name = name.replace(/[0-9].+/, ''); // remove values
        return name;
    }

    // given an Air Speed string, this method will return the name of the A.S value in that string
    getValue(string) {
        let value = string.replace(/\s/g, ' '); // remove endlines
        value = value.replace(/\s+/g, ''); // remove white spaces
        value = value.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
        value = value.replace(/^[A-Z]([A-Z]|[a-z]|\D)+/, ''); // remove names
        value = value.replace(/[A-Z].+/, ''); // remove special cases
        return value;
    }

    // given an Air Speed string, this method will return an array of a single character's name and I.D value
    getAirSpeed(string) {
        let name = this.getName(string);
        let value = this.getValue(string);
        let currentCharacter = [];
        currentCharacter = [name, value];
        return currentCharacter;
    }


    // returns an array of every character and their air speed value
    async getArray() {
        let rawAirSpeeds = [];
        this.array = [];
        const rawData = await this.pullData(this.URL);
        const $ = cheerio.load(rawData);
        $('#AutoNumber1 tbody tr').each(function (i, elm) {
            rawAirSpeeds.push($(this).text().trim());
        });

        for (let i = 0; i < rawAirSpeeds.length; i++) {
            let string = rawAirSpeeds[i];
            let fighter = this.getAirSpeed(string);
            this.array.push(fighter);
        }

        return this.array;
    }

    // finds the requested character, returning the name and value in an array
    async findCharacter(c) {
        let character = String(c);
        await this.getArray();
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i][0] == character) {
                return this.array[i];
            }
        }
        console.log(`Character _${character}_ not found.`);
    }
}

//const obj = new AirSpeed();
//obj.getArray().then(result => {
//    console.log(result);
//})

//obj.findCharacter("Wario").then(c => {
//    console.log(c);
//});