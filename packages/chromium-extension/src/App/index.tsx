import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import ConnectedLayout from '../components/ConnectedLayout';
import Account from '../pages/Account';
import Comments from '../pages/Comments';
import EntityDetails from '../pages/EntityDetails';
import Notifications from '../pages/Notifications';
import Search from '../pages/Search';
import Tasks from '../pages/Tasks';

const App = () => {
    const { path } = useRouteMatch();

    return (
        <ConnectedLayout>
            <Switch>
                <Route path={`${path}/search`}>
                    <Search />
                </Route>
                <Route path={`${path}/entities/:id`}>
                    <EntityDetails />
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
