import * as React from 'react';

function Search(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.333 1.745h-.01a6.667 6.667 0 104.108 11.918l4.479 4.504 1.178-1.178-4.494-4.495a6.614 6.614 0 001.404-4.09 6.66 6.66 0 00-6.66-6.659h-.007.002zm0 11.667a5 5 0 115-5 5.006 5.006 0 01-5 5z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
}

export default Search;
