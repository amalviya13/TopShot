chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "getNumber") {
            var currentNumber = document.getElementById("MainPart_lbUsersInLineAheadOfYou").innerText;
            var lastUpdated = document.getElementById("MainPart_lbLastUpdateTimeText").innerText;
            var purchase = 0;
            if(document.getElementById("first-in-line").style.display !== 'none') {
                purchase = 1;
            }
            var packsRunOut = 0;
            if(document.getElementById('lbHeaderH2').innerText === 'The Drop Has Ended') {
                packsRunOut = 1;
            }
            sendResponse({current: currentNumber, lastUp : lastUpdated, done : purchase, dropStatus : packsRunOut})
            return true;
        }
        return true;
});

chrome.runtime.sendMessage({ text: "what is my tab_id?" }, tabId => {
    console.log('My tabId is', tabId);
 });
