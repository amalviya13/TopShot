chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // var currentNumber = document.getElementById("MainPart_lbUsersInLineAheadOfYou").innerText;
        // var lastUpdated = document.getElementById("MainPart_lbLastUpdateTimeText").innerText;
        //sendResponse({current: currentNumber, lastUp : lastUpdated})
        sendResponse({current: "100", lastUp : "5pm"})
});