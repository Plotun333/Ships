//global variables

var mapbig = false;

var start = true;

//creating the Map
//##############################
//the number of islands (random)
var islandcount = 385;
var islandshots = [];

//the aray of all the islands
var allislands = [];
var allcapturedislands = [];
//#############################
//var for border
var borderx = 0;
var bordery = 0;
var atborder = false;
var moveaway = 0;
//############################
//adding crew members
var crew = 30;
var shiphealth = 100;

//shooting
//is the player shooting
var shootingE = false;
var shootingQ = false;
var shots = [];
var shooting = false;
//when shooting the ship slows down
var speed = 0;
//61 to simulate about to second since the game is going at about 30fps
var shootingpause = 61;
var addtoshootingpause = false;

//score and coins
var score = 0;
var coins = 0;


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
        let index = 0;
        for(let i=0;i<allislands.length;i++){
            allislands[index].show();
            h = dist(allislands[index].x+150,allislands[index].y+150,Ship.x+100,Ship.y);
            if(h<150){
                shiphealth--;
                let r = Math.floor(Math.random() * 5) + 1;
                if(r===1){
                    crew--;
                }
                //don not move when on land
                Ship.speed = 0;
                //gemaover screen
                if(shiphealth<=0 || crew<=0) {
                    fill('black');
                    rect(0, 0, width, height);
                    fill('red');
                    textSize(100);
                    text('GAME OVER', width / 2, height / 2);
                    let skull = createImg("images/skull.gif");
                    skull.position(width / 2 - 50, height / 2 + 100);


                    Getout();
                }
            }
            index++;

        }
        //show captured islands
        let capturedislandindex = 0;
        for(let x = 0; x<allcapturedislands.length;x++){
            allcapturedislands[capturedislandindex].show();
            capturedislandindex++;
        }
        //show island shots
        let index2 = 0;
        for(let y=0;y<islandshots.length;y++){
            if(Ship.hit(islandshots[index2].x,islandshots[index2].y)){
                shiphealth--;
                let r = Math.floor(Math.random() * 5) + 1;
                if(r===1){
                    crew--;
                }
                islandshots[index2] = undefined;
                //remove from list
                islandshots.splice(index2,1);

                if(shiphealth<=0 || crew<=0){
                    fill('black');
                    rect(0,0,width,height);
                    fill('red');
                    textSize(100);
                    text('GAME OVER',width/2,height/2);
                    let skull = createImg("images/skull.gif");
                    skull.position(width/2-50,height/2+100);


                    Getout();
                }
                break;
            }
            //if the shot hits range
            if(islandshots[index2].destroy){
                islandshots[index2] = undefined;
                //remove from list
                islandshots.splice(index2,1);
                break
            }
            islandshots[index2].show();
            islandshots[index2].moveQ();
            //check if the shot hits the player
            index2++;
        }

        //show shots
        if(shots.length>0){
            let index = 0;
            for(let i = 0;i<shots.length;i++){
                shots[index].show();
                index++
            }
        }
        //show speed text
        //if the ship is ready to shoot it slows down
        if(shooting){
            fill('orange');
            text("SPEED: "+Math.round(speed * 100) / 100 , 200, 50);

        }else{
            fill('orange');
            text("SPEED: " + Math.round(Ship.speed * 100) / 100, 200, 50);

        }
        //show crew
        fill('black');
        text("CREW: "+ crew, 400, 50);
        //show ship health
        fill('red');
        text("SHIP HEALTH: "+ shiphealth, 600, 50);

        //show score
        fill('green');
        text("SCORE: "+ score, 800, 50);

        //show coins
        fill('yellow');
        text("COINS: "+ coins, 1000, 50);

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
    //checking if the ship close to a island if so then the castles from the island start firing at the shi
    let Index = 0;
    for(let i = 0;i < allislands.length;i++){
        //going throw all of the islands
        H = new HIT(allislands[Index].x,allislands[Index].y,Ship.x,Ship.y,400);
        if(H.collision){
            //the chance of a castle firing is 1 in 35
            let random = Math.floor(Math.random() * 35) + 1;
            if(random===1) {
                //generate a two random numbers for x and y for the shot
                var cord = [];
                //different cords for different islands


                if(allislands[Index].shape===1){
                    cord = [-35, 120, 15, 240,130, 150];
                }else if(allislands[Index].shape===2){
                    cord = [-35,240,130,100,80];
                }else if(allislands[Index].shape===3){
                    cord = [-35, 120];
                }else if(allislands[Index].shape===4){
                    cord = [-35, 120, 130, 150, 100, 80, 140, 150,];
                }else if(allislands[Index].shape===5){
                    cord = [15, 240, 130, 150, 100, 80, 140, 150,];
                }else {
                    cord = [-35, 120, 15, 240, 130, 150, 100, 80, 140, 150,];
                }
                let limit = cord.length;
                let random1= Math.floor(Math.random() *limit/2);
                random1*=2;

                let random2 = random1+1;



                //if the ship is in range of an island

                islandshot = new Shot(allislands[Index].x+cord[random1], allislands[Index].y+cord[random2], int(Math.round(180 / Math.PI * (Math.atan2(allislands[Index].y - Ship.y+100, allislands[Index].x - Ship.x)))));
                islandshot.range = -20;
                //push to all shots
                islandshots.push(islandshot)

            }
        }
        Index++;
    }
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
    //if the player ship has its canons out then slow down the ship by 0.25
    //creating a new var because if Ship -= 0.01 de acceleration
    if(Ship.speed>0.25 && shooting){
        speed =  Ship.speed - 0.25;
    }else{
        speed =  Ship.speed;
    }
    //resolving shooting pause
    if(shootingQ || shootingE){
        addtoshootingpause = true;
    }
    if(addtoshootingpause){
        shootingpause++;
    }
    //############################################### MOVE #############################################################
    //moving the shots
    let index = 0;
    for(let i = 0; i<shots.length;i++){
        if(shots[index].destroy){
            shots[index] = undefined;
            shootingE = false;
            shootingQ = false;
            shots.splice(index,1);
            break;
        }
        if(shootingE) {
            shots[index].moveE();
        }if (shootingQ) {
            shots[index].moveQ();
        }
        index++;
    }

    //going throw all of the islands ADD(and ships)
    index = 0;
    for(let i = 0;i<allislands.length;i++) {

        //converting angles to radians then getting the cos of these newly created radians (times the speed)
        //the same with y but except cos => sin
        //by this process we basically get the x and y of a degree
        allislands[index].x += Math.cos(angle * (Math.PI / 180)) * speed;
        allislands[index].y += Math.sin(angle * (Math.PI / 180)) * speed;

        index++;
    }
    index = 0;
    //move the captured islands
    for(let i = 0;i<allcapturedislands.length;i++) {

        //converting angles to radians then getting the cos of these newly created radians (times the speed)
        //the same with y but except cos => sin
        //by this process we basically get the x and y of a degree
        allcapturedislands[index].x += Math.cos(angle * (Math.PI / 180)) * speed;
        allcapturedislands[index].y += Math.sin(angle * (Math.PI / 180)) * speed;

        index++;
    }
    //-----------
    //move the boarders
    borderx += Math.cos(angle * (Math.PI / 180)) * speed;
    bordery += Math.sin(angle * (Math.PI / 180)) * speed;

    //##################################################################################################################
    //############################################### COLLISIONS #######################################################
    //going throw all of the shots and all of the islands in two for loops and checks for collisions
    let index2 = 0;
    for(let i = 0; i<allislands.length;i++){
        var index3 = 0;
        for (let x = 0;shots.length>x;x++){
            if(allislands[index2].hit(shots[index3].x,shots[index3].y)){
                allislands[index2].lives--;

                if(allislands[index2].lives<=0){
                    //changing the shape
                    //new captured islands have different shapes
                    if(allislands[index2].shape===0){
                        allislands[index2].islandshape = loadImage('images/island10.png');
                    }
                    else if(allislands[index2].shape===1){
                        allislands[index2].islandshape = loadImage('images/island20.png');
                    }else if(allislands[index2].shape===2){
                        allislands[index2].islandshape = loadImage('images/island30.png')
                    }else if(allislands[index2].shape===3){
                        allislands[index2].islandshape = loadImage('images/island40.png');
                    }else if(allislands[index2].shape===4){
                        allislands[index2].islandshape = loadImage('images/island50.png');
                    }else if(allislands[index2].shape===5){
                        allislands[index2].islandshape = loadImage('images/island60.png');
                    }
                    //add island to captured islands
                    allcapturedislands.push(allislands[index2]);
                    //add score
                    score+=10;
                    coins+=1000;
                    //delete destroyed island
                    allislands[index2] = undefined;
                    allislands.splice(index2,1);
                }
                break;
            }
            index3++;
        }
       index2++;
    }


}
//un release
function keyReleased(){
    if(key==='w' || key==='W'){
        Ship.paddling = false;
    }
    if(key==='s' || key==='S'){
        Ship.anchoring = false;
    }
    if(key==='e' || key==='E'){
        if(shootingE===false && shootingQ===false && shooting===true && shootingpause>60) {
            shootingpause = 0;
            addtoshootingpause = false;
            //we want to shot five canon balls at a time
            //and we want to shot once the canon balls that were shot before these cannon balls have exited there limit
            for(let x = 0; x<5;x++) {
                //resolving a rotation problem

                if(Ship.Rotate>=45 && Ship.Rotate<=135 || Ship.Rotate<=-45 && Ship.Rotate>=-135 || Ship.Rotate>=225 && Ship.Rotate<=315 || Ship.Rotate<=-225 && Ship.Rotate>=-315) {
                    SHOT = new Shot(Ship.x - 20 + x * 10, Ship.y, Ship.Rotate);
                    shots.push(SHOT);
                }else {
                    SHOT = new Shot(Ship.x, Ship.y - 20 + x * 10, Ship.Rotate);
                    shots.push(SHOT);
                }
            }
            shootingE = true;
        }
    }
    if(key==='q' || key==='Q'){
        //we want to shot five canon balls at a time
        //and we want to shot once the canon balls that were shot before these cannon balls have exited there limit
        if(shootingE===false && shootingQ===false && shooting===true&& shootingpause>60) {
            shootingpause = 0;
            addtoshootingpause = false;
            for(let x = 0; x<5;x++){

                //resolving a rotation problem
                if(Ship.Rotate>=45 && Ship.Rotate<=135 || Ship.Rotate<=-45 && Ship.Rotate>=-135 || Ship.Rotate>=225 && Ship.Rotate<=315 || Ship.Rotate<=-225 && Ship.Rotate>=-315) {
                    SHOT = new Shot(Ship.x - 20 + x * 10, Ship.y, Ship.Rotate);
                    shots.push(SHOT);
                }else{
                    SHOT = new Shot(Ship.x, Ship.y-20+x*10, Ship.Rotate);
                    shots.push(SHOT);
                }
            }
            shootingQ = true;

        }
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
        let canshot = true;
    }
    if(key==='s' || key==='S'){
        //start anchoring
        Ship.anchoring = true;
    }


    //turning the ship sprite into a ship with canons to show that the ship is ready to fire
    if(key==='r' || key==='R'){
        //change the state of shooting
        if(shooting===false){
            shooting = true;
            Ship.shooting = true;
        }else{
            shooting = false;
            Ship.shooting = false;
        }
    }

}

function Getout( status ) {

    var i;

    if (typeof status === 'string') {
        alert(status);
    }

    window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);

    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    function stopPropagation (e) {
        e.stopPropagation();
        // e.preventDefault(); // Stop for the form controls, etc., too?
    }
    for (i=0; i < handlers.length; i++) {
        window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
    }

    if (window.stop) {
        window.stop();
    }

    throw '';
}


