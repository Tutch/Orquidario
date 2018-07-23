import React from 'react';
import PropTypes from 'prop-types';

function renderCollection(items) {
    if(items.length > 0) {
        return (
            <table className="highlight">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Subfamília</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.description}</td>
                                    <td>{item.subfamily}</td>
                                </tr>
                            );                    
                        })
                    }
                </tbody>
            </table>
        );
    } else {
        return (
            <p>Coleção vazia?</p>
        );
    }
}

export const Collection = (props) => {
    const items = props.items;

    return renderCollection(items);
}

Collection.propTypes = {
    items: PropTypes.array
};