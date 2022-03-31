import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AccessToken } from 'shared';
import App from '../App';
import Layout from '../components/Layout';
import LoadingScreen from '../components/LoadingScreen';
import { useStoreDispatch, useStoreState } from '../store/hooks';
import Onboarding from './Onboarding';

// declare const pendo: any;

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

    const dispatch = useStoreDispatch();
    const state = useStoreState((stt) => stt);
    const { onboardingDone, pat } = state.auth;

    useEffect(() => {
        if (onboardingDone) {
            setInitialLoadingState(AppInitialLoadingStatus.App);
        } else {
            setInitialLoadingState(AppInitialLoadingStatus.Onboarding);
        }
    }, []);

    const [isAppReady, setIsAppReady] = useState<boolean>(false);
    const [globalError, setGlobalError] = useState<boolean>(null);

    // const user = useStoreState((s) => s.auth.user);
    // const aT = useStoreState((s) => s.auth.getDecodedPat);

    useEffect(() => {
        const initApp = async () => {
            try {
                // Refresh accessToken at the extension launch
                const accessTokenSingleton = AccessToken.getInstance();
                await accessTokenSingleton.init(pat);
                // Fetch all available
                dispatch.auth.fetchAttributes();
                dispatch.auth.fetchTags();
                dispatch.auth.fetchWorkspaces();
                dispatch.auth.fetchUser();
                dispatch.auth.fetchTechnologies();
                dispatch.entity.fetchRecentlyAccessedObjects();

                setIsAppReady(true);
            } catch (error) {
                setGlobalError(true);
            }
        };

        if (onboardingDone) {
            initApp();
        }
    }, []);

    /* useEffect(() => {
        if (user?.userId && aT?.uid) {
            pendo.initialize({
                visitor: {
                    id: aT.uid,
                },

                account: {
                    id: aT.cid,
                },
            });
        }
    }, [user, aT]); */

    const renderBootingExtension = () => {
        if (globalError) {
            return (
                <Redirect
                    to={{
                        pathname: '/app/account',
                        state: { isError: true },
                    }}
                />
            );
        }
        if (initialLoadingState === AppInitialLoadingStatus.Loading) {
            return <LoadingScreen />;
        }

        if (isAppReady && initialLoadingState === AppInitialLoadingStatus.App) {
            return <Redirect to="/app" />;
        }

        if (initialLoadingState === AppInitialLoadingStatus.Onboarding) {
            return <Redirect to="/onboarding" />;
        }

        return null;
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
                    <Route render={renderBootingExtension} exact />
                </Switch>
            </Router>
        </Layout>
    );
};

export default Popup;
