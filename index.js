var entryTime = Date().toLocaleString()
var shop = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.shopId
var visitor = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.uniqToken
var contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x
var pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}

//a3d0a333-68c0-449a-807c-faceeafe1d90

//console.log(entryTime, pageDims, shop, visitor)

var scrollCount = 0
var isScrolling;
var isTyping;

var actionData = []

function onUnload(e){
    const exitTime = Date().toLocaleString()
    //console.log('unloading', exitTime)

    const data = {
        entryTime,
        shop,
        visitor,
        pageDims,
        actionData,
        exitTime
    }

    console.log(JSON.stringify(data))

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