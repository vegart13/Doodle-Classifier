let apples;
let bees;
let clocks;
let frogs;
let mona;

let apples_object = {};
let bees_object = {};
let clocks_object = {};
let frogs_object = {};
let mona_object = {};


const len = 784;
const total_data = 1000;


function preload(){
  apples = loadBytes('Processing/apple1000.bin');
  bees = loadBytes('Processing/bees1000.bin');
  clocks = loadBytes('Processing/clock1000.bin');
  frogs = loadBytes('Processing/frog1000.bin');
  mona = loadBytes('Processing/mona1000.bin');
}


function viewImages(){
  let total = 100;
  for (let n = 0; n < total; n++){
    let img = createImage(28,28);
    img.loadPixels();
    let offset = n * len;
    for(let i = 0; i < len; i++){
      let val = 255 - apples.bytes[i + offset];
      //Flere fordi farger
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

function setup() {
createCanvas(280,280);
background(0);
viewImages();

prepareData(apples_object,apples);
prepareData(frogs_object,frogs);
prepareData(clocks_object, clocks);
prepareData(mona_object,mona);
prepareData(bees_object,bees);

}

function prepareData(category, data){
  category.training = [];
  category.testing = [];

  for(let i = 0; i<total_data;i++){
    let offset = i * len;
    let threshold = floor(0.8 * total_data);
    if(i < threshold){
      category.training[i] = data.bytes.subarray(offset, offset + len);
    } else {
      category.testing[i-threshold] = data.bytes.subarray(offset, offset +len);
    }
  }
}
