import React from 'react';
import styled from 'styled-components';
import Layout from '../Layout';
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
        <Layout>
            <SCenter>
                <Spinner size="xl" />
            </SCenter>
        </Layout>
    );
};

export default LoadingScreen;
