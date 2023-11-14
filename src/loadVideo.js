let canvas = document.getElementById("canvasElement")
let ctx = canvas.getContext("2d")
let but = document.getElementById("but");
let videoElement = document.getElementById("vid");
let mediaDevices = navigator.mediaDevices;
vid.muted = true;
let fps = 60
document.addEventListener("DOMContentLoaded", () => {
    but.addEventListener("click", () => {

        // Accessing the user camera and video.
        mediaDevices
            .getUserMedia({
                video: true,
                audio: false, //maybe add an implementation for this? user claps and the feed changes?, could be really cool
            })
            .then((stream) => {

                // Changing the source of video to current stream.
                videoElement.srcObject = stream;
                videoElement.addEventListener("loadedmetadata", () => {
                    videoElement.play();
                canvas.height = stream.getTracks()[0].getSettings().height
                canvas.width = stream.getTracks()[0].getSettings().width
                activateCamera()
                });
            })
            .catch(alert);
    });
});

function drawImage(dat) {
    ctx.drawImage(dat, 0, 0, canvas.width, canvas.height);
}

function activateCamera()
{
canvasInterval = window.setInterval(() => {
    drawImage(videoElement);
}, 1000 / fps);
}
