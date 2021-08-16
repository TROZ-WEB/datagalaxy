import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.css';

const PatFinder = () => {
    const history = useHistory();

    return (
        <div className={styles.Root}>
            <h2>{chrome.i18n.getMessage('onboarding_login_stepTitle')}</h2>
            <span>gif animé</span>
            <p>{chrome.i18n.getMessage('onboarding_patFinder_description')}</p>
            <button type="button">{chrome.i18n.getMessage('onboarding_patFinder_linkButton')}</button>
            <button onClick={() => history.goBack()} type="button">
                {chrome.i18n.getMessage('onboarding_patFinder_closeButton')}
            </button>
        </div>
    );
};

export default PatFinder;
