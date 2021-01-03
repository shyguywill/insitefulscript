//Created by Sayo Williams 29/12/2020
let date = new Date()
date.setDate(date.getDate())
var entryTime = date.toLocaleString()
var shop = window.Shopify?.shop
var visitor = window.ShopifyAnalytics?.lib.trekkie.defaultAttributes?.uniqToken
var contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x
var pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}

var scrollCount = 0
var isScrolling;
var isTyping;

var actionData = []

function onUnload(){
    let date = new Date()
    date.setDate(date.getDate())
    const exitTime = date.toLocaleString()

    const data = {
        entryTime,
        shop,
        visitor,
        pageDims,
        actionData,
        exitTime
    }

    if (actionData.length && shop && visitor){
        console.log(JSON.stringify(data))
        // hook here
        fetch('http://localhost:5000/', {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
        })
        .then(result => {
        console.log("Completed with result:", result);
        });
    }
}

function logClick(e) {
    const type = e.type
    const clickPosition = { x: e.x, y: e.y }
    const name = e.target.localName
    const innerText = e.target.innerText
    const navLink = e.target.href
    const spanWrapper = e.path[1].localName
    const spanLink = e.path[1].href
    
    //console.log(type, clickPosition, name, innerText, navLink, spanWrapper, spanLink)
    actionData.push({type, clickPosition, name, innerText, navLink, spanWrapper, spanLink})
}

function logScroll(e){
    const type = e.type
    window.clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
        scrollCount += 1
        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
        //console.log(type, scrollTop, scrollCount)
        actionData.push({type, scrollTop, scrollCount})
    }, 1000);
}

function logInput(e) {
    const type = e.type
    const action = e.inputType
    const name = e.target.localName
    const innerText = e.target.ariaLabel
    
    window.clearTimeout( isTyping );
	isTyping = setTimeout(function() {
        actionData.push({type, action, name, innerText})
    }, 750);
}

document.addEventListener('input', logInput)
document.addEventListener('click', logClick)
window.addEventListener('scroll', logScroll)
window.addEventListener('beforeunload', onUnload)