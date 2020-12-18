var data = {}

const contentWidth = [...document.body.children].reduce( 
    (a, el) => Math.max(a, el.getBoundingClientRect().right), 0) 
    - document.body.getBoundingClientRect().x

const pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}
const time = Date().toLocaleString()
var timeScrolled = 0

function confirmExit(){}

function logClick(e) {
    const type = e.type
    const coords = { x: e.x, y: e.y }
    const name = e.target.localName
    const innerText = e.target.innerText
    const navLink = e.target.href
    const spanWrapper = e.path[1].localName
    const spanLink = e.path[1].href
    
    console.log(type, coords, pageDims, name, innerText, navLink, entryTime, spanWrapper, spanLink)
    console.dir(e)
}

function logScroll(e){
    timeScrolled += 1
    console.log(timeScrolled)
}

function logInput(e) {
    console.log(e)
}

document.addEventListener('click', logClick);
document.addEventListener('keypress', logInput)
window.addEventListener('scroll', logScroll)

/* 
click events to take note of:
e.type
e.path[0].localName
e.path[0].innerText || placeholder
*/