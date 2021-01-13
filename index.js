//Created by Sayo Williams 29/12/2020
let date = new Date()
date.setDate(date.getDate())
var entryTime = date
var shop = window.Shopify?.shop
var visitor = window.ShopifyAnalytics?.lib.trekkie.defaultAttributes?.uniqToken
// var contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x
// var pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}

let isTyping;
let actionData = []
let userConverted = false
let userAddedToCart = false
let userClickedBuy = false

function sendData() {
   // console.log('data being sent')
    let date = new Date()
    date.setDate(date.getDate())
    const exitTime = date

    const data = {
        entryTime,
        shop,
        visitor,
        actionData,
        exitTime,
        userClickedBuy,
        userAddedToCart,
    }
    const jsonData = JSON.stringify(data)
    if (actionData.length && shop && visitor){
        navigator.sendBeacon('https://insitefulapiv1.herokuapp.com/', jsonData)
        actionData = []
    }
}

function onClose(){
    if (document.visibilityState == 'hidden') {
        sendData()
    }
}

function logClick(e) {
    if (!actionData.length){
        console.log('adding listener')
        document.addEventListener('visibilitychange', onClose, {once: true})
    }
    const type = e.type
    const name = e.target.localName
    const innerText = e.target.innerText
    const navLink = e.target.href
    const wrapper = e.path[1].localName
    const wrapperLink = e.path[1].href
    const value = e.target.value

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


function logInput(e) {
    const type = e.type //input
    const innerText = e.target.ariaLabel // Search
    const placeHolder = e.target.placeholder //Search
    const value = e.target.value //thing you typed
    
    window.clearTimeout( isTyping );
	isTyping = setTimeout(function() {
        if (!actionData.length){
            console.log('adding listener')
            document.addEventListener('visibilitychange', onClose, {once: true})
        }
        if (innerText == 'Search' || placeHolder == 'Search') {
            actionData.push({type, value})
        }
    }, 750);
}

document.addEventListener('input', logInput)
document.addEventListener('click', logClick)