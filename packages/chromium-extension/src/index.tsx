import { createStore, StoreProvider, useStoreRehydrated, persist } from 'easy-peasy';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import root from 'react-shadow/styled-components';
import LoadingScreen from './components/LoadingScreen';
import Popup from './pages/Popup';
import AsyncStorageService from './Services/AsyncStorageService';
import storeModel from './store/store';
import { Fonts, GlobalStyle } from './Theme';
/**
 * Before displaying the app, we
 *  - re-hydrate our easy-peasy state from chrome.local.storage
 *  - get a fresh new accessToken.
 */
const App = () => {
    const isRehydrated = useStoreRehydrated();

    return isRehydrated ? <Popup /> : <LoadingScreen />;
};

storeModel().then((models) => {
    const container = document.createElement('div');
    container.id = 'datagalaxy_container';
    document.documentElement.appendChild(container);

    if (window.location.href.indexOf('openDatagalaxy') !== -1) {
        const r = window.document.getElementById('datagalaxy_container');
        r.classList.toggle('datagalaxy_root--show');
    }

    const store = createStore({
        auth: persist(models.auth, { storage: AsyncStorageService }),
        onboarding: persist(models.onboarding, { storage: AsyncStorageService }),
        entity: models.entity,
        search: models.search,
        filters: models.filters,
        modal: models.modal,
    });
    ReactDOM.render(
        <StoreProvider store={store}>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <Fonts />
            <root.div id="datagalaxy_shadow_root">
                <GlobalStyle />
                <App />
            </root.div>
        </StoreProvider>,
        container,
    );
});
