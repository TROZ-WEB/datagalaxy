import * as React from 'react';

function Notification(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.13 15.833A3.32 3.32 0 0010 17.5a3.32 3.32 0 002.87-1.667H7.13zM17.5 15h-15v-2.268l.57-.189A2.82 2.82 0 005 9.865V7.5c0-2.758 2.242-5 5-5s5 2.242 5 5v2.365a2.82 2.82 0 001.93 2.678l.57.19V15zM5.03 13.333h9.942a4.48 4.48 0 01-1.638-3.468V7.5A3.337 3.337 0 0010 4.167 3.337 3.337 0 006.668 7.5v2.365c0 1.373-.621 2.633-1.638 3.468z"
                fill="#fff"
            />
        </svg>
    );
}

export default Notification;
