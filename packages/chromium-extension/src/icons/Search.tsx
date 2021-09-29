import * as React from 'react';

function Search(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M13.333 2.792c-0.005 0-0.011 0-0.017 0-5.891 0-10.667 4.776-10.667 10.667s4.776 10.667 10.667 10.667c2.48 0 4.762-0.846 6.573-2.266l7.167 7.207 1.885-1.885-7.191-7.191c1.401-1.786 2.246-4.066 2.246-6.544 0-5.884-4.77-10.655-10.655-10.655-0.004 0-0.007 0-0.011 0zM13.333 21.459c-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8-0.005 4.416-3.584 7.995-7.999 8z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
}

export default Search;
