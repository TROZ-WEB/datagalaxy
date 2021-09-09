import { createStore, StoreProvider } from 'easy-peasy';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './pages/Popup';
import './index.css';
import storeModel from './store/store';
import { AccessToken } from 'shared';

chrome.tabs.query({ active: true, currentWindow: true }, async () => {
    const models = await storeModel();
    const store = createStore(models);

    // Refresh accessToken at the extension launch
    const accessTokenHandler = AccessToken.getInstance();
    accessTokenHandler.init(store.getState().auth.pat);

    ReactDOM.render(
        <StoreProvider store={store}>
            <Popup />
        </StoreProvider>,
        document.getElementById('popup'),
    );
});
