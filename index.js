//Created by Sayo Williams 29/12/2020
let date = new Date()
date.setDate(date.getDate())
var entryTime = date
var shop = window.Shopify?.shop
var visitor = window.ShopifyAnalytics?.lib.trekkie.defaultAttributes?.uniqToken
var contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x
var pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}

var isTyping;
var actionData = []
var userConverted = false

function sendData() {
    console.log('data being sent')
    let date = new Date()
    date.setDate(date.getDate())
    const exitTime = date

    const data = {
        entryTime,
        shop,
        visitor,
        pageDims,
        actionData,
        exitTime,
        userConverted
    }
    const jsonData = JSON.stringify(data)

    if (actionData.length && shop && visitor){
        // fetch('http://localhost:5000/', {
        //     method:"POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': "application/json",
        //     },
        // })
        // .then(result => {
        // console.log("Completed with result:", result);
        // });
        navigator.sendBeacon('http://localhost:5000/', jsonData)
    }
}

// function onUnload(){
//     console.log('is unload')
//     sendData()
// }

function onClose(){
    console.log('is on close')
    if (document.visibilityState == 'hidden') {
        console.log('is on close and hidden')
        sendData()
    }
}

function logClick(e) {
    console.log(e)
    const type = e.type
    const clickPosition = { x: e.x, y: e.y }
    const name = e.target.localName
    const innerText = e.target.innerText
    const navLink = e.target.href
    const wrapper = e.path[1].localName
    const wrapperLink = e.path[1].href

    if (innerText){
        if (innerText.toLowerCase().includes('buy') || innerText.toLowerCase().includes('cart')) {
            userConverted = true
        }
    }

    
    //console.log(type, clickPosition, name, innerText, navLink, spanWrapper, spanLink)
    actionData.push({ type, clickPosition, name, innerText, navLink, wrapper, wrapperLink })
}


function logInput(e) {
    //console.log(e)
    
    const type = e.type //input
    const innerText = e.target.ariaLabel // Search
    const placeHolder = e.target.placeholder //Search
    const value = e.target.value //thing you typed
    
    window.clearTimeout( isTyping );
	isTyping = setTimeout(function() {
        if (innerText == 'Search' || placeHolder == 'Search') {
            actionData.push({type, value})
        }
    }, 750);
}

document.addEventListener('input', logInput)
document.addEventListener('click', logClick)
document.addEventListener('visibilitychange', onClose)
//window.addEventListener('beforeunload', onUnload)