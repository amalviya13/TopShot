chrome.storage.sync.get('phone_number', function(data) {
    if (typeof data.phone_number === 'undefined') {
        document.getElementById("secondDiv").style.display = "none";
        document.getElementById("verificationDiv").style.display = "none";
    } else {
        document.getElementById("startupDiv").style.display = "none";
        document.getElementById("verificationDiv").style.display = "none";
        document.getElementById("currentNumberSignedUp").innerText = "This is the current number you will be notified at: " + data.phone_number 
    }
});

var currentNumber = 1000000;
var prevNumber = currentNumber;
var lastUpdated = "5pm";
var randomNumber = 0;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', startScripts);
    document.getElementById('sign_up').addEventListener('click', verifySignUp);
    document.getElementById('save').addEventListener('click', saveNewNumber);
    document.getElementById('send_verification').addEventListener('click', sendVerification);
    document.getElementById('send_verification_again').addEventListener('click', sendVerification);
});

function verifySignUp() {
    //see if the value sent in 
    var enteredCode = document.getElementById("verification_number").value;
    var phoneNumber = phone_number=document.getElementById("phone_number").value;
    if (enteredCode == randomNumber) {
        chrome.storage.sync.set({"phone_number": phoneNumber}, function() {
            location.reload();
        });
        document.getElementById("startupDiv").style.display = "none";
        document.getElementById("verificationDiv").style.display = "none";
    }
}

function sendVerification() {
    phone_number=document.getElementById("phone_number").value;
    if (phone_number.length == 10) {
        document.getElementById("verificationDiv").style.display = "block";
        randomNumber = Math.floor(100000 + Math.random() * 900000);
        //send message to number with random number
        var bodyVal = "{\"phone_number\" : \"" + phone_number + "\",\"code\" : \"" + randomNumber + "\"}"
        const req = new XMLHttpRequest();
        const baseUrl = "http://localhost:8080/verify";
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch("http://localhost:8080/verify", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers : myHeaders,
            body: bodyVal
        }).then(function(response) {

        });
    }
}

function saveNewNumber() {
    var phone_number = "";
    if ("none" == document.getElementById("secondDiv").style.display) {
        phone_number=document.getElementById("phone_number").value;
    }
    else {
        phone_number=document.getElementById("phone_number_change").value;
    }
    if (phone_number.length > 0) {
        chrome.storage.sync.set({"phone_number": phone_number}, function() {
            location.reload();
        });
    }
}

function sendSMS(phone_number) {
    var inst = setInterval(function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "getNumber"}, function(response) {
                currentNumber = response.current;
                lastUpdated = response.lastUp;
            });
        });
        var increase = parseInt(document.getElementById("increments").value);
        if (prevNumber - currentNumber > increase) {
            var bodyVal = "{\"phone_number\" : \"" + phone_number + "\",\"numberInLine\" : \"" + currentNumber + "\", \"lastUpdated\" : \"" + lastUpdated + "\"}"
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

    }, 5000);
}

function startScripts() {
    chrome.storage.sync.get('phone_number', function(data) {
        if (typeof data.phone_number === 'undefined') {
            var phone_number=document.getElementById("phone_number").value;
            if (phone_number.length > 0) {
                chrome.storage.sync.set({"phone_number": phone_number}, function() {
                    location.reload();
                });
            }
        } else {
            sendSMS(data.phone_number)
        }
    });
}