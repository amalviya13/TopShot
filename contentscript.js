chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "getNumber") {
            var currentNumber = document.getElementById("1MainPart_lbUsersInLineAheadOfYou").innerText;
            console.log(currentNumber);
            var lastUpdated = document.getElementById("MainPart_lbLastUpdateTimeText").innerText;
            sendResponse({current: currentNumber, lastUp : lastUpdated})
            return true;
        }
        return true;
});