document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', startScripts);
});

function startScripts() {
    chrome.storage.sync.get('phone_number', function(data) {
        if (typeof data.phone_number === 'undefined') {
            var phone_number=document.getElementById("phone_number").value;
            console.log(phone_number)
            if (phone_number.length > 0) {
                chrome.storage.sync.set({"phone_number": phone_number}, function() {
                    console.log('Phone number is set to ' + phone_number);
                    getPrice(phone_number)
                });
            }
        } else {
            getPrice(data.phone_number)
        }
    });
}

function getPrice(phone_number) {
    //var currentPrice = document.getElementsByClassName("SinglePriceLarge__PriceRow-ijh2t7-0 dESKpj")[0].getElementsByTagName('span')[0].innerHTML;
    //console.log(currentPrice)
    console.log(phone_number)
    var price = "";
    const req = new XMLHttpRequest();
    const baseUrl = "http://localhost:8080/text";

    var bodyVal = "{\"phone_number\" : \"" + phone_number + "\"}"

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    

    fetch("http://localhost:8080/text", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers : myHeaders,
        body: bodyVal
    }).then(function(response) {
        // check the response object for result
        // ...
    });
    previousPlace = 0

    // while(true) {
    //     place = document.getElementsByClassName("SinglePriceLarge__PriceRow-ijh2t7-0 dESKpj")[0].getElementsByTagName('span')[0].innerHTML;
    //    if (previousPlace != 0 && (previousPlace - place) >= 5000) {
    //         fetch("http://localhost:8080/text", {
    //             method: 'POST',
    //             mode: 'cors',
    //             cache: 'no-cache',
    //             headers : myHeaders,
    //             body: bodyVal
    //         }).then(function(response) {
    //             // check the response object for result
    //             // ...
    //         });
    //    } 
    //     if (currentPrice !== price) {
    //         console.log(price);
    //         currentPrice = price;
    //     }
    //     previousPlace = place
    //     console.log("waiting");
    // }
}
