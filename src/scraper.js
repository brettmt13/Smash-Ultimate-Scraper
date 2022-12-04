'use strict';

import fetch from "node-fetch";
import * as cheerio from 'cheerio';

export class Scraper {
    constructor() {
        this.array = ["Scraper", "Array"];
        this.URL = 'https://ultimateframedata.com/stats';
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
        super();
    }

    // given a parsed string, return an array holding fighter with their attribute value (FV = fighter & value)
    getFV(string) {
        let name = this.getName(string);
        let value = this.getValue(string);
        let fighter = [];
        fighter = [name, value];
        return fighter;
    }

    // returns an array of every character and their inital dash value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);
        let it = 5;
        let name = '';
        let value = 0;

        $('#dashrunspeed tr td').each(function (i, elm) { //for each row just append first two

            if (it % 5 == 0) { // this gets the name
                name = $(this).text().trim();
            }
            else if(it % 5 == 1){ // this gets initial dash value
                value = $(this).text().trim();
                parsedData.push(name + value);
            }
            it = it + 1;
        });

        for (let i = 0; i < parsedData.length; i++) {
            let string = parsedData[i];
            let fighter = this.getFV(string);

            this.array.push(fighter);
        }
        return this.array;
    }
}


export class AirSpeed extends Scraper {
    constructor() {
        super();
    }

    // returns an array of every character and their air speed value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);

        $('#airspeed tbody tr').each(function (i, elm) {
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


// export class RunSpeed extends Scraper {
//     constructor() {
//         super();
//     }
//
//     // returns an array of every character and their air speed value
//     async getArray() {
//         let parsedData = [];
//         this.array = [];
//         const rawData = await this.parseData(this.URL);
//         const $ = cheerio.load(rawData);
//
//         $('#runspeed tbody tr').each(function (i, elm) {
//             parsedData.push($(this).text().trim());
//         });
//
//         for (let i = 0; i < parsedData.length; i++) {
//             let string = parsedData[i];
//             let fighter = this.getFV(string);
//             this.array.push(fighter);
//         }
//
//         return this.array;
//     }
// }


export class WalkSpeed extends Scraper {
    constructor() {
        super();
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
        super();
    }

    // returns an array of every character and their air speed value
    async getArray() {
        let parsedData = [];
        this.array = [];
        const rawData = await this.parseData(this.URL);
        const $ = cheerio.load(rawData);

        $('#weight tbody tr').each(function (i, elm) {
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

// creates an instance of the Weight class
const characterWeight = new Weight();

// call getArray() from the weight class
characterWeight.getArray().then(result => {
  console.log(result)
})
