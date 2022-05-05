import React from 'react';
import styled from 'styled-components';
import LogoWithText from '../../../../assets/logo-horizontal.svg';

/* ---------- STYLES ---------- */

const SBody = styled.div`
    padding: 60px 38px;
`;

const SHeader = styled.div`
    height: 59px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SLogo = styled.img`
    width: 157px;
    height: 27px;
`;

const SRoot = styled.div`
    background-color: #f7f8f9;
    height: 100%;
    overflow: hidden;
`;

/* ---------- COMPONENT ---------- */

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SRoot>
            <SHeader>
                <SLogo alt="DataGaxy logo" src={LogoWithText} />
            </SHeader>
            <SBody>{children}</SBody>
        </SRoot>
    );
};

export default OnboardingLayout;
