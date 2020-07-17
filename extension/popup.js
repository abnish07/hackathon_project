 
// const replacelyForm = document.getElementById("replacely-form");
const searchText = document.getElementById("search");
const header = document.getElementById('header');
const btn = document.getElementById('btn1');
var websites = []


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