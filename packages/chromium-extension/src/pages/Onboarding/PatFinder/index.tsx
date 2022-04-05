import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/ui/Button';
import OnboardingLayout from '../Layout';

/* ---------- STYLES ---------- */

const SHeader = styled.p`
    font-weight: 700;
    margin-bottom: 30px;
`;

const SRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    text-align: center;
    padding: 16px;
`;

/* ---------- COMPONENT ---------- */

const PatFinder = () => {
    const history = useHistory();

    return (
        <OnboardingLayout>
            <SRoot>
                <SHeader>{chrome.i18n.getMessage('onboarding_login_helpPAT')}</SHeader>
                {chrome.runtime.getManifest().current_locale.startsWith('en') ? (
                    <iframe
                        allow="autoplay; fullscreen; picture-in-picture"
                        frameBorder="0"
                        height="360"
                        src="https://player.vimeo.com/video/618892114?h=5a4697f7d5&color=ffffff&byline=0"
                        data-tip="Find PAT Video"
                        allowFullScreen
                    />
                ) : (
                    <iframe
                        allow="autoplay; fullscreen; picture-in-picture"
                        frameBorder="0"
                        height="360"
                        src="https://player.vimeo.com/video/618892015?h=5a4697f7d5&color=ffffff&byline=0"
                        data-tip="Find PAT Video"
                        allowFullScreen
                    />
                )}
                <Button id="patCloseButton" onClick={() => history.goBack()}>
                    {chrome.i18n.getMessage('onboarding_patFinder_closeButton')}
                </Button>
            </SRoot>
        </OnboardingLayout>
    );
};

export default PatFinder;
