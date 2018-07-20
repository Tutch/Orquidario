import React from 'react';

export class ContentArea extends React.Component {
    render() {
        return (
            <section>
                <h1>{this.props.title}</h1>
                <div>
                    {this.props.children}
                </div>
            </section>
        );
    }
}