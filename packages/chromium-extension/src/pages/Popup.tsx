import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import App from '../App';
import Layout from '../components/Layout';
import { useStoreState } from '../store/hooks';
import Onboarding from './Onboarding';

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
    const { onboardingDone } = useStoreState((state) => state.auth);

    useEffect(() => {
        const loadStorage = async () => {
            if (onboardingDone) {
                setInitialLoadingState(AppInitialLoadingStatus.App);
            } else {
                setInitialLoadingState(AppInitialLoadingStatus.Onboarding);
            }
        };
        loadStorage();
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
