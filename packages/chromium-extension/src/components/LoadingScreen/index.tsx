import React from 'react';
import Layout from '../Layout';
import Spinner from '../ui/Spinner';
import styles from './index.css';

const LoadingScreen = () => {
    return (
        <Layout>
            <div className={styles.Center}>
                <Spinner size="xl" />
            </div>
        </Layout>
    );
};

export default LoadingScreen;
