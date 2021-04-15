chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "getNumber") {
            var currentNumber = document.getElementById("MainPart_lbUsersInLineAheadOfYou").innerText;
            var lastUpdated = document.getElementById("MainPart_lbLastUpdateTimeText").innerText;
            console.log(currentNumber);
            sendResponse({current: currentNumber, lastUp : lastUpdated})
            return true;
        }
        return true;
});

chrome.runtime.sendMessage({ text: "what is my tab_id?" }, tabId => {
    console.log('My tabId is', tabId);
 });