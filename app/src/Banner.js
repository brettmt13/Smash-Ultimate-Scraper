import React from 'react';
import './Banner.css';

function Banner() {
    return (
        <div className="Banner">
            
            <ul className = "Menu">
                <li>Stats</li>
                <li>Compare</li>
            </ul>
            
            <span className="Title">
                <h1>SSBU Visual</h1>
                <h3>A Frame Data Visualisation</h3>
             </span>
         </div>
    )
}

export default Banner