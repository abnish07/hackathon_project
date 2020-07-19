// // chrome.tabs.create({url: "https://google.com"}, (data)=>{
// //     // alert(data.id)
// // })
var timeCounter =0;


chrome.storage.sync.get(["timeCounterValue"], function(result) {
    if(result.timeCounter){
       
        timeCounter = result.timeCounterValue
        console.log('get storage', timeCounter)
    }
  });


var obj = {
    activeUrl: ""

}



// function initilizeWebsiteCounter(url, windowId, tabId, timestamp) {
    
//     var alwaysActive = obj.activeUrl;
//     //    var obj1 = {"url" : [[1234, 3456], [2, 1, 45, 67]]}
//     //     to access 3456
//     // obj["key1"][0][1]
//     // 5:51
//     // to push inside the main array
//     // obj["key1"].push("whatever")
//     // console.log(url, tabId, timestamp, obj)
//     if (obj.activeUrl === "") {
//         obj.activeUrl = url 
//         obj[url] = {
//             startTime: timestamp,
//             endTime: null,
//             totalTime: 0,
//             tabId
//         }
//     }
//     // if (obj.activeUrl === url) {
//     //     return
//     // }

//     if (obj.activeUrl !== url) {
        
//         console.log(obj[alwaysActive])
//         obj[alwaysActive].endTime = timestamp;
//         obj.alwaysActive.totalTime = obj[alwaysActive].endTime-obj[alwaysActive].startTime
//         obj.activeUrl = url;
        
//         obj[url] = {
//             startTime: timestamp,
//             endTime: null,
//             totalTime:   obj[url].totalTime,
//             tabId
//         }
//     }


// console.log(obj)





//     // obj1 = {"url": [[timestamp]]}

//     // console.log(obj1["url"].pus(element))

//     // obj.currentUrl= url    
//     // obj =  {
//     //     "activeUrl": [
//     //         [timestamp]
//     //     ]
//     // }   
//     // obj["activeUrl"][obj["activeUrl"].length].push(timestamp,[timestamp])
//     // console.log(obj)


//     // if (obj.currentUrl == '') {
//     //     obj.currentUrl = url
//     //     obj[url] = [
//     //         [timestamp]
//     //     ]
//     // }

//     // if (obj.currentUrl === url) {
//     //     if (obj[url][obj[url].length - 1].length === 2) {
//     //         obj[url].push([timestamp])
//     //     }
//     // }

//     // if (obj.currentUrl !== url) {
//     //     obj[currentUrl][obj[currentUrl].length - 1].push(timestamp)
//     //     obj.currentUrl = url
//     //     obj[url].push([timestamp])
//     // }

//     // let counter = 0;
//     // counter = obj[url].map(num => {
//     //     var c = num[1] - num[0]
//     //     num.reduce((acc, c) => {
//     //         return acc + c
//     //     })
//     // })


//     // console.log(obj)



//     // var ei = {'settings': [3]};
//     // ei.settings[settings.length-1].push([4]);
//     // console.log(ei);


//     // console.log(obj)
// }
// // chrome.tabs.onUpdated.addListener((tab, changeInfo, tabinfo) => {
// //     //     // give id of the particular tab(onupadte)
// //     console.log("onupdate",tab, tabinfo, changeInfo)
// // })    



function initilizeWebsiteCounter(url, windowId, tabId, timestamp) {
    
    // var alwaysActive = obj.activeUrl;

    if (obj.activeUrl === "") {
        obj.activeUrl = url 
        obj[url] = {
            startTime: timestamp,
            endTime: null,
            totalTime: 0,
            tabId
        }
    }
    if (obj.activeUrl !== url) {
        
        // console.log(obj[obj.activeUrl])
        obj[obj.activeUrl].endTime = timestamp;
        obj[obj.activeUrl].totalTime = obj[obj.activeUrl].endTime-obj[obj.activeUrl].startTime
        let totalT = (obj[obj.activeUrl].endTime-obj[obj.activeUrl].startTime)
        timeCounter += totalT
        chrome.storage.sync.set({timeCounterValue: timeCounter}, ()=>{
            console.log('timecounter initial web', timeCounter)
          })
        // console.log("change url",timeCounter)

        obj.activeUrl = url;
        obj[url] = {
            startTime: timestamp,
            endTime: null,
            totalTime: totalT,
            tabId
        }
    }


// console.log(obj)
// 
}









chrome.tabs.onUpdated.addListener((tab, changeInfo, tabinfo) => {
    // give id of the particular tab(onupadte)

    // console.log("onupdate", tabinfo.active, tabinfo.url)

    chrome.storage.sync.get(["data"], function (result) {
        if (result.data) {

            var keys = Object.values(result.data)

            keys.map(ele => {

                var n = tabinfo.url.search(ele)
                if (n == 0) {
                    if (tabinfo.active) {
                        var timestamp = Date.now()
                        initilizeWebsiteCounter(ele, tabinfo.windowId, tabinfo.id, timestamp)
                    }
                }

            })

        }
    });


})
// var counter = 0;

// function initializeCounter(id, urls) {
//     setInterval(() => {
//         counter++
//         console.log(counter)



//         chrome.storage.sync.set({
//             counter: res
//         }, () => {
//             // alert("timer saved")
//         })
//     }, 1000)
// }






// chrome.windows.onRemoved.addListener((ele, changeInfo, tabinfo)=>{
//     console.log("windows close", ele,  changeInfo, tabinfo)
// })

// // return tab id if we close the current tab
// chrome.tabs.onRemoved.addListener((tab, changeInfo, tabinfo) => {
//     console.log("windows close", tab,  changeInfo, tabinfo)
//     // for( tabId in obj){
//     //     console.log(tabId)
//     //     if(tabId === tab){
//     //         console.low('your tab closed')
//     //     }
//     // }
// })


// // let hours = Math.floor(counter / 3600)
// // counter %= 3600;
// // let minutes = Math.floor(counter / 60)
// // let seconds = counter % 60
// // if (hours < 10 || minutes < 10 || seconds < 10) {
// //     var res = "0" + hours + " Hours" + " " + "0" + minutes + " Minutes" + " " + "0" + seconds + " Seconds"
// // } else {
// //     var res = hours + " Hours" + " " + minutes + " Minutes" + " " + seconds + " Secinds"
// // }
// // console.log(res)


chrome.tabs.onRemoved.addListener((tabindex, changeInfo, tabinfo) => {
    console.log("windows close", tabindex) 
    let timestamp = Date.now() 
    for (tab in obj) {
        if (obj[tab].tabId === tabindex) {
            obj[tab].endTime = timestamp 
            obj[tab].totalTime = obj[tab].endTime - obj[tab].startTime 
             timeCounter += (obj[tab].endTime - obj[tab].startTime)

             chrome.storage.sync.set({timeCounterValue: timeCounter}, ()=>{
                console.log('timecounter on remove', timeCounter)
              })
            //  console.log("onremove",timeCounter)
            obj[tab].tabid = null
        }
    }
    // console.log(obj, timestamp)
})


// chrome.storage.sync.set({timeCounterValue: timeCounter}, ()=>{
//     // alert("time counter saved")
//     console.log('timecounter', timeCounter)
//   })
