import React, { ComponentPropsWithRef } from 'react';

const Close = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="32" viewBox="0 0 32 32" width="32" {...props}>
            <path
                d="M7.609 26.276l8.391-8.391 8.391 8.391 1.885-1.885-8.391-8.391 8.391-8.391-1.885-1.885-8.391 8.391-8.391-8.391-1.885 1.885 8.391 8.391-8.391 8.391 1.885 1.885z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default Close;
