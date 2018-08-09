import React from 'react';
import './css/ContentArea.css'

export const ContentArea = (props) => {
    return (
        <div className="row">
            <div className="col s12">
                <div className="row">
                    <div className="col s12">
                        <h4>{props.title}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}