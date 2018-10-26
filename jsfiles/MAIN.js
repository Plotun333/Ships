//global variables

var mapbig = false;

var start = true;

//creating the Map
//the number of islands (random)
const islandcount = 0;
//the aray of all the islands
var allislands = [];




//setup

// the var map is there to check if the player wants the big canvas or the normal (fight) canvas
function setup() {
    angleMode(DEGREES);
    //Creating canvas
    createCanvas(1400, 700);
    //if game starts
    if(start===true){
        //init ship class
        //init Map class
        //init wind class
        Map = new Mission_map();
        Ship = new ship();
        Wind = new wind();

        //create all the islands



        //creating the starting island
        startisland = new Island(width/2-250,height/2-100);
        allislands.push(startisland);

        //creating all the enemy islands
        for(var x=0;x<islandcount; x++){
            //var x = random
            //var y = random
            //I = new island(x,y);
            //allislands.push(I);
        }

        //it is no longer the start of the game
        start=false;

    }
    if(map===true) {
        console.log("BIG");

        background('white');

    }else{
        console.log("SMALL");

        background('lightblue');
    }

}

//draw
function draw() {

    if(mapbig===false) {
        update();

        //change the direction of the wind
        Wind.change();
        //redraw the background to get rid of old images
        background('lightblue');
        //show the island
        for(var i=0;i<allislands.length;i++){
            allislands[i].show();

        }
        //move the player according to the wind
        Ship.movefront(Wind.dir);
        //show the player ship
        Ship.show();
        //show the compass
        Wind.compass();
    }
    if(mapbig===true){
        // if m is pressed than show the mission canvas
        Map.show();
    }

}
//update
function update() {
    var angle = Ship.Rotate+90;

    console.log(angle);


    //checking if Ships Angle (Rotate) is in between 0 and 90 or 90 and 180 or 180 and 270 or 270 and 360
    //after the we move every island by 0,5 because the ship can only have an angle of 5,10,15,20...
    //in for cycle adding or subtracting 0,5 from x or y depending on if x between 0 and 90 or 90 and 180...
    allislands[0].x += Math.cos(angle * (Math.PI / 180)) * Ship.speed;
    allislands[0].y += Math.sin(angle * (Math.PI / 180)) * Ship.speed;
}
//un press
function keyPressed() {
    //checking for the big map request
    if(key==='m'||key==='M' && mapbig===false){
        //this is the big map of the player screen
        mapbig = true;
        //reset canvas
        setup();
    }
    if(key==='n'||key==='N' && mapbig===true){
        //this is the big map of the player screen
        mapbig = false;
        setup();
    }
    if(key==='d'|| key==='D'){
        //rotate the ship counterclockwise
        Ship.move1();
    }
    if(key==='a'||key==='A'){
        //rotate the ship clockwise
        Ship.move2();
    }

}



