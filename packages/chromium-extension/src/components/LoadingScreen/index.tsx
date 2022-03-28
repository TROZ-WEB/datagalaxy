import React from 'react';
import styled from 'styled-components';
import Spinner from '../ui/Spinner';

/* ---------- STYLES ---------- */

const SCenter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

/* ---------- COMPONENT ---------- */

const LoadingScreen = () => {
    return (
        <SCenter>
            <Spinner size="xl" />
        </SCenter>
    );
};

export default LoadingScreen;
