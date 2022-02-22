import { createStore, StoreProvider, useStoreRehydrated, persist } from 'easy-peasy';
import React from 'react';
import * as ReactDOM from 'react-dom';
import LoadingScreen from './components/LoadingScreen';
import Popup from './pages/Popup';
import AsyncStorageService from './Services/AsyncStorageService';
import storeModel from './store/store';
import './index.css';

/**
 * Before displaying the app, we
 *  - re-hydrate our easy-peasy state from chrome.local.storage
 *  - get a fresh new accessToken.
 */
const App = () => {
    const isRehydrated = useStoreRehydrated();

    return isRehydrated ? <Popup /> : <LoadingScreen />;
};

const initializeApp = async () => {
    const app = document.createElement('div');
    app.id = 'datagalaxy_root';
    document.body.appendChild(app);

    const models = await storeModel();
    const store = createStore(persist(models, { storage: AsyncStorageService }));
    ReactDOM.render(
        <StoreProvider store={store}>
            <App />
        </StoreProvider>,
        app,
    );
};

initializeApp();
