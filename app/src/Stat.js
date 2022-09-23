import React from 'react';
import './Stat.css';

const Stat = ({Num, Name, Stat}) => {
    return (
        <div>
            <div className = "center">
                <table>
                    <tr>
                        <td className="Num-td">
                            <p>{Num}</p>
                        </td>
                        <td className="Name-td">
                            <p>{Name}</p>
                        </td>
                        <td className="Stat-td">
                            <p>{Stat}</p>
                        </td>
                    </tr>
                    </table>
            </div>
        </div>
    );
}

export default Stat;