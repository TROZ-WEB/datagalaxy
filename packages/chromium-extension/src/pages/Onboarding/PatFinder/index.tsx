import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import styles from './index.css';

const PatFinder = () => {
    const history = useHistory();

    return (
        <div className={styles.Root}>
            <h2>{chrome.i18n.getMessage('onboarding_login_stepTitle')}</h2>
            <span>gif animé</span>
            <p>{chrome.i18n.getMessage('onboarding_patFinder_description')}</p>
            <Button>{chrome.i18n.getMessage('onboarding_patFinder_linkButton')}</Button>
            <Button onClick={() => history.goBack()}>
                {chrome.i18n.getMessage('onboarding_patFinder_closeButton')}
            </Button>
        </div>
    );
};

export default PatFinder;
