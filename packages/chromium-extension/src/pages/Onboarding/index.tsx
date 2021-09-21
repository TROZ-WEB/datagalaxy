import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useStoreState } from '../../store/hooks';
import PatFinder from './PatFinder';
import { Stepper } from './Stepper';
import Final from './Steps/Final';
import Login from './Steps/Login';

const Onboarding = () => {
    const { path } = useRouteMatch();
    const history = useHistory();

    const onboardingDone = useStoreState((state) => state.auth.onboardingDone);

    useEffect(() => {
        if (onboardingDone) {
            history.push('/app');
        }
    }, [onboardingDone]);

    return (
        <Switch>
            <Route path={`${path}/find-pat-helper`}>
                <PatFinder />
            </Route>
            <Route>
                <Stepper steps={[Login, Final]} />
            </Route>
        </Switch>
    );
};

export default Onboarding;
