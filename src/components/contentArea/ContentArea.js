import React from 'react';

export class ContentArea extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <h4>{this.props.title}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}