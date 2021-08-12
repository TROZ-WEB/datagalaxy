import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.css';

const PatFinder = () => {
    const history = useHistory();

    return (
        <div className={styles.FindPatWrapper}>
            <h2>Où trouver ma clé ?</h2>
            <span>gif animé</span>
            <p>Accédez-y directement en cliquant sur le bouton ci-dessous</p>
            <button type="button">TROUVER MA CLÉ</button>
            <button onClick={() => history.goBack()} type="button">
                Ok, fermer
            </button>
        </div>
    );
};

export default PatFinder;
