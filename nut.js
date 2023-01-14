var xhttp = new XMLHttpRequest();
xhttp.open("POST", "https://405f-2600-1700-36b0-21b0-4520-ccb4-7c4c-98fb.ngrok.io/message", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify({message: "Hello from external website!"}));

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

// Create an image element containing the spritesheet
var img = new Image();
img.src = 'spritesheet.png';
img.onload = function() {
  ctx.drawImage(img, 0, 0, 32, 32, 0, 0, 32, 32);
}
