// chrome.tabs.create({url: "https://google.com"}, (data)=>{
//     // alert(data.id)
// })
// window.onload=

    // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    //     console.log(tabs[0].url);
    //     alert(tabs[0].url)
    //   });


// chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
//     var currTab = tabs[0]
//     if (currTab) { // Sanity check
//       /* do stuff */
//       console.log(currTab)
//       alert(currTab[0])
      
//     }
//   });
  
// chrome.tabs.getSelected(null, (tab)=>{
//     console.log(tab)
//     alert(tab.url)
//   })
  
//   chrome.tabs.getCurrent(tab=>{
//       console.log(tab)
      
//   })