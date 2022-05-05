import React from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    display: flex;
    padding: 15px;
    border-radius: 4px;
    margin: 10px auto 0;

    ${(props) =>
        props.type === 'success' &&
        `color: #155724;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;`}

    ${(props) =>
        props.type === 'warning' &&
        `color: #cd3835;
        background-color: #f2dede;
        border: 1px solid #ebccd1;`}
`;

/* ---------- COMPONENT ---------- */

const Alert = ({ type, children }: { type: 'success' | 'warning'; children: React.ReactNode }) => {
    return <SRoot type={type}>{children}</SRoot>;
};

export default Alert;
