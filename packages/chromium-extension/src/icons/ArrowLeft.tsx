import React, { ComponentPropsWithRef } from 'react';

const ArrowLeft = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="1em" viewBox="0 0 32 32" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M29.333 14.667H8.552L11.609 11.61L9.724 9.72501L3.448 16.001L9.724 22.277L11.609 20.392L8.552 17.335H29.333V14.667Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default ArrowLeft;
