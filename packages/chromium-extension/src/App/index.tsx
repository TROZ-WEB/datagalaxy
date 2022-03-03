import React, { useEffect } from 'react';
import { Switch, Redirect, Route, useRouteMatch, useHistory } from 'react-router-dom';
import ConnectedLayout from '../components/ConnectedLayout';
import Account from '../pages/Account';
import Comments from '../pages/Comments';
import EntityPage from '../pages/EntityPage';
import Notifications from '../pages/Notifications';
import Search from '../pages/Search';
import Tasks from '../pages/Tasks';
import { useStoreActions, useStoreState } from '../store/hooks';

const App = () => {
    const { path } = useRouteMatch();
    const history = useHistory();

    const { historyLocation } = useStoreState((state) => state.auth);
    const updateHistoryLocation = useStoreActions((state) => state.auth.updateHistoryLocation);

    /**
     * Reopen the extension where we left it
     */
    useEffect(() => {
        if (historyLocation && historyLocation.startsWith('/app')) {
            history.push(historyLocation);
        }
    }, []);

    /**
     * Save history changes to allow reopening the extension where we left it
     */
    useEffect(() => {
        return history.listen((location) => {
            if ((location.pathname as string).startsWith('/app')) {
                updateHistoryLocation(location.pathname);
            }
        });
    }, [history]);

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
