import React from 'react';
import PropTypes from 'prop-types';

// Components
import { CollectionItem } from './CollectionItem'; 

function renderCollection(items, removeFunction) {
    if(items.length > 0) {
        return (
            <table className="highlight">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Subfamília</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, i) => {
                            return (
                                <CollectionItem key={i} 
                                                item={item} 
                                                removeOrchid={removeFunction}/>
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
    const removeOrchid = props.removeOrchid;

    return renderCollection(items, removeOrchid);
}

Collection.propTypes = {
    items: PropTypes.array
};