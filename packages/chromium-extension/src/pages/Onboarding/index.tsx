import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PatFinder from './PatFinder';
import { Stepper } from './Stepper';
import Final from './Steps/Final';
import Login from './Steps/Login';

const Onboarding = () => {
    const { path } = useRouteMatch();

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
