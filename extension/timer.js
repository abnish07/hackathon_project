// from timer js

chrome.storage.sync.get(["timeCounterValue"], function (result) {
    console.log("timeCounter", result.timeCounterValue)
    var totalTotalTime = document.getElementById("totalTimeCount")
    var h = document.querySelector('.main');
    var m = document.querySelector('.main1')
    var s = document.querySelector('.main2')

    var resCounter = timeStamp(result.timeCounterValue)
    h.innerHTML = resCounter[0]+" :Hours";
    m.innerHTML = resCounter[1]+" :Minutes";
    s.innerHTML = resCounter[2]+" :Seconds";

    // totalTotalTime.innerHTML = resCounter[0]+": " +resCounter[1] +": " + resCounter[2]
})

function timeStamp(duration) {
    // var t = new Date(time * 1000) 
    // var hr = t.getHours();
    // var mins = "0" + t.getMinutes();
    // var sec = "0" + t.getSeconds() 
    // var date = t.getDate() 
    // var date1 = t.getMonth() 
    // console.log(hr, mins, sec)

            var seconds = parseInt((duration/1000)%60)
            var minutes = parseInt((duration/(1000*60))%60)
            var hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return [hours, minutes, seconds ];
  
    // var seconds = Math.floor(milliseconds / 1000); 
    // //in s 
    // var minutes = Math.floor(milliseconds / 60 / 1000); //in minutes 
    // var hours = Math.floor(milliseconds / 3600 / 1000); 
    // if(seconds < 10 || minutes<10 || hours <10){
    //     var res = "0"+hours+" hours"+"0"+minutes+" Minutes"+"0"+seconds+" seconds"
    // }
    // else{
    //     var res = hours+" hours"+minutes+" Minutes"+seconds+" seconds"
    // }
    // var seconds =  (milliseconds / 1000) % 60 ;
    // var minutes =  ((milliseconds / (1000*60)) % 60);
    // var hours   =  ((milliseconds / (1000*60*60)) % 24);
    // console.log(hours, seconds, minutes)
    // return res

}