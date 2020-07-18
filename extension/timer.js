// from timer js

chrome.storage.sync.get(["counter"], function(result){
    console.log("TIMERJS" ,result.counter)
    var totalTotalTime = document.getElementById("totalTimeCount")
  
    totalTotalTime.innerHTML = result.counter
})

