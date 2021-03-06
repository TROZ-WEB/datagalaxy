import React, { ComponentPropsWithRef } from 'react';

const More = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M13.3335 8C13.3335 8.7365 12.7365 9.3335 12 9.3335C11.2635 9.3335 10.6665 8.7365 10.6665 8C10.6665 7.2635 11.2635 6.6665 12 6.6665C12.7365 6.6665 13.3335 7.2635 13.3335 8Z"
                fill="#001030"
            />
            <path
                d="M9.3335 8C9.3335 8.7365 8.7365 9.3335 8 9.3335C7.2635 9.3335 6.6665 8.7365 6.6665 8C6.6665 7.2635 7.2635 6.6665 8 6.6665C8.7365 6.6665 9.3335 7.2635 9.3335 8Z"
                fill="#001030"
            />
            <path
                d="M5.3335 8C5.3335 8.7365 4.7365 9.3335 4 9.3335C3.2635 9.3335 2.6665 8.7365 2.6665 8C2.6665 7.2635 3.2635 6.6665 4 6.6665C4.7365 6.6665 5.3335 7.2635 5.3335 8Z"
                fill="#001030"
            />
        </svg>
    );
};

export default More;
