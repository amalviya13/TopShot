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

function start() {
    chrome.storage.sync.set({"monitor": 'true'}, function() {
    });
    running = 0;
}

function sendSMS(phone_number) {
    var currentNumber = 10000000;
    var timeToPurchase = 0;
    var prevNumber = currentNumber;
    var increase = 0;
    var dropStat = 0;
    var inst = setInterval(function() {
        chrome.storage.sync.get('increment', function(data) {
            increase = data.increment;
        });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabId, {method: "getNumber"}, function(response) {
                console.log(response);
                currentNumber = response.current;
                lastUpdated = response.lastUp;
                timeToPurchase = response.done;
                dropStat = response.dropStatus;
            });
        });
        if(running == 1) {
            clearInterval(inst);
            return;
        }
        if(dropStat === 1) {
            var bodyVal = "The pack drop has ended";
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
            clearInterval(inst);
            return;
        }
        if(timeToPurchase === 1) {
            var bodyVal = "It's your turn to purchase a pack";
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
            clearInterval(inst);
            return;
        }

        if (increase !== -1 && (prevNumber - currentNumber >= increase)) {
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