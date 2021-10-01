import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import OnboardingLayout from '../Layout';
import styles from './index.css';

const PatFinder = () => {
    const history = useHistory();

    return (
        <OnboardingLayout>
            <div className={styles.Root}>
                <p className={styles.Header}>{chrome.i18n.getMessage('onboarding_login_helpPAT')}</p>
                {chrome.runtime.getManifest().current_locale.startsWith('en') ? (
                    <iframe
                        allow="autoplay; fullscreen; picture-in-picture"
                        frameBorder="0"
                        height="360"
                        src="https://player.vimeo.com/video/618892114?h=5a4697f7d5&color=ffffff&byline=0"
                        title="Find PAT Video"
                        width="640"
                        allowFullScreen
                    />
                ) : (
                    <iframe
                        allow="autoplay; fullscreen; picture-in-picture"
                        frameBorder="0"
                        height="360"
                        src="https://player.vimeo.com/video/618892015?h=5a4697f7d5&color=ffffff&byline=0"
                        title="Find PAT Video"
                        width="640"
                        allowFullScreen
                    />
                )}
                <Button onClick={() => history.goBack()}>
                    {chrome.i18n.getMessage('onboarding_patFinder_closeButton')}
                </Button>
            </div>
        </OnboardingLayout>
    );
};

export default PatFinder;
