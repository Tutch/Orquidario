import React from 'react';
import PropTypes from 'prop-types';

// Components
import { CollectionItem } from './CollectionItem'; 

function renderCollection(config, items, removeFunction) {
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
                                <CollectionItem config={config}
                                                key={i} 
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
            <p>Nenhuma orquídea adicionada.</p>
        );
    }
}

export const Collection = (props) => {
    const config = props.config;
    const items = props.items;
    const removeOrchid = props.removeOrchid;

    return renderCollection(config, items, removeOrchid);
}

Collection.propTypes = {
    config: PropTypes.object,
    items: PropTypes.array,
    removeFunction: PropTypes.func
};