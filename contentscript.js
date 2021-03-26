// chrome.browserAction.onClicked.addListener((tabs) => {
//     chrome.storage.sync.get('phone_number', function(data) {
//         if (typeof data.phone_number === 'undefined') {
//             document.getElementById('secondDiv').style.display = 'none';
//         } else {
//             document.getElementById('startupDiv').style.display = 'none';
//         }
//     });
// })
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', sendSMS);
});

function sendSMS() {
    console.log("sending");
}

