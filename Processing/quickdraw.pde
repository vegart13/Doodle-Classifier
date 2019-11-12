byte[] data = loadBytes("data/mona.npy");
size(280,280);

//println(data.length);
//int total = (data.length - 80) / 784;
//println(total);

int totalImages = 1000;
byte[] outdata = new byte[totalImages*784]; //Save images
int outindex =0; //counter for image saving

for (int n= 0; n < totalImages; n++) {
  
int start = 80 + n * 784; // there is 80 bytes at the beginning that describe the data, these are skipped
PImage img = createImage(28,28,RGB);
img.loadPixels();
for (int i = 0; i < 784; i++){
  int index = i + start;
  byte val = data[index];
  outdata[outindex] = val;
  outindex++;
  img.pixels[i] = color(255 - val & 0xff); //Draws the image, color(); is -255 to set the drawings black and background white
}
img.updatePixels();
int x = 28 * (n %10);
int y = 28 *  (n / 10);
image(img,x,y);
}
saveBytes("mona1000.bin",outdata);
