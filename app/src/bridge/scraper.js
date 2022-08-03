'use strict';

import fetch from "node-fetch";
import * as cheerio from 'cheerio';

export class Scraper {
    constructor(attr) {
        this.array = ["Scraper", "Array"];
        this.URL = '';
        switch (attr) {
            case "ID":  // initial dash
                this.URL = "http://https://ultimateframedata.com/stats";
                break;
            case "AS":  // air speed
                this.URL = "https://kuroganehammer.com/Ultimate/AirSpeed";
                break;
            case "RS":  //run speed
                this.URL = "https://kuroganehammer.com/Ultimate/RunSpeed";
                break;
            case "WS":  // walk speed
                this.URL = "https://ultimateframedata.com/stats";
                break;
            case "WT":  // weight
                this.URL = "https://kuroganehammer.com/Ultimate/Weight";
                break;
        }
    }

    // parse the data
    parseData() {
        return fetch(this.URL)
            .then((response) => response.text())
            .then((data) => {
                return data;
            });
    }

    // given a parsed string, pull the name of the fighter
    getName(string) {
        let name = string.replace(/\s/g, ' '); // remove endlines
        name = name.replace(/\s+/g, ''); // remove white spaces
        name = name.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
        name = name.replace(/[0-9].*/, ''); // remove values
        return name;
    }

    // given a parsed string, pull the attribute value of the fighter
    getValue(string) {
        let value = string.replace(/\s/g, ' '); // remove endlines
        value = value.replace(/\s+/g, ''); // remove white spaces
        value = value.replace(/[0-9]*\-[0-9]+|^[0-9]+/, ''); //remove beginning numbers
        value = value.replace(/^[A-Z]([A-Z]|[a-z]|\D)+/, ''); // remove names
        value = value.replace(/[A-Z].+/, ''); // remove special cases
        return value;
    }

    // given a parsed string, return an array holding fighter with their attribute value (FV = fighter & value)
    getFV(string) {
        let name = this.getName(string);
        let value = this.getValue(string);
        let fighter = [];
        fighter = [name, value];
        return fighter;
    }

    // return the value of the requested character
    async findCharacter(c) {
        let fighter = String(c);
        await this.getArray();
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i][0] == fighter) {
                return this.array[i];
            }
        }
        console.log(`Character _${fighter}_ not found.`);
    }
}

export class InitialDash extends Scraper {
    constructor() {
        super("ID");
    }

    // returns an array of every character and their inital dash value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);

        $('#AutoNumber1 tbody tr').each(function (i, elm) {
            parsedData.push($(this).text().trim());
        });

        for (let i = 0; i < parsedData.length; i++) {
            let string = parsedData[i];
            let fighter = this.getFV(string);

            // error in Kurogane Hammer's data
            if (fighter[0] == "Terry" && fighter[1] == 1.68) {
                fighter[0] = "Banjo&Kazooie";
            }

            this.array.push(fighter);
        }
        return this.array;
    }
}


export class AirSpeed extends Scraper {
    constructor() {
        super("AS");
    }

    // returns an array of every character and their air speed value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);

        $('#AutoNumber1 tbody tr').each(function (i, elm) {
            parsedData.push($(this).text().trim());
        });

        for (let i = 0; i < parsedData.length; i++) {
            let string = parsedData[i];
            let fighter = this.getFV(string);
            this.array.push(fighter);
        }

        return this.array;
    }
}


export class RunSpeed extends Scraper {
    constructor() {
        super("RS");
    }

    // returns an array of every character and their air speed value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);

        $('#AutoNumber1 tbody tr').each(function (i, elm) {
            parsedData.push($(this).text().trim());
        });

        for (let i = 0; i < parsedData.length; i++) {
            let string = parsedData[i];
            let fighter = this.getFV(string);
            this.array.push(fighter);
        }

        return this.array;
    }
}


export class WalkSpeed extends Scraper {
    constructor() {
        super("WS");
    }

    // returns an array of every character and their air speed value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);

        $('#walkspeed tbody tr').each(function (i, elm) {
            parsedData.push($(this).text().trim());
        });

        for (let i = 0; i < parsedData.length; i++) {
            let string = parsedData[i];
            let fighter = this.getFV(string);
            this.array.push(fighter);
        }

        return this.array;
    }
}


export class Weight extends Scraper {
    constructor() {
        super("WT");
    }

    // returns an array of every character and their air speed value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);

        $('#AutoNumber1 tbody tr').each(function (i, elm) {
            parsedData.push($(this).text().trim());
        });

        for (let i = 0; i < parsedData.length; i++) {
            let string = parsedData[i];
            let fighter = this.getFV(string);
            if (fighter[1] != '') {
                this.array.push(fighter);
            }
        }

        return this.array;
    }
}

//const rs = new RunSpeed();

//rs.findCharacter("Yoshi").then(r => {
//    console.log(r);
//})