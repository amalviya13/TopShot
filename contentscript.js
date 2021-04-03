chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "getNumber") {
            var currentNumber = document.getElementById("1MainPart_lbUsersInLineAheadOfYou").innerText;
            //var lastUpdated = document.getElementById("MainPart_lbLastUpdateTimeText").innerText;
            //sendResponse({current: currentNumber, lastUp : lastUpdated})
            sendResponse({current: currentNumber, lastUp : "5pm"})
            return true;
        }
        return false;
});