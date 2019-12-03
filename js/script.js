
var videoElement = document.querySelector('video');
var aScene = document.querySelector('a-scene');

getStream().then(getDevices).then(gotDevices);
function getDevices() {
    // AFAICT in Safari this only gets default devices until gUM is called :/
    return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
    window.deviceInfos = deviceInfos; // make available to console
    console.log('Available input and output devices:', deviceInfos);
}

function getStream() {
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    const constraints = {
        audio: false,
        video: {
            facingMode: 'environment'
        }
    };
    return navigator.mediaDevices.getUserMedia(constraints).
        then(gotStream).catch(handleError);
}

function gotStream(stream) {
    videoElement.srcObject = stream;
    document.getElementById('ground').setAttribute('src', '#ground');
    addClickEvent();
}

function handleError(error) {
    console.error('Error: ', error);
}

function addClickEvent() {
    aScene.addEventListener('click', (event) => {
        console.log(event);
        var box = document.createElement('a-box');
        box.setAttribute('position', '-1 0.5 -3');
        box.setAttribute('rotation', '0 45 0');
        box.setAttribute('color', '#4CC3D9');
    });
}
