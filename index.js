
var data = {
    'form': 'Form - Alternate',
    'date' : Date().toLocaleString(),
    'Entered email': 'Entered email - false',
    'Entered name': 'Entered name - false',
    'Job title': 'Job title - false',
    'Service name': 'Service name - false',
    'Address': 'Address - false',
    'Post code': 'Post code - false',
    'Selected care type': 'Selected care type - false',
    'Selected care group status': 'Selected care group status - false',
    'Selected interest in devices': 'Selected interest in devices - false',
    'Selected interest in account setup': 'Selected interest in account setup - false',
    'Accepted terms and conditions': 'Accepted terms and conditions - false',
    'Selected marketing preference':'Selected marketing preference - false'
}
var submitComplete = false
var entryCount = 0
var finishedForm = false
var eventCount = 0

function confirmExit(){
if (!finishedForm){
    // fetch('https://hooks.zapier.com/hooks/catch/8680204/ogihvar/', {
    // method:"POST",
    // body: JSON.stringify(data)
    // })
    // .then(result => {
    // console.log("Completed with result:", result);
    // });
    return "Leaving so soon? Changes that you made may not be saved.";
}
}

function captureData(e, action) {
entryCount = 0
console.log(e, action)
e.addEventListener("input", function logKey(event) {
    const value = event.explicitOriginalTarget ? event.explicitOriginalTarget.value : event.path[0].value
    if (action == 'Service name'){
    if (eventCount == 0) {
        window.onbeforeunload = confirmExit;
        eventCount += 1
        }
    }
    if (action == 'Job title' || action == 'Service name' || action == 'Address' || action == 'Post code'){
    data[action] = `${action} - ${value}` 
    } else {
    if (entryCount == 0) {
        data[action] = `${action} - true`
        entryCount += 1
    }
    }
    });
}

function logClick(e) {
var element = e.explicitOriginalTarget ? e.explicitOriginalTarget.id == '' ? e.explicitOriginalTarget.parentElement : 			e.explicitOriginalTarget : e.path[0]
    //console.log(element.id)
switch (element.id) {
    case 'nf-field-138':
    captureData(element, 'Entered email')
    break;
    case 'nf-field-139':
    captureData(element, 'Entered name' )
    break;
    case 'nf-field-140':
    captureData(element, 'Job title')
    break;
    case 'nf-field-141':
    captureData(element, 'Service name')
    break;
    case 'nf-field-142':
    captureData(element, 'Address')
    break;
    case 'nf-field-143':
    captureData(element, 'Post code')
    break;
    case 'nf-field-144':
    captureData(element, 'Selected care type')
    break;
    case 'nf-field-151-0':
    captureData(element, 'Selected care group status')
    break;
    case 'nf-field-151-1':
    captureData(element, 'Selected care group status')
    break;
    case 'nf-label-class-field-151-0':
    captureData(element, 'Selected care group status')
    break;
    case 'nf-label-class-field-151-1':
    captureData(element, 'Selected care group status')
    break;
    case 'nf-field-147-0':
    captureData(element, 'Selected interest in devices')
    break;
    case 'nf-field-147-1':
    captureData(element, 'Selected interest in devices')
    break;
    case 'nf-label-class-field-147-0':
    captureData(element, 'Selected interest in devices')
    break;
    case 'nf-label-class-field-147-1':
    captureData(element, 'Selected interest in devices')
    break;
    case 'nf-field-155-0':
    captureData(element, 'Selected interest in account setup')
    break;
    case 'nf-field-155-1':
    captureData(element, 'Selected interest in account setup')
    break;
    case 'nf-label-class-field-155-0':
    captureData(element, 'Selected interest in account setup')
    break;
    case 'nf-label-class-field-155-1':
    captureData(element, 'Selected interest in account setup')
    break;
    case 'nf-field-148-0':
    finishedForm = true
    captureData(element, 'Accepted terms and conditions')
    break;
    case 'nf-label-field-148-0':
    finishedForm = true
    captureData(element, 'Accepted terms and conditions')
    break;
    case 'nf-field-154-0':
    captureData(element, 'Selected marketing preference')
    break;
    case 'nf-label-field-154-0':
    captureData(element, 'Selected marketing preference')
    break;
    default:
    //console.log(element)
    break;
}
}
document.addEventListener('click', logClick);