import { createStore, StoreProvider /* , useStoreRehydrated, persist */ } from 'easy-peasy';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './pages/Popup';
import './index.css';
// import chromeExtensionStorageEngine from './store/chromeExtensionStorageEngine';
import storeModel from './store/store';

const App = () => {
    // const isRehydrated = useStoreRehydrated();

    // return isRehydrated ? <Popup /> : <div>Loading...</div>;

    return <Popup />;
};

chrome.tabs.query({ active: true, currentWindow: true }, async () => {
    const models = await storeModel();
    const store = createStore(models);

    // const store = createStore(
    //     persist(models, { storage: chromeExtensionStorageEngine, allow: ['auth', 'localPreferences'] }),
    // );

    ReactDOM.render(
        <StoreProvider store={store}>
            <App />
        </StoreProvider>,
        document.getElementById('popup'),
    );
});
