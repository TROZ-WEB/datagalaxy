import React, { ComponentPropsWithRef } from 'react';

const Refresh = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="1em" viewBox="0 0 48 48" width="1em" {...props}>
            <path
                d="M24 5a1.584 1.584 0 100 3.167A15.81 15.81 0 0139.833 24 15.81 15.81 0 0124 39.833 15.81 15.81 0 018.167 24c0-3.72 1.28-7.13 3.42-9.828l2.913 3.495 3.167-11.084L6.583 8.167l2.957 3.547C6.72 15.03 5 19.316 5 24c0 10.475 8.525 19 19 19 10.474 0 19-8.525 19-19 0-10.474-8.526-19-19-19z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default Refresh;
