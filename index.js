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
    var data=ctx.createImageData(1,1);
        data.data[0]=0;
        data.data[1]=255;
        data.data[2]=0;
        data.data[3]=255;
    console.log(data)
    for(var i = 1; i < 50; i++){
        for(var j = 1; j < 50; j++){
            ctx.putImageData(data,10*i, 10*j);
        }
    }

    // grayscale

    var imageData = ctx.getImageData(0, 0, c.width, c.height);
    var data = imageData.data;
    for(var i  = 0; i < data.length; i+=4){
        var avg = (data[i] + data[i+1] + data[i+2])/3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    console.log(data);
    ctx.putImageData(imageData,0,0)



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

