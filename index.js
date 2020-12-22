//const shop = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.shopId
//const visitor = window.ShopifyAnalytics.lib.trekkie.defaultAttributes.uniqToken
const time = Date().toLocaleString()

const contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x
const pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}

//console.log(shop, visitor, time, pageDims)
console.log(window.ShopifyAnalytics)

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
    }, 1000);
}

function logKeyPress(e) {
    console.log(e)
    e.addEventListener('input', function logInput(e) {
        const input = e.target.value
        console.log(input)
    })
} //better off logging input instead ?

document.addEventListener('click', logClick);
document.addEventListener('keypress', logKeyPress)
window.addEventListener('scroll', logScroll)