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
        // eslint-disable-next-line react/destructuring-assignment
        return this.props.children;
    }
}

export default ErrorBoundary;
