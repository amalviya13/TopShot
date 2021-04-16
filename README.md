# TopShot
Building a NBA Top Shot chrome extension to send sms messages to users who are waiting in line during a pack drop

# PopUp.js
- Reads action buttons and text fields from the popup.html
- When a phone number is not defined in chrome's local storage, fields such as "enter phone number", "send verification code" are shown and others are hidden
- If a phone number exists, the fields of "current number", "start monitoring", and "stop monitoring" are shown respectively
- When start monitoring is clicked, it calls the function "start" and "sendSMS" in Background.js as long as a phone number exists

# ContentScript.js
- Only script which has access to read the current page's dom
- Has a listener for when Background.js will request the current number printed on screen (document.getElementById("MainPart_lbUsersInLineAheadOfYou").innerText;)
- Also has a listener which sends back the tabId, which allows the script to run even if the tab is not in focus

# Background.js
- Starts with getting current tabId from content script
- Has a stop and start method which sets a variable called running to 0 or 1 to either stop sending texts or to start
- SendSMS has a setInterval loop which runs every 5 seconds
- It first gets the increase from chrome local storage which is the increments in number which the user wants to be notified
- It then gets the current number by calling the listener in ContentScript.js
- If stop function is called, break out of loop
- Otherwise if previous number - current number is greater than difference user wanted make api call to send the text
