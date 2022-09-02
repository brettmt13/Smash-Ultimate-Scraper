import React from 'react';
import './Stat.css';

const Stat = ({Num, Name}) => {
    return (
        <div>
            <table>
                <tr>
                    <td className="Num-td">
                        <p>{Num}</p>
                    </td>
                    <td className="Name-td">
                        <p>{Name}</p>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Stat;