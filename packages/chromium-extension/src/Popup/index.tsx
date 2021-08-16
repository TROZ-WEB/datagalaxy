import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from '../App';
import Layout from '../components/Layout';
import Onboarding from '../Onboarding';

enum AppInitialLoadingStatus {
    Loading,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Onboarding,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    App,
}

const Popup = () => {
    const [initialLoadingState, setInitialLoadingState] = useState<AppInitialLoadingStatus>(
        AppInitialLoadingStatus.Loading,
    );

    useEffect(() => {
        chrome.storage.local.get(['onboardingDone'], (items: { [key: string]: any }) => {
            if (items.onboardingDone) {
                setInitialLoadingState(AppInitialLoadingStatus.App);
            } else {
                setInitialLoadingState(AppInitialLoadingStatus.Onboarding);
            }
        });
    }, []);

    const renderBootingExtension = () => {
        // Empty layout while the app is booting
        if (initialLoadingState === AppInitialLoadingStatus.Loading) {
            return null;
        }
        if (initialLoadingState === AppInitialLoadingStatus.Onboarding) {
            return <Redirect to="/onboarding" />;
        }
        if (initialLoadingState === AppInitialLoadingStatus.App) {
            return <Redirect to="/app" />;
        }

        return <Redirect to="/global-error" />;
    };

    return (
        <Layout>
            <Router>
                <Switch>
                    <Route path="/onboarding">
                        <Onboarding />
                    </Route>
                    <Route path="/app">
                        <App />
                    </Route>
                    <Route path="/global-error" exact>
                        <p>Une erreur s&apos;est produite, relancez l&apos;extension...</p>
                    </Route>
                    <Route render={renderBootingExtension} exact />
                </Switch>
            </Router>
        </Layout>
    );
};

export default Popup;
