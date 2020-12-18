var data = {}

const contentWidth = [...document.body.children].reduce( 
    (a, el) => Math.max(a, el.getBoundingClientRect().right), 0) 
    - document.body.getBoundingClientRect().x

const pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}
const time = Date().toLocaleString()
var scrollCount = 0

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
    console.dir(e)
}

function logScroll(e){
    scrollCount += 1
    if (scrollCount % 5 == 0){
        console.log(e)
    }
}

function logKeyPress(e) {
    console.log(e)
} //better off logging input instead ?

document.addEventListener('click', logClick);
document.addEventListener('keypress', logKeyPress)
window.addEventListener('scroll', logScroll)