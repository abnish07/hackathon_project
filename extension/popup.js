 
const searchText = document.getElementById("search");
const header = document.getElementById('header');
const btn = document.getElementById('btn1');
const trackerBtn = document.getElementById('counterBtn')
// const hello = document.querySelector('h1')


var websites = []
var count = 0;

function getWebsiteName(){

chrome.storage.sync.get(["data"], function(result) {
  if(result.data){
    
    const keys = Object.values(result.data)
    websites = keys
    keys.map(ele=>{
      createWebsiteList(ele)
    })

  }
});
}
getWebsiteName()

  function deleteWebsite(deleteElem){
    websites = websites.filter(ele=> ele != deleteElem)
    console.log(websites)
    chrome.storage.sync.set({data: websites}, ()=>{
      alert("file updated")
      // getWebsiteName()
      header.innerHTML = "";
    getWebsiteName()

    })

  }
  
  function createWebsiteList(website){
    var p = document.createElement('p')
    p.innerHTML = website
    p.setAttribute("class", "card")
    p.setAttribute("style", "margin: 5px, padding: 10px, font-size: 12px")
  
    var icon = document.createElement('i')
    icon.setAttribute('class', "fas fa-trash-alt")
    icon.setAttribute('style', 'float: right')
  
        icon.addEventListener('click', function(){
            deleteWebsite(website)
        }) 
  
    p.append(icon)
    header.append(p)
  }
  


              // Notification btn and counter

// trackerBtn.addEventListener('click',()=>{
//   console.log(count)

//   count +=1
  
//   var timer = setInterval(()=>{
//     count++
//     hello.textContent += count;
//     if(count ==5){
//       var notifiOptions = {
//         type: "progress",
//         iconUrl: "images/logot48.png",
//         title: "Time Remainder",
//         message:"Hey! you have already spent 30 min on this website" 
//       }
//       chrome.notifications.create('nitifi', notifiOptions, ()=>{
//         console.log(count)
//       })
//     }
//         if(count == 10){
//           clearTimeout(timer);
//           chrome.notifications.clear("nitifi", notifiOptions)
//         }
//   }, 1000)
  
// })

// add the website List 

btn.addEventListener('click', (event)=>{
  event.preventDefault()
  var text = searchText.value;
  
  createWebsiteList(text)
  websites.push(text) 

  searchText.value = ""
  console.log(websites)
  
    chrome.storage.sync.set({data: websites}, ()=>{
      alert("file saved")
    })
});

