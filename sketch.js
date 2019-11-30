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





function trainEpoch(trainingArray){
//Train to learn about category
shuffle(trainingArray,true);
//console.log(trainingArray);
//Train for one epoch
for (let i = 0; i < trainingArray.length;i++){
  let data = trainingArray[i];
  let inputs = Array.from(data).map(x => x/255);
  let label = trainingArray[i].label;
  let targets = [0,0,0,0,0];
  targets[label] = 1;
  NN.train(inputs,targets);
  
}
}


function setup() {
createCanvas(280,280);
background(0);
//viewImages();
let guessButton = select('#guess');
guessButton.mousePressed(function() {
  let inputs = [];
  let img = get();
  img.resize(28,28);
  img.loadPixels();
  for(let i = 0; i < len; i++){
    
    let bright = img.pixels[i];
    inputs[i] = bright / 255.0;
  }
  //console.log(inputs);

  let guess = NN.predict(inputs);
  let m = max(guess);
  let classification = guess.indexOf(m);

  if(classification === APPLE) {
    console.log("apple");
  }else if(classification === MONA) {
    console.log("Mona");
  }else if(classification === BEE) {
    console.log("Bee");
  }else if(classification === FROG) {
    console.log("Frog");
  }else if(classification === CLOCK) {
    console.log("Clock");
  }

});
let clearButton = select('#clear');
clearButton.mousePressed(function(){
  background(0);
})
//Prepares data for Neural Network, giving all values a label
prepareData(apples_object,apples, APPLE);
prepareData(frogs_object,frogs, FROG);
prepareData(clocks_object, clocks, CLOCK);
prepareData(mona_object,mona, MONA);
prepareData(bees_object,bees, BEE);


NN = new NeuralNetwork(784, 64, 5);//784 inputs, 64 hidden nodes, and 5 outputs, 1 output for each category
let trainingArray = [];
trainingArray = trainingArray.concat(mona_object.training);
trainingArray = trainingArray.concat(bees_object.training);
trainingArray = trainingArray.concat(clocks_object.training);
trainingArray = trainingArray.concat(frogs_object.training);
trainingArray = trainingArray.concat(apples_object.training);

let testingArray = [];
testingArray = testingArray.concat(bees_object.testing);
testingArray = testingArray.concat(mona_object.testing);
testingArray = testingArray.concat(clocks_object.testing);
testingArray = testingArray.concat(frogs_object.testing);
testingArray = testingArray.concat(apples_object.testing);
//console.log(testingArray.length);

//Trains NN
for (let i = 0;i < 5; i++){
trainEpoch(trainingArray);
console.log("Epochs trained:" + (i+1));
testAll(testingArray);
}
}

//Testing data
function testAll(testingArray){
  let correct = 0;

  for (let i = 0; i < testingArray.length;i++){
  
    let data = testingArray[i];
    let inputs = Array.from(data).map(x => x/255);
    let label = testingArray[i].label;
    let guess = NN.predict(inputs);
   // console.log(guess);
    let m = max(guess);
    let classification = guess.indexOf(m);
    //console.log(classification);
    //console.log(label);
    if ( classification === label){
      correct++;
    }



  }
  let percetage = correct / testingArray.length;
console.log("% Correct:"+percetage);
}

//Preparing data
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
function draw(){
  strokeWeight(8);
  stroke(255);
  if(mouseIsPressed){
  line(pmouseX,pmouseY,mouseX,mouseY);
}
}

