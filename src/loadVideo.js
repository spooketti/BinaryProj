let canvas = document.getElementById("canvasElement")
let ctx = canvas.getContext("2d", {willReadFrequently: true})
let gl = canvas.getContext("webgl")
let but = document.getElementById("but");
let videoElement = document.getElementById("vid");
let binText = document.getElementById("binText")
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
let bwEl = document.getElementById("bwText")

function drawImage(dat) {
    let BWString = ""
    let BinAsc = ""
    ctx.drawImage(dat, 0, 0, canvas.width, canvas.height);
    let webFeed = ctx.getImageData(0,0,canvas.width,canvas.height)
    let webFeedDat = webFeed.data
    //BWString = webFeedDat.toString()
    for(let i=0;i<webFeedDat.length;i+=4)
    {
        let avg = (webFeedDat[i] + webFeedDat[i+1] + webFeedDat[i+2])/3
        avg = avg < 128 ? 0 : 255
        let azTXT = avg < 128 ? 0 : 1
        webFeedDat[i] = avg
        webFeedDat[i+1] = avg
        webFeedDat[i+2] = avg
        webFeedDat[i+3] = 255
        BWString += azTXT
        
        //console.log(azTXT)
    }
    //BWString
    //console.log(webFeed)
    //ctx.drawImage(webFeed,0,0, canvas.width, canvas.height)
    ctx.putImageData(webFeed, 0, 0);
    bwEl.innerText = BWString
    let binString = BWString.match(/.{1,8}/g);
    binString = binString.join(" ")
    binString = String.fromCharCode(
        ...binString.split(' ').map(bin => parseInt(bin, 2))
      )
    //console.log(binString)
    binText.innerText = binString
}

function activateCamera()
{
canvasInterval = window.setInterval(() => {
    drawImage(videoElement);
}, 1000 / fps);
}
