import React from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Stepper } from './Stepper';
import Final from './Steps/Final';
import Login from './Steps/Login';
import SetPIN from './Steps/Pin';
import SetPreferences from './Steps/SetPreferences';
import styles from './index.css';

const Onboarding = () => {
    const { path } = useRouteMatch();
    const history = useHistory();

    return (
        <div className={styles.Root}>
            <Switch>
                <Route path={`${path}/find-pat-helper`}>
                    <div className={styles.FindPatWrapper}>
                        <h2>Où trouver ma clé ?</h2>
                        <span>gif animé</span>
                        <p>Accédez-y directement en cliquant sur le bouton ci-dessous</p>
                        <button type="button">TROUVER MA CLÉ</button>
                        <button onClick={() => history.goBack()} type="button">
                            Ok, fermer
                        </button>
                    </div>
                </Route>
                <Route>
                    <Stepper steps={[Login, SetPIN, SetPreferences, Final]} />
                </Route>
            </Switch>
        </div>
    );
};

export default Onboarding;
