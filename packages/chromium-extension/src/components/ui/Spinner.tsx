import React from 'react';
import styled from 'styled-components';

/* ---------- STYLES ---------- */

const SRoot = styled.div`
    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }

    position: relative;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    flex: 0 0 auto;

    &::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        border: 2px solid #0000ff22;
        border-top-color: #0000ff;
        animation: spinner 0.6s linear infinite;
    }

    ${(props) =>
        props.size === 'normal' &&
        `width: 20px;
        height: 20px;`}
    ${(props) =>
        props.size === 'normal' &&
        `&::before {
            width: 20px;
            height: 20px;
            margin-top: -10px;
            margin-left: -10px;
        }`}

    ${(props) =>
        props.size === 'xl' &&
        `width: 40px;
        height: 40px;`}
    ${(props) =>
        props.size === 'xl' &&
        `&::before {
            width: 40px;
            height: 40px;
            margin-top: -20px;
            margin-left: -20px;
        }`}

    ${(props) =>
        props.size === 'xs' &&
        `width: 16px;
        height: 16px;`}
    ${(props) =>
        props.size === 'xs' &&
        `&::before {
            width: 16px;
            height: 16px;
            margin-top: -8px;
            margin-left: -8px;
        }`}
`;

/* ---------- COMPONENT ---------- */

const Spinner = ({ size = 'normal' }: { size?: 'normal' | 'xs' | 'xl' }) => {
    return <SRoot size={size} />;
};

export default Spinner;
