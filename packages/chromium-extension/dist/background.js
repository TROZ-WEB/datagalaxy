function openExtension() {
    const root = window.document.getElementById('datagalaxy_container');
    root.classList.toggle('datagalaxy_root--show');
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: openExtension,
    });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        const d = details;
        for (let i = 0; i < d.requestHeaders.length; ++i) {
            if (d.requestHeaders[i].name === 'User-Agent') {
                d.requestHeaders[i].value = 'Chrome-Plugin';
                break;
            }
        }

        return { requestHeaders: d.requestHeaders };
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders'],
);
