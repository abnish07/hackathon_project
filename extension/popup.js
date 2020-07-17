 
// const replacelyForm = document.getElementById("replacely-form");
const searchText = document.getElementById("search");
const header = document.getElementById('header');
const btn = document.getElementById('btn1');
const trackerBtn = document.getElementById('counterBtn')
// const hello = document.querySelector('h1')

var websites = []
var count = 0;

trackerBtn.addEventListener('click',()=>{
  console.log(count)

  count +=1
  
  var timer = setInterval(()=>{
    count++
    hello.textContent += count;
    if(count ==5){
      var notifiOptions = {
        type: "progress",
        iconUrl: "images/logot48.png",
        title: "Time Remainder",
        message:"Hey! you have already spent 30 min on this website" 
      }
      chrome.notifications.create('nitifi', notifiOptions, ()=>{
        console.log(count)
      })
    }
        if(count == 10){
          clearTimeout(timer);
          chrome.notifications.clear("nitifi", notifiOptions)
        }
  }, 1000)
  
})


btn.addEventListener('click', ()=>{
  var text = searchText.value;
  
  websites.push(text)
  console.log(websites)
  localStorage.setItem("data", JSON.stringify(websites || null))
  var p = document.createElement('p')
  p.innerHTML = text

  var icon = document.createElement('i')
  icon.setAttribute('class', "fas fa-trash-alt")
  icon.setAttribute('style', 'float: right')
  p.append(icon)
  header.append(p)
  searchText.value = ""
});



// const replaceText = document.getElementById("replace");

// replacelyForm.onsubmit = function(e){
//     e.preventDefault();
//     console.log(searchText.value)
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {action: "REPLACE_TEXT", find: searchText.value, replace: replaceText.value});
//         window.close();
//     })
// }