var tabId = "";
var running = 0;
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "what is my tab_id?") {
        tabId = sender.tab.id;
        sendResponse({tab: sender.tab.id});
    }
});

function stop() {
    chrome.storage.sync.set({"monitor": 'false'}, function() {
    });
    running = 1;
}

function sendSMS(phone_number) {
    console.log(phone_number)
    var currentNumber = 10000000;
    var prevNumber = currentNumber;
    var increase = 0;
    console.log(tabId);
    var inst = setInterval(function() {
        chrome.storage.sync.get('increment', function(data) {
            increase = data.increment;
        });


        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabId, {method: "getNumber"}, function(response) {
                currentNumber = response.current;
                lastUpdated = response.lastUp;
            });
        });
        console.log("Difference " + (prevNumber - currentNumber));
        console.log("Increase " + increase);

        if (running == 0 && prevNumber - currentNumber >= increase) {
            console.log("Current Number " + currentNumber);
            var bodyVal = "{\"phone_number\" : \"" + phone_number + "\",\"numberInLine\" : \"" + currentNumber + "\", \"lastUpdated\" : \"" + lastUpdated + "\"}"
            const req = new XMLHttpRequest();
            const baseUrl = "app.mytopshotnow.com/text";
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            fetch("https://app.mytopshotnow.com/text", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers : myHeaders,
                body: bodyVal
            }).then(function(response) {

            });
            prevNumber = currentNumber;
        }

    }, 5000);
}