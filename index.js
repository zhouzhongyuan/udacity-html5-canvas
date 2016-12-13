var c = document.getElementById('c');
var ctx = c.getContext("2d");









function textChangeListener (evt) {
    var id = evt.target.id;
    var text = evt.target.value;

    if (id == "topLineText") {
        window.topLineText = text;
    } else {
        window.bottomLineText = text;
    }

    redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
    // Get Canvas2DContext
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext("2d");
    // Your code here
    ctx.drawImage(image, 0, 0, c.width, c.height)

    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white"
    ctx.fillText(topLine, c.width / 2, 40)
    ctx.fillText(bottomLine, c.width / 2, c.height - 40)

    ctx.strokeStyle = "black"
    ctx.lineWidth = 3;
    ctx.strokeText(topLine, c.width / 2, 50)
    ctx.strokeText(bottomLine, c.width / 2,  c.height - 40)
}
function saveFile() {
    window.open(document.querySelector('canvas').toDataURL());
}


function handleFileSelect(evt) {
    var canvasWidth = 500;
    var canvasHeight = 500;
    var file = evt.target.files[0];



    var reader = new FileReader();
    reader.onload = function(fileObject) {
        var data = fileObject.target.result;

        // Create an image object
        var image = new Image();
        image.onload = function() {

            window.imageSrc = this;
            redrawMeme(window.imageSrc, null, null);

        }

        // Set image data to background image.
        image.src = data;
        console.log(fileObject.target.result);
    };
    reader.readAsDataURL(file)
}

window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById('topLineText');
var input2 = document.getElementById('bottomLineText');
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.querySelector('button').addEventListener('click', saveFile, false);

