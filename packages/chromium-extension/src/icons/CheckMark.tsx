import React, { ComponentPropsWithRef } from 'react';

const CheckMark = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="32" viewBox="0 0 32 32" width="32" {...props}>
            <path
                d="M12 22.115l-5.724-5.724-1.885 1.885 7.609 7.609 15.609-15.609-1.885-1.885-13.724 13.724z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default CheckMark;
