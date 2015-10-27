/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	var count = 0;
    $(".regular-search-result").each(function(i, u)) {
    	count++;
    }


    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing 
           the web-pages DOM content as argument */
    sendResponse(document.getElementsByClassName("regular-search-result"));
    }
});