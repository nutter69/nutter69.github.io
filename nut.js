function ctod(card)
{
    switch (card.charAt(0)) {
        case 'c':
            return [(Number(card.substring(1,3)-1))*80 + 1,1,79,109];
            break;
        case 'd':
            return [(Number(card.substring(1,3)-1))*80 + 1,111,79,109];
            break;
        case 'h':
            return [(Number(card.substring(1,3)-1))*80 + 1,221,79,109];
            break;
        case 's':
            return [(Number(card.substring(1,3)-1))*80 + 1,331,79,109];
            break;
    }
}
function randc()
{
    let a = Math.round( Math.random() * 4);
    switch (a%4) {
        case 0: return "c" + (Math.round(Math.random()*13)).toString();
        break;
        case 1: return "d" + (Math.round(Math.random()*13)).toString();
        break;
        case 2: return "h" + (Math.round(Math.random()*13)).toString();
        break;
        case 3: return "s" + (Math.round(Math.random()*13)).toString();
        break;
    }
}
var xhttp = new XMLHttpRequest();
const cardg = document.getElementById("cardg");
// Create a canvas element
var canvas = document.getElementById('cards');
var ctx = canvas.getContext('2d');
// Create an image element containing the spritesheet
cardg.addEventListener('click',()=>{
    let ew = randc();
xhttp.open("POST", "https://405f-2600-1700-36b0-21b0-4520-ccb4-7c4c-98fb.ngrok.io/message", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify({message: ew}));
    let card = ctod(ew);
    var img = new Image(1041,691);
    img.src = "deck.png";
    img.onload = function() {
      canvas.width = 420;
      canvas.height = 420;
      ctx.drawImage(img,card[0],card[1],card[2],card[3],0,0,138.2,208.2)
    }   
});
