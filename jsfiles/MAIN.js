//global variables

var mapbig = false;

var start = true;

//creating the Map





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
        //change the direction of the wind
        Wind.change();
        //redraw the background to get rid of old images
        background('blue');
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



