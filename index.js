var data = {}

const contentWidth = [...document.body.children].reduce( 
    (a, el) => Math.max(a, el.getBoundingClientRect().right), 0) 
    - document.body.getBoundingClientRect().x

const pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}
const time = Date().toLocaleString()
var scrollCount = 0
var isScrolling;

function confirmExit(){}

function logClick(e) {
    const type = e.type
    const coords = { x: e.x, y: e.y }
    const name = e.target.localName
    const innerText = e.target.innerText
    const navLink = e.target.href
    const spanWrapper = e.path[1].localName
    const spanLink = e.path[1].href
    
    console.log(type, coords, pageDims, name, innerText, navLink, time, spanWrapper, spanLink)
    console.dir(window)
}

function logScroll(e){
    window.clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
        scrollCount += 1
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        console.log('scrolled', scrollTop, scrollCount)
    }, 66);
}

function logKeyPress(e) {
    console.log(e)
} //better off logging input instead ?

document.addEventListener('click', logClick);
document.addEventListener('keypress', logKeyPress)
window.addEventListener('scroll', logScroll)