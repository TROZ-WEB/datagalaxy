import React, { ComponentPropsWithRef } from 'react';

const Insight = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="1em" viewBox="0 0 32 32" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12 30.667H14.667V32H17.334V30.667H20.001V28H12.001L12 30.667Z"
                fill="currentColor"
                fillRule="evenodd"
            />
            <path
                d="M16 6.667C10.855 6.667 6.66699 10.854 6.66699 16C6.66699 19.619 8.77499 22.893 12 24.425V25.333C12 26.069 12.596 26.666 13.333 26.666H18.666C19.403 26.666 19.999 26.069 19.999 25.333V24.425C23.224 22.894 25.332 19.62 25.332 16C25.332 10.853 21.144 6.667 15.999 6.667H16ZM18.221 22.279C17.69 22.467 17.333 22.971 17.333 23.535V24H14.666V23.535C14.666 22.97 14.309 22.467 13.778 22.279C11.119 21.338 9.33299 18.814 9.33299 16C9.33299 12.324 12.324 9.333 16 9.333C19.676 9.333 22.667 12.324 22.667 16C22.667 18.813 20.88 21.337 18.222 22.279H18.221Z"
                fill="currentColor"
                fillRule="evenodd"
            />
            <path d="M14.667 0H17.334V5.333H14.667V0Z" fill="currentColor" fillRule="evenodd" />
            <path d="M0 14.667H5.333V17.334H0V14.667Z" fill="currentColor" fillRule="evenodd" />
            <path d="M26.667 14.667H32V17.334H26.667V14.667Z" fill="currentColor" fillRule="evenodd" />
            <path
                d="M27.056 3.058L28.941 4.942L24.941 8.943L23.056 7.059L27.056 3.058Z"
                fill="currentColor"
                fillRule="evenodd"
            />
            <path
                d="M4.94298 3.057L8.94298 7.057L7.05798 8.942L3.05798 4.942L4.94298 3.057Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default Insight;
