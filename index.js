var time = Date().toLocaleString()
var shop = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.shopId
var visitor = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.uniqToken
var contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x
var pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}

// window.onload = function () {
//     shop = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.shopId
//     visitor = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.uniqToken
//     console.log(shop, visitor)
// }
console.log(time, pageDims, shop, visitor)

var scrollCount = 0
var isScrolling;

var data = {}

function confirmExit(){}

function logClick(e) {
    const type = e.type
    const coords = { x: e.x, y: e.y }
    const name = e.target.localName
    const innerText = e.target.innerText
    const navLink = e.target.href
    const spanWrapper = e.path[1].localName
    const spanLink = e.path[1].href
    
    console.log(type, coords, name, innerText, navLink, spanWrapper, spanLink, time)
    console.dir(window)
}

function logScroll(e){
    const type = e.type
    window.clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
        scrollCount += 1
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        console.log(type, scrollTop, scrollCount)
    }, 500);
}

function logInput(e) {
    console.log('is typing')
}

document.addEventListener('input', logInput)
document.addEventListener('click', logClick);
window.addEventListener('scroll', logScroll)