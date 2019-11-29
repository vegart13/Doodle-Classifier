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

const APPLE = 0;
const BEE = 1;
const CLOCK = 2;
const FROG = 3;
const MONA = 4;

let NN; //Neural Network by Daniel Shiffman May the Gods bless this man

const len = 784;
const total_data = 1000;


function preload(){
  apples = loadBytes('Processing/apple1000.bin');
  bees = loadBytes('Processing/bees1000.bin');
  clocks = loadBytes('Processing/clock1000.bin');
  frogs = loadBytes('Processing/frog1000.bin');
  mona = loadBytes('Processing/mona1000.bin');
}


/* function viewImages(){
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
} */

function setup() {
createCanvas(280,280);
background(255);
//viewImages();

prepareData(apples_object,apples, APPLE);
prepareData(frogs_object,frogs, FROG);
prepareData(clocks_object, clocks, CLOCK);
prepareData(mona_object,mona, MONA);
prepareData(bees_object,bees, BEE);
NN = new NeuralNetwork(784, 64, 5);//784 inputs, 64 hidden nodes, and 5 outputs, 1 output for each category

//Train to learn about category
let trainingArray = [];
trainingArray = trainingArray.concat(mona_object.training);
trainingArray = trainingArray.concat(bees_object.training);
trainingArray = trainingArray.concat(clocks_object.training);
trainingArray = trainingArray.concat(frogs_object.training);
trainingArray = trainingArray.concat(apples_object.training);

shuffle(trainingArray,true);
//console.log(trainingArray);
//Train for one epoch
for (let i = 0; i < trainingArray.length;i++){
  let inputs = [];
  let data = trainingArray[i];
  
  for(let j = 0; j< data.length;j++){
    inputs[j] = data[j] / 255.0; //Normalize Data
  }
  let label = trainingArray[i].label;
  let targets = [0,0,0,0,0];
  targets[label] = 1;
  NN.train(inputs,targets);
  
}
}

function prepareData(category, data, label){
  category.training = [];
  category.testing = [];

  for(let i = 0; i<total_data;i++){
    let offset = i * len;
    let threshold = floor(0.8 * total_data);
    if(i < threshold){
      category.training[i] = data.bytes.subarray(offset, offset + len);
      category.training[i].label = label;
    } else {
      category.testing[i-threshold] = data.bytes.subarray(offset, offset +len);
      category.testing[i-threshold].label = label;

    }
  }
}
