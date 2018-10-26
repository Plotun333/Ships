//global variables

var mapbig = false;

var start = true;

//creating the Map
//##############################
//the number of islands (random)
const islandcount = 0;
//the aray of all the islands
var allislands = [];
const borderx = 10000;
const bordery = 10000;

//#############################



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
        for(let x=0;x<islandcount; x++){
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
        for(let i=0;i<allislands.length;i++){
            allislands[i].show();

        }

        if(Ship.paddling) {
            //paddle
            Ship.paddle();
        }else if(Ship.anchoring){
            Ship.anchor();

        }else{
            //move the player according to the wind
            Ship.movefront(Wind.dir);
        }
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

    //############################################### MOVE #############################################################
    //creating an angle var with Ship.Rotate (+90 because that radians think of the bottom of the screen as 90 degrees
    //Ship.Rotate starts at 0
    let angle = Ship.Rotate+90;

    //going throw all of the islands ADD(and ships)
    let index = 0;
    for(let i = 0;i<allislands.length;i++) {

        //converting angles to radians then getting the cos of these newly created radians (times the speed)
        //the same with y but except cos => sin
        //by this process we basically get the x and y of a degree
        allislands[index].x += Math.cos(angle * (Math.PI / 180)) * Ship.speed;
        allislands[index].y += Math.sin(angle * (Math.PI / 180)) * Ship.speed;

        index++;
    }
    //#################################################################################################################
}
//un release
function keyReleased(){
    if(key==='w' || key==='W'){
        Ship.paddling = false;
    }
    if(key==='s' || key==='S'){
        Ship.anchoring = false;
    }
}
//un press
function keyPressed() {
    //checking for the big map request
    if(key==='m'|| key==='M' && mapbig===false){
        //this is the big map of the player screen
        mapbig = true;
        //reset canvas
        setup();
    }
    if(key==='n'|| key==='N' && mapbig===true){
        //this is the big map of the player screen
        mapbig = false;
        setup();
    }
    if(key==='d'|| key==='D'){
        //rotate the ship counterclockwise
        Ship.move1();
    }
    if(key==='a'|| key==='A'){
        //rotate the ship clockwise
        Ship.move2();
    }
    if(key==='w' || key==='W'){
        //start paddling
        Ship.paddling = true;
    }
    if(key==='s' || key==='S'){
        //start anchoring
        Ship.anchoring = true;
    }


}



