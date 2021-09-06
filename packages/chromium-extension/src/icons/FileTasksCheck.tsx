import * as React from 'react';

function FileTasksCheck(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.167 12.988l-1.91-1.91-1.179 1.178 3.09 3.09 4.755-4.757-1.178-1.178-3.578 3.577z"
                fill="currentColor"
                fillRule="evenodd"
            />
            <path
                d="M15.833 4.167h-1.667V2.5h-.952A3.332 3.332 0 0010 0a3.332 3.332 0 00-3.215 2.5h-.951v1.667H4.166c-.92 0-1.667.748-1.667 1.667V17.5c0 .919.747 1.666 1.667 1.666h11.666c.92 0 1.667-.747 1.667-1.666V5.834a1.67 1.67 0 00-1.666-1.667zM10 1.667c.616 0 1.154.335 1.443.833H8.556c.29-.498.827-.833 1.443-.833zm-2.5 2.5h5v1.667h-5V4.167zM15.833 17.5H4.166V5.833h1.667V7.5h8.333V5.833h1.667V17.5z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
}

export default FileTasksCheck;
