import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './pages/Popup';
import './index.css';

chrome.tabs.query({ active: true, currentWindow: true }, () => {
    ReactDOM.render(<Popup />, document.getElementById('popup'));
});
