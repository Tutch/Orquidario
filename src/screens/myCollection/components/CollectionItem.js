import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../../common/config';
import './css/CollectionItem.css';

// Router
import { HashRouter, Link, Route } from 'react-router-dom';
import { OrchidEditor } from '../../orchidEditor/OrchidEditor';

export const CollectionItem = (props) => {
    const item = props.item;
    const removeOrchid = props.removeOrchid;
    const id = item._id;
    const pictures = item.pictures;

    return (
        <tr>
            <td>{item.description}</td>
            <td>{item.subfamily}</td>
            <td>
                <Link className={Config.mainColorText}
                      to={
                          {
                            pathname: '/orchid-editor',
                            customProp: {item}
                          }
                        }
                        >
                    <i className="material-icons">edit</i>
                </Link>
                <a className={Config.mainColorText} 
                   onClick={ (e) => removeOrchid({id:id, pictures:pictures}, e)} >
                    <i className="material-icons">clear</i>
                </a>            
            </td>
        </tr>               
    );
}

CollectionItem.propTypes = {
    item: PropTypes.object
};