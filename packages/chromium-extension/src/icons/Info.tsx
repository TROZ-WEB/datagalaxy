import React, { ComponentPropsWithRef } from 'react';

const Info = (props: ComponentPropsWithRef<'svg'>) => {
    return (
        <svg height="1em" viewBox="0 0 32 32" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M16 5.333C21.891 5.333 26.667 10.109 26.667 16C26.667 21.891 21.891 26.667 16 26.667C10.109 26.667 5.33299 21.891 5.33299 16C5.33999 10.112 10.111 5.34 15.999 5.333H16ZM16 2.667C8.63599 2.667 2.66699 8.637 2.66699 16C2.66699 23.363 8.63699 29.333 16 29.333C23.364 29.333 29.333 23.363 29.333 16C29.333 8.637 23.363 2.667 16 2.667Z"
                fill="currentColor"
                fillRule="evenodd"
            />
            <path d="M14.685 8H17.352V10.667H14.685V8Z" fill="currentColor" fillRule="evenodd" />
            <path d="M14.685 13.333H17.352V24H14.685V13.333Z" fill="currentColor" fillRule="evenodd" />
            <path d="M13.352 13.333H17.352V16H13.352V13.333Z" fill="currentColor" fillRule="evenodd" />
            <path d="M13.352 21.333H18.685V24H13.352V21.333Z" fill="currentColor" fillRule="evenodd" />
        </svg>
    );
};

export default Info;

<svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M16 5.333C21.891 5.333 26.667 10.109 26.667 16C26.667 21.891 21.891 26.667 16 26.667C10.109 26.667 5.33299 21.891 5.33299 16C5.33999 10.112 10.111 5.34 15.999 5.333H16ZM16 2.667C8.63599 2.667 2.66699 8.637 2.66699 16C2.66699 23.363 8.63699 29.333 16 29.333C23.364 29.333 29.333 23.363 29.333 16C29.333 8.637 23.363 2.667 16 2.667Z"
        fill="#444444"
    />
    <path d="M14.685 8H17.352V10.667H14.685V8Z" fill="#444444" />
    <path d="M14.685 13.333H17.352V24H14.685V13.333Z" fill="#444444" />
    <path d="M13.352 13.333H17.352V16H13.352V13.333Z" fill="#444444" />
    <path d="M13.352 21.333H18.685V24H13.352V21.333Z" fill="#444444" />
</svg>;
