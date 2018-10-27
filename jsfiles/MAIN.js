//global variables

var mapbig = false;

var start = true;

//creating the Map
//##############################
//the number of islands (random)
var islandcount = 385;


//the aray of all the islands
var allislands = [];
//#############################
//var for border
var borderx = 0;
var bordery = 0;
var atborder = false;
var moveaway = 0;

//shooting
//is the player shooting
var shooting = false;
var shots = [];



//setup

// the var map is there to check if the player wants the big canvas or the normal (fight) canvas
function setup() {
    //text size
    textSize(50);
    textAlign(CENTER);

    //angles are measured in degrees
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
        startisland = new Island(width/2-250,height/2-100,0);
        allislands.push(startisland);


        //creating all the enemy islands
        //starting coordinates
        let x = -9250;
        let y = 0;
        //randomly generate islands

        let h = 0;
        let lasty = 0;
        let lastx = 0;
        for(let z=0;z<islandcount; z++) {

            if(x<10000 && y<10000) {
                h++;
                x +=100;

                lastx = x;
                lasty = y;

                let random = Math.floor(Math.random() * 2) + 1;

               let shape = Math.floor(Math.random() * 5) + 1;

               if (random === 1) {
                   lasty += Math.floor(Math.random() * 10000) + 1;

                }
                else if(random === 2) {
                    lasty -= Math.floor(Math.random() * 10000) + 1;

                }
                I = new Island(lastx, lasty,shape);
                allislands.push(I);
            }
        }
        console.log(h);



        //it is no longer the start of the game
        start=false;

    }
    if(map===true) {
        background('white');

    }else{
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
        //show shots
        if(shots.lenght>0){
            let index = 0;
            for(let i = 0;i<shots.length;i++){
                shots[index].show();
            }
        }

        //show speed text
        text("SPEED: "+Math.round(Ship.speed * 100) / 100 , 200, 50);
        fill('black');
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
    //creating an angle var with Ship.Rotate (+90 because that radians think of the bottom of the screen as 90 degrees
    //Ship.Rotate starts at 0
    let angle = Ship.Rotate+90;
    //checking position

    //if the player hits the boarders => flip over 180  degrees
    if(atborder===false) {
        if (10000 <= borderx || -10000 >= borderx) {

            Ship.Rotate += 180;
            atborder = true;

        }else if (10000 <= bordery || -10000 >= bordery) {

            Ship.Rotate += 180;
            atborder = true;


        }
    }
    //to prevent the player to constantly flipping by 180 degrees 5 frame break
    if(atborder===true) {
        moveaway++;
    }
    if(moveaway===5){
        atborder=false;
        moveaway = 0;
    }

    //############################################### MOVE #############################################################


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
    //-----------
    //move the boarders
    borderx += Math.cos(angle * (Math.PI / 180)) * Ship.speed;
    bordery += Math.sin(angle * (Math.PI / 180)) * Ship.speed;

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
    //look for shooting
    if(key==='e' || key==='E'){
        shot = new Shot(Ship.x,Ship,y);
        shooting = true;
        shots.push(shot);
    }


}



