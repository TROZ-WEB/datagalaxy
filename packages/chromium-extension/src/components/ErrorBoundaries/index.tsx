/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

declare const Raven: any;
class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
        Raven.captureException(error, (sendErr) => {
            if (sendErr) {
                console.error('Failed to send captured exception to Sentry');
            } else {
                console.info('Captured exception and send to Sentry successfully');
            }
        });
    }

    render() {
        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary;
