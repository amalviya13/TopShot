chrome.storage.sync.get('phone_number', function(data) {
    if (typeof data.phone_number === 'undefined') {
        document.getElementById("secondDiv").style.display = "none";
        document.getElementById("thirdDiv").style.display = "none";
        document.getElementById("invalidPhoneNumber").style.display = "none";
        document.getElementById("invalidCode").style.display = "none";
        document.getElementById("cancel_number").style.display = "none";
    } else {
        document.getElementById("firstDiv").style.display = "none";
        document.getElementById("secondDiv").style.display = "none";
        document.getElementById("phone_number_3").value = data.phone_number;
    }
});

chrome.storage.sync.get('monitor', function(data) {
    console.log(data.monitor);
    if (typeof data.monitor === 'true') {
        document.getElementById("stop").style.display = "block";
        document.getElementById("start").style.display = "none";
    }
    else {
        document.getElementById("stop").style.display = "none";
        document.getElementById("start").style.display = "block";
    }
});


chrome.storage.sync.set({"increment": 200}, function() {
});

var currentNumber = 10000000;
var prevNumber = currentNumber;
var lastUpdated = "5pm";
var randomNumber = 0;
var running = 0;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('increments').addEventListener('change', logValue, false);
    document.getElementById('start').addEventListener('click', startScripts);
    document.getElementById('sign_up').addEventListener('click', verifySignUp);
    document.getElementById('send_verification').addEventListener('click', sendVerification);
    document.getElementById('changeNumber').addEventListener('click', firstPage);
    document.getElementById('resend_code').addEventListener('click', sendVerificationAgain);
    document.getElementById('stop').addEventListener('click', stop);
    document.getElementById('cancel_number').addEventListener('click', goThirdDiv);
});

function logValue() {
    var value = document.getElementById('increments').value;
    chrome.storage.sync.set({"increment": value}, function() {
        console.log(value);
    });
}

function goThirdDiv() {
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "none";
    document.getElementById("stop").style.display = "none";
    document.getElementById("thirdDiv").style.display = "block";
}

function stop() {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.stop();
    running = 1;
    document.getElementById("stop").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("numInLine").style.display = "none";
}

function firstPage() {
    document.getElementById("secondDiv").style.display = "none";
    document.getElementById("invalidPhoneNumber").style.display = "none";
    document.getElementById("thirdDiv").style.display = "none";
    document.getElementById("firstDiv").style.display = "block";

}

function verifySignUp() {
    var enteredCode = document.getElementById("verification_number").value;
    var phoneNumber = phone_number=document.getElementById("phone_number_2").value;
    if (enteredCode == randomNumber) {
        document.getElementById("invalidCode").style.display = "none";
        chrome.storage.sync.set({"phone_number": phoneNumber}, function() {
            location.reload();
        });
        document.getElementById("firstDiv").style.display = "none";
    } else {
        document.getElementById("invalidCode").style.display = "block";
    }
}

function sendVerification() {
    var phone_number=document.getElementById("phone_number").value;
    if (phone_number.length == 10) {
        document.getElementById("invalidCode").style.display = "none";
        document.getElementById("invalidPhoneNumber").style.display = "none";
        document.getElementById("phone_number_2").value = phone_number;
        document.getElementById("secondDiv").style.display = "block";
        document.getElementById("firstDiv").style.display = "none";
        document.getElementById("thirdDiv").style.display = "none";
        randomNumber = Math.floor(100000 + Math.random() * 900000);
        var bodyVal = "{\"phone_number\" : \"" + document.getElementById("phone_number_2").value + "\",\"code\" : \"" + randomNumber + "\"}"
        const req = new XMLHttpRequest();
        const baseUrl = "app.mytopshotnow.com/verify";
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch("https://app.mytopshotnow.com/verify", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers : myHeaders,
            body: bodyVal
        }).then(function(response) {

        });
    } else {
        document.getElementById("invalidPhoneNumber").style.display = "block";
    }
}

function sendVerificationAgain() {
    var phone_number=document.getElementById("phone_number_2").value;
    if (phone_number.length == 10) {
        document.getElementById("invalidCode").style.display = "none";
        document.getElementById("invalidPhoneNumber").style.display = "none";
        document.getElementById("phone_number_2").value = phone_number;
        document.getElementById("secondDiv").style.display = "block";
        document.getElementById("firstDiv").style.display = "none";
        document.getElementById("thirdDiv").style.display = "none";
        randomNumber = Math.floor(100000 + Math.random() * 900000);
        var bodyVal = "{\"phone_number\" : \"" + document.getElementById("phone_number_2").value + "\",\"code\" : \"" + randomNumber + "\"}"
        const req = new XMLHttpRequest();
        const baseUrl = "app.mytopshotnow.com/verify";
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch("https://app.mytopshotnow.com/verify", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers : myHeaders,
            body: bodyVal
        }).then(function(response) {

        });
    } else {
        document.getElementById("invalidPhoneNumber").style.display = "block";
    }
}

function startScripts() {

    var bgPage = chrome.extension.getBackgroundPage();

    running = 0;
    chrome.storage.sync.get('phone_number', function(data) {
        if (typeof data.phone_number === 'undefined') {
            var phone_number=document.getElementById("phone_number").value;
            if (phone_number.length > 0) {
                chrome.storage.sync.set({"phone_number": phone_number}, function() {
                    location.reload();
                });
            }
        } else {
            chrome.storage.sync.set({"monitor": 'true'}, function() {
            });

            var bgPage = chrome.extension.getBackgroundPage();
            bgPage.start();
            running = 1;

            document.getElementById("start").style.display = "none";
            document.getElementById("stop").style.display = "block";
            bgPage.sendSMS(data.phone_number);
        }
    });
}