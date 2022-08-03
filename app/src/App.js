import React from 'react';
import Banner from './Banner';
import './TS.css'
import Ranker from './Ranker';

function App() {
    const array = ['1', '2']
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