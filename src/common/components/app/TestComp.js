import React from 'react';


export const TestComp = (props) => {
    const p = JSON.stringify(props)
    
    return (
        <p>GG, {p}</p>
    );
}