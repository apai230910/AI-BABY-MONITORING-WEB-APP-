alarm = "";

object_status = "";

objects = [];

function preload() {

 alarm = loadSound("alarm.mp3");

}

function setup() {

 alarm.loop();

 canvas = createCanvas( 380 , 380 );

 canvas.center();

 video = createCapture(VIDEO);

 video.size( 380 , 380 );

 video.hide();

 objectDetector = ml5.objectDetector( "cocossd" , modalLoaded); 

}

function modalLoaded() {

 console.log("Modal Loaded");

 object_status = true;

}

function gotResult( error, results) {

 if(error) {

  console.error(error)
  
 } else {

  console.log(results);

  objects = results;

 }

}

function draw() {

 image( video , 0 ,0 , 640 , 420 );

 if(object_status != "") {

  r = random(255);

  g = random(255);

  b = random(255);

  objectDetector.detect( video , gotResult);

  for( i = 0 ; i < objects.length ; i++) {

   fill( r , g , b );

   percent = floor(objects[i].confidence * 100);

   text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);

   noFill();

   stroke( r , g , b );

   rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);

   if(objects[i].label == "person") {

    document.getElementById("baby_status").innerHTML = "Baby Found";

    alrm.pause();

   } else {

    document.getElementById("baby_status").innerHTML = "Baby Not Found";

    alarm.play();

   }

  }
  
 }
 
}