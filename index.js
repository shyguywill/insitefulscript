var data = {}

const contentWidth = [...document.body.children].reduce( 
    (a, el) => Math.max(a, el.getBoundingClientRect().right), 0) 
    - document.body.getBoundingClientRect().x

const pageDims = {height: document.body.scrollHeight, width: Math.min(document.body.scrollWidth, contentWidth)}
const entryTime = Date().toLocaleString()

function confirmExit(){}

function captureData(e) {}

function logClick(e) {
    const type = e.type
    const coords = { x: e.x, y: e.y }
    const name = e.target.localName
    const innerText = e.target.innerText
    const navigated = e.target.href
    
    console.log(type, coords, pageDims, name, innerText, navigated, entryTime)
    console.dir(e)
}
function logScroll(e){
    console.log(e)
}

document.addEventListener('click', logClick);
window.addEventListener('scroll', logScroll)

/* 
click events to take note of:
e.type
e.path[0].localName
e.path[0].innerText || placeholder
*/