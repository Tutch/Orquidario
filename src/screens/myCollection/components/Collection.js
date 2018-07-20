import React from 'react';
import PropTypes from 'prop-types';

export const Collection = (props) => {
    const items = props.items;

    return (
        <table>
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
}

Collection.propTypes = {
    items: PropTypes.array
};