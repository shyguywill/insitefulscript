
var data = {}
var submitComplete = false
var entryCount = 0
var finishedForm = false
var eventCount = 0

function confirmExit(){
    // fetch('https://hooks.zapier.com/hooks/catch/8680204/ogihvar/', {
    // method:"POST",
    // body: JSON.stringify(data)
    // })
    // .then(result => {
    // console.log("Completed with result:", result);
    // });
    return "Leaving so soon? Changes that you made may not be saved.";
}

function captureData(e) {
    // e.addEventListener("input", function logKey(event) {
    //     const value = event.explicitOriginalTarget ? event.explicitOriginalTarget.value : event.path[0].value
    //     console.log(value)
    //     window.onbeforeunload = confirmExit;
    // });
}

function logClick(e) {
    console.log(e)
    console.dir(e)
    console.log(JSON.stringify(e.target))
}

document.addEventListener('click', logClick);

/* 
click events to take note of:
e.type
e.path[0].localName
e.path[0].innerText || placeholder
*/