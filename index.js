var data = {}

function confirmExit(){}

function captureData(e) {}

function logClick(e) {
    const name = e.path[0].localName
    const innerText = e.path[0].innerText
    console.log(name, innerText)
    console.dir(e)
}
document.addEventListener('click', logClick);

/* 
click events to take note of:
e.type
e.path[0].localName
e.path[0].innerText || placeholder
*/