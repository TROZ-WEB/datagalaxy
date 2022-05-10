import React, { useEffect } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import ConnectedLayout from '../components/ConnectedLayout';
import Account from '../pages/Account';
import Comments from '../pages/Comments';
import EntityPage from '../pages/EntityPage';
import Notifications from '../pages/Notifications';
import Search from '../pages/Search';
import Tasks from '../pages/Tasks';

declare const Raven: any;

const App = () => {
    const { path } = useRouteMatch();

    useEffect(() => {
        try {
            if (process.env.NODE_ENV === 'production') {
                Raven.config('https://983ee28827e840ac8d5a8de89de09f25@sentry.thetribe.io/128').install();
                Raven.setUserContext({
                    version: chrome.runtime.getManifest().version,
                });
            }
        } catch (e) {
            console.info('Error in Sentry init', e);
        }
    }, []);

    return (
        <ConnectedLayout>
            <Switch>
                <Route path={`${path}/search`}>
                    <Search />
                </Route>
                <Route path={`${path}/entities/:URLLocation`}>
                    <EntityPage />
                </Route>
                <Route path={`${path}/comments`}>
                    <Comments />
                </Route>
                <Route path={`${path}/tasks`}>
                    <Tasks />
                </Route>
                <Route path={`${path}/notifications`}>
                    <Notifications />
                </Route>
                <Route path={`${path}/account`}>
                    <Account />
                </Route>
                <Redirect from={path} to={`${path}/search`} exact />
            </Switch>
        </ConnectedLayout>
    );
};

export default App;
