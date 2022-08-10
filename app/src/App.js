import React from 'react';
import Banner from './Banner';
import './TS.css'
import Ranker from './Ranker';
import * as scraper from './bridge/bridge.js'

function App() {
    scraper.ID.getArray().then(r => {
        console.log(r);
    });
    return (
        <div>
            <Banner />

            <h1 className="Header">Initial Dash Stats</h1>

            {array.map(n => (
                <Ranker name={n} />
            ))}

        </div>
    );
}

export default App;