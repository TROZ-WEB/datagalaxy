import React from 'react';
import styled from 'styled-components';
import LogoWithText from '../../../../assets/logo-horizontal.svg';

/* ---------- STYLES ---------- */

const SBody = styled.div`
    padding: 24px 38px;
`;

const SHeader = styled.div`
    height: 59px;
    background-color: #ffffff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SLogo = styled.img`
    width: 157px;
    height: 27px;
`;

const SRoot = styled.div`
    background-color: #f3f6ff;
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
