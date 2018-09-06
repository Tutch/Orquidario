import React from 'react';
import PropTypes from 'prop-types';

// Components
import { CollectionItem } from './CollectionItem'; 

function renderCollection(theme, items, removeFunction) {
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
                                <CollectionItem theme={theme}
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
    console.log(props);
    const theme = props.theme;
    const items = props.items;
    const removeOrchid = props.removeOrchid;

    return renderCollection(theme, items, removeOrchid);
}

Collection.propTypes = {
    theme: PropTypes.object,
    items: PropTypes.array,
    removeFunction: PropTypes.func
};