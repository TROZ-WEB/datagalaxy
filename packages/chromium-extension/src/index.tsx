import { createStore, StoreProvider, useStoreRehydrated, persist } from 'easy-peasy';
import React from 'react';
import * as ReactDOM from 'react-dom';
import root from 'react-shadow/styled-components';
import LoadingScreen from './components/LoadingScreen';
import Popup from './pages/Popup';
import AsyncStorageService from './Services/AsyncStorageService';
import storeModel from './store/store';
import { Fonts, Scrollbar } from './Theme';

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

    const store = createStore(persist(models, { storage: AsyncStorageService }));
    ReactDOM.render(
        <StoreProvider store={store}>
            <Fonts />
            <root.div>
                <Scrollbar />
                <App />
            </root.div>
        </StoreProvider>,
        container,
    );
});
