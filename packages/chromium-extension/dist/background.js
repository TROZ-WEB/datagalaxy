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
