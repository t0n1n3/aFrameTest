
var videoElement = document.querySelector('video');

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
}

function handleError(error) {
    console.error('Error: ', error);
}