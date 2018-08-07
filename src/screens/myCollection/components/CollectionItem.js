import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../../common/config';

// Router
import { HashRouter, Link, Route } from 'react-router-dom';
import { OrchidEditor } from '../../orchidEditor/orchidEditor';

export const CollectionItem = (props) => {
    const item = props.item;

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
                <Link className={Config.mainColorText}
                      to="">
                    <i className="material-icons">clear</i>
                </Link>            
            </td>
        </tr>               
    );
}

CollectionItem.propTypes = {
    item: PropTypes.object
};