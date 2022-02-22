function openExtension() {
    var root = window.document.getElementById('datagalaxy_root');
    root.classList.add('datagalaxy_root--show');
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: openExtension,
    });
});
