import React from 'react';

function Row(props) {
    return (
        <table>
            <tr>
                <td>{props.name}</td>
            </tr>
        </table>
    )
}

export default Row