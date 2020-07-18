// chrome.tabs.create({url: "https://google.com"}, (data)=>{
//     // alert(data.id)
// })
    var websiteToTrack =[];

  

    var websitesTrack = ["https://www.facebook.com","https://github.com", "https://www.youtube.com" ];
    

    chrome.tabs.onActivated.addListener((tab)=>{
        // console.log("onactivate",tab)

    })

    chrome.tabs.onUpdated.addListener((tab)=>{
        // give id of the particular tab(onupadte)

        // console.log("onupdate",tab)
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            // console.log(tabs[0]);
            chrome.storage.sync.get(["data"], function(result) {
                if(result.data){
                    
                    var keys = Object.values(result.data)
                    var tabsURL = tabs[0].url
                    console.log(keys)

                    keys.map(ele=>{
                        // console.log(ele)
                        
                        var n = tabsURL.search(ele)
                        if(n==0){
                            console.log("found", tab)
                            initializeCounter(tab, tabsURL)
                        }

                    })
                        // console.log(websiteToTrack[i])
                    // }
            }
            });

      });
    })
        var counter = 0;
    function initializeCounter(id, urls){
        setInterval(()=>{
            counter++
            console.log(counter)
            
                let hours = Math.floor(counter/3600)
                    counter%=3600;
                let minutes = Math.floor(counter/60)
                let seconds = counter%60
                    if(hours < 10 || minutes < 10 || seconds < 10){
                        var res = "0"+hours+" Hours"+" "+"0"+minutes+" Minutes"+" "+"0"+seconds+" Seconds"
                    }
                    else {
                       var res = hours+" Hours"+" "+minutes+" Minutes"+" "+seconds+" Secinds"
                    }
                console.log(res)
            
                chrome.storage.sync.set({counter: res}, ()=>{
                    // alert("timer saved")
                  })
        }, 1000)
    }


        // return tab id if we close the current tab
    chrome.tabs.onRemoved.addListener((tab)=>{
    //    console.log("onRemoved",tab)
    })


