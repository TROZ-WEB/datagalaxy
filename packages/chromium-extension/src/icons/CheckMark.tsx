import React, { ComponentPropsWithRef } from 'react';

const CheckMark = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="1em" viewBox="0 0 48 48" width="1em" {...props}>
            <path
                d="M42.354 10c-.415.013-.81.187-1.099.485L16.811 34.929 6.75 24.87a1.599 1.599 0 10-2.26 2.26l11.19 11.19a1.599 1.599 0 002.26 0l25.575-25.575A1.599 1.599 0 0042.354 10z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default CheckMark;
