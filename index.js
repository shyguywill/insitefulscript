//Created by Sayo Williams 29/12/2020
var date = new Date()
date.setDate(date.getDate())
var entryTime = date
// var contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x
// var pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}

var isTyping
var actionData = []
var userAddedToCart = false
var userClickedBuy = false

function getWindowVariables() {
    var shop =  window.Shopify.shop
    var visitor = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.uniqToken
    return { shop, visitor }
}

function sendData() {
    var date = new Date()
    date.setDate(date.getDate())
    var exitTime = date
    var {visitor, shop} = getWindowVariables()

    var data = {
        entryTime,
        shop,
        visitor,
        actionData,
        exitTime,
        userClickedBuy,
        userAddedToCart,
    }
    var jsonData = JSON.stringify(data)
    if (actionData.length && shop && visitor){
        console.log('data being sent', jsonData)
        navigator.sendBeacon('https://insitefulapiv1.herokuapp.com/', jsonData)
        actionData = []
   }
}

function onClose(){
    console.log(document.visibilityState)
   if (document.visibilityState == 'hidden') {
        sendData()
   }
}

function logInput(e) {
    var type = e.type //input
    var innerText = e.target.ariaLabel // Search
    var placeHolder = e.target.placeholder //Search
    var value = e.target.value //thing you typed
    
    window.clearTimeout( isTyping );
	isTyping = setTimeout(function() {
        if (innerText == 'Search' || placeHolder == 'Search') {
            actionData.push({type, value})
        }
    }, 750);
}

function logClick(e) {
    var type = e.type
    var name = e.target.localName
    var innerText = e.target.innerText
    var navLink = e.target.href
    var wrapper = e.path ? e.path[1].localName : null//
    var wrapperLink = e.path ? e.path[1].href  : null//
    var value = e.target.value

    if (innerText){
        if (innerText.toLowerCase().includes('cart')) {
            userAddedToCart = true
        }
        else if (innerText.toLowerCase().includes('buy')) {
            userClickedBuy = true
        } 
    }

    actionData.push({ type, name, innerText, navLink, wrapper, wrapperLink, value })
}

document.addEventListener('input', logInput)
document.addEventListener('click', logClick)
document.addEventListener('visibilitychange', onClose)

window.addEventListener('unload', function(e) {
    console.log('unloading')
})
