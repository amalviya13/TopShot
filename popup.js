var currentNumber = 1000000;
var prevNumber = currentNumber;
var lastUpdated = "5pm";
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', startScripts);
});

function sendSMS(phone_number) {
    var inst = setInterval(function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "getNumber"}, function(response) {
                currentNumber = response.current;
                lastUpdated = response.lastUp;
            });
        });
        if (prevNumber - currentNumber > 5000) {
            var bodyVal = "{\"phone_number\" : \"" + phone_number + "\",\"numberInLine\" : \"" + currentNumber + "\", \"lastUpdated\" : \"" + lastUpdated + "\"}"
            console.log(bodyVal);
            const req = new XMLHttpRequest();
            const baseUrl = "http://localhost:8080/text";
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            fetch("http://localhost:8080/text", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers : myHeaders,
                body: bodyVal
            }).then(function(response) {

            });
        prevNumber = currentNumber;
        }

    }, 2500);
}

function startScripts() {
    chrome.storage.sync.get('phone_number', function(data) {
        if (typeof data.phone_number === 'undefined') {
            var phone_number=document.getElementById("phone_number").value;
            if (phone_number.length > 0) {
                chrome.storage.sync.set({"phone_number": phone_number}, function() {
                    sendSMS(phone_number)
                });
            }
        } else {
            sendSMS(data.phone_number)
        }
    });
}

// function sendSMS(phone_number) {
//     var prevNumber = currentNumber;
//     while (currentNumber > 0) {
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//                 console.log(response.current)
//                 currentNumber = response.current;
//                 lastUpdated = response.lastUp;
//             });
//         });
//         if (currentNumber != prevNumber) {
//             var bodyVal = "{\"phone_number\" : \"" + phone_number + "\",\"numberInLine\" : \"" + currentNumber + "\", \"lastUpdated\" : \"" + lastUpdated + "\"}"
//             const req = new XMLHttpRequest();
//             const baseUrl = "http://localhost:8080/text";
//             var myHeaders = new Headers();
//             myHeaders.append('Content-Type', 'application/json');
//             fetch("http://localhost:8080/text", {
//                 method: 'POST',
//                 mode: 'cors',
//                 cache: 'no-cache',
//                 headers : myHeaders,
//                 body: bodyVal
//             }).then(function(response) {

//             });
//         }
//         prevNumber = currentNumber;
//     }

// }
