let apples;
let bees;
let clocks;
let frogs;
let mona;


function preload(){
  apples = loadBytes('Processing/apple1000.bin');
  bees = loadBytes('Processing/bees1000.bin');
  clocks = loadBytes('Processing/clock1000.bin');
  frogs = loadBytes('Processing/frog1000.bin');
  mona = loadBytes('Processing/mona1000.bin');
}

function setup() {
createCanvas(280,280);
background(0);

  let total 100;
  for (let n = 0; n < total; n++){
    let img = createImage(28,28);
    img.loadPixels();
    let offset = n * 784;
    for(let i = 0; i < 784; i++){
      let val = 255 - clocks.bytes[i + offset];
      img.pixels[i*4] = val;
      img.pixels[i*4+1] = val;
      img.pixels[i*4+2] = val;
      img.pixels[i*4+3] = 255;

    }
    img.updatePixels();
    let x = (n%10) * 28;
    let y = floor(n/10) * 28;
    image(img,x,y);
  }
}
function draw(){

}
