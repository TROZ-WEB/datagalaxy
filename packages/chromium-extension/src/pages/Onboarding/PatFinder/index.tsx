import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import FindPATEn from '../../../../assets/find-pat-en.gif';
import FindPATFr from '../../../../assets/find-pat-fr.gif';
import styles from './index.css';

const PatFinder = () => {
    const history = useHistory();

    return (
        <div className={styles.Root}>
            <p>{chrome.i18n.getMessage('onboarding_login_helpPAT')}</p>
            {chrome.runtime.getManifest().current_locale.startsWith('en') ? (
                <img alt="How to find PAT" className={styles.FindPatGif} src={FindPATEn} />
            ) : (
                <img alt="How to find PAT" className={styles.FindPatGif} src={FindPATFr} />
            )}
            <Button onClick={() => history.goBack()}>
                {chrome.i18n.getMessage('onboarding_patFinder_closeButton')}
            </Button>
        </div>
    );
};

export default PatFinder;
