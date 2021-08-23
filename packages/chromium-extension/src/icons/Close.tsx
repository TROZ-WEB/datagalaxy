import React, { ComponentPropsWithRef } from 'react';

const Close = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="1em" viewBox="0 0 48 48" width="1em" {...props}>
            <path
                d="M11.637 7c-.396 0-.792.151-1.093.453l-3.09 3.091a1.544 1.544 0 000 2.185L18.723 24 7.454 35.27a1.544 1.544 0 000 2.186l3.09 3.09a1.544 1.544 0 002.185 0L24 29.277l11.27 11.27a1.544 1.544 0 002.186 0l3.09-3.09a1.544 1.544 0 000-2.185L29.277 24l11.27-11.27a1.544 1.544 0 000-2.186l-3.09-3.09a1.544 1.544 0 00-2.185 0L24 18.723 12.73 7.454A1.54 1.54 0 0011.636 7z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default Close;
