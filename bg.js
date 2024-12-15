try{
    console.log('bg is called');
    chrome.tabs.onUpdated.addListener(function(ti,ci,tab){
        console.log('tab update fired');
        if(tab.url !== undefined && ci.status == "complete" && tab.url.indexOf('apollo.io/#/people?finderViewId') > -1){
            chrome.scripting.executeScript({
                files:["cs.js"],
                target:{tabId:tab.id}
            }).then(r=>{
                console.log('cs injected');
                console.log(r);
            })
        }
    });
}catch(e){
    console.log('Error');
    console.log(e);
}