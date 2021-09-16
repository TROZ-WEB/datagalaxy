import React from 'react';
import Layout from '../Layout';
import styles from './index.css';

const GlobalError = () => {
    return (
        <Layout>
            <div className={styles.Root}>{chrome.i18n.getMessage('global_error')}</div>
        </Layout>
    );
};

export default GlobalError;
