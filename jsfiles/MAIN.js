//global variables
var random2 = true;
var mapbig = false;

var start = true;
//back ground

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
var shiphealth = 500;

//shooting
//is the player shooting
var shootingE = false;
var shootingQ = false;
var Enemyshooting = false;
var enemyshootingpause = 0;
var shots = [];
var shooting = false;
//when shooting the ship slows down
var speed = 0;
//61 to simulate about to second since the game is going at about 30fps
var shootingpause = 61;
var range = 0;
var addtoshootingpause = false;

//score and coins
var score = 0;
var coins = 2500;

//trade interface
var tradeinterace = false;
//background
var backgroundimage;
//sounds list
var sounds = [];

var currentsong;
var loaded = true;
var loadingscreen;
var playing = false;
//fonts
var fonts;
var tutorial = false;
//tutorial background
var t;

//enemy
var allenemy = [];
var enemyshots = [];
//setup



function Playsong() {

    if (playing === false) {
        playing = true;
        let index = Math.floor(Math.random() * sounds.length) + 1;
        index--;
        console.log(index);
        currentsong = sounds[index];
        currentsong.play();
    } else {
        playing = currentsong.isPlaying();
    }
}
function Playsong1(song1) {
    sounds.push(song1);
}
function Playsong2(song5) {
    sounds.push(song5);
}
function Playsong3(song3) {
    sounds.push(song3);
}
function Playsong4(song4) {
    sounds.push(song4);
    loaded = false;

}




function preload() {
    loadingscreen = loadImage('images/loadingScreen.jpg');
    t = loadImage('images/tutorialbackground.jpg');
    fonts = loadFont('Fonts/RAPSCALL.TTF');
}

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
        //load background
        backgroundimage = 'lightblue';


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

            if(x<5001 && y<5001) {
                h++;
                x +=100;

                lastx = x;
                lasty = y;

                let random = Math.floor(Math.random() * 2) + 1;

               let shape = Math.floor(Math.random() * 5) + 1;

               if (random === 1) {
                   lasty += Math.floor(Math.random() * 5000) + 1;

                }
                else if(random === 2) {
                    lasty -= Math.floor(Math.random() * 5000) + 1;

                }
                if(dist(lastx,lasty,Ship.x,Ship.y)>300) {
                    I = new Island(lastx, lasty, shape);

                    allislands.push(I);
                }
            }
        }
        //imagesloading

        //load songs
        let song1 = loadSound('sounds/1.mp3',Playsong1);
        let song2 = loadSound('sounds/5.mp3',Playsong2);
        let song3 = loadSound('sounds/3.mp3',Playsong3);
        let song4 = loadSound('sounds/4.mp3',Playsong4);

        //it is no longer the start of the game
        start=false;


    }
    if(tradeinterace){

    }

    else if(map) {
        background('white');

    }else{
        background('lightblue');
    }

}

//draw

function draw() {
    if(loaded===true) {

        image(loadingscreen, 0,0);
        fill('orange');
        textSize(100);

        textFont(fonts);
        text("SEA THIEF",500,100);
        fill('green');
        textSize(60);
        text("Loading...",600,500);
        //delay

    }
    else if(loaded===false && tutorial===false){

        image(t,0,0);
        fill('grey');
        textSize(100);

        text("INTRO",700,150);

        fill('black');
        textSize(25);
        text('SIR MORGAN',1200,600);
        fill('red');
        text('PRESS SPACE TO PLAY',200,600);
        fill('black');
        text('IT IS THE YEAR 1670 AND YOU CALL YOUR SELF A PIRATE. YOUR GOAL \n' +
            'IS TO INVADE AS MANY CITIES AS POSSIBLE. THERE WILL BE BRITISH SHIP THAT \n' +
            'SHALL TRY TO DESTROY YOU BUT FEAR NOT, YOU ARE KNOWN AS ONE OF THE BEST \n'+
            'CAPTAINS TO EVER SALE THE SEA. I BET YOU WILL DO ALL RIGHT. YOUR SHIP IS \n' +
            'CALLED THE SHADOWS OF THE SEA. YOU ROTATE YOUR SHIP USING THE \n'+
            'KEYS "D" AND "A" YOU PREPARE YOUR SHIP TO FIRE WITH THE KEY "R" \n' +
            'AND YOU FIRE WITH THE KEYS "Q" AND "E". YOU CAN START ROWING BY PRESSING "W".\n' +
            'AND ANCHOR BY PRESSING "S". THE WIND SHALL BE DISPLAY ON THE TOP RIGHT CORNER OF \n' +
            'THE SCREEN. YOU CAN BUY UPGRADES WITH COINS ONCE YOU ARRIVE AT A FRIENDLY ISLAND \n' +
            '\n' +
            '                                                             GOOD LUCK',width/2-145,200)



        //delay
    }
    else {
        textSize(10);
        Playsong();
        if (mapbig === false) {

            update();


            //change the direction of the wind
            Wind.change();
            //redraw the background to get rid of old images

            background(backgroundimage);

            //show the island
            let index = 0;
            for (let i = 0; i < allislands.length; i++) {
                allislands[index].show();
                let h = dist(allislands[index].x + 150, allislands[index].y + 150, Ship.x + 100, Ship.y);
                if (h < 150) {
                    shiphealth--;
                    let r = Math.floor(Math.random() * 3) + 1;
                    if (r === 1) {
                        crew--;
                    }
                    //don not move when on land
                    Ship.speed = 0;
                    //gemaover screen
                    if (shiphealth <= 0 || crew <= 0) {
                        fill('black');
                        rect(0, 0, width, height);
                        fill('red');
                        textSize(100);
                        text('GAME OVER', width / 2, 100);
                        let skull = createImg("https://media.giphy.com/media/l3V0yA9zHe5m29sxW/giphy.gif");
                        skull.position(width / 2 - 200, height / 2 - 150);


                        Getout();
                    }
                }
                for(let y = 0;y<allenemy.length;y++){
                    let h2 = dist(allislands[index].x + 150, allislands[index].y + 150, allenemy[index].x + 100, allenemy[index].y);
                    if(h2 < 150){
                        allenemy[index].angle+=90;
                    }
                }
                index++;

            }
            //check for player and enemy collisions




            //show captured islands
            let capturedislandindex = 0;
            for (let x = 0; x < allcapturedislands.length; x++) {
                allcapturedislands[capturedislandindex].show();
                capturedislandindex++;
            }
            //show enemy island
            index = 0;
            for(let i = 0; i<allenemy.length;i++){
                allenemy[index].move();
                allenemy[index].show();
                h = dist(allenemy[index].x-100, allenemy[index].y-100,Ship.x+100 , Ship.y);
                if (h < 150) {
                    shiphealth--;
                    allenemy[index].lives--;
                    if(allenemy[index].lives<=0){
                        allenemy[index] = undefined;
                        allenemy.splice(index,1);
                        break;

                    }
                    let r = Math.floor(Math.random() * 3) + 1;
                    if (r === 1) {
                        crew--;
                    }
                    //don not move when on land
                    Ship.speed = 0;
                    //gemaover screen
                    if (shiphealth <= 0 || crew <= 0) {
                        fill('black');
                        rect(0, 0, width, height);
                        fill('red');
                        textSize(100);
                        text('GAME OVER', width / 2, 100);
                        let skull = createImg("https://media.giphy.com/media/l3V0yA9zHe5m29sxW/giphy.gif");
                        skull.position(width / 2 - 200, height / 2 - 150);


                        Getout();
                    }
                }

                index++;
            }

            index = 0;
            for(let x=0;x<allenemy.length;x++){
                let index2 = 0;
                for(let y=0;y<shots.length;y++ ){
                    if(allenemy[index].hit(shots[index2].x, shots[index2].y)){
                        allenemy[index].lives--;
                        if(allenemy[index].lives<=0){
                            coins+=300;
                            score+=3;
                            allenemy[index] = undefined;
                            allenemy.splice(index,1);

                        }

                        break;

                    }
                    index2++;
                }
                index++;
            }

            let index2 = 0;
            for(let y=0;y<enemyshots.length;y++ ){
                if(Ship.hit(enemyshots[index2].x, enemyshots[index2].y)){
                    shiphealth--;
                    let r = Math.floor(Math.random() * 3) + 1;
                    if (r === 1) {
                        crew--;
                    }
                    enemyshots[index2] = undefined;
                    //remove from list
                    enemyshots.splice(index2, 1);

                    if (shiphealth <= 0 || crew <= 0) {
                        fill('black');
                        rect(0, 0, width, height);
                        fill('red');
                        textSize(100);
                        text('GAME OVER', width / 2, 100);
                        let skull = createImg("https://media.giphy.com/media/l3V0yA9zHe5m29sxW/giphy.gif");
                        skull.position(width / 2 - 200, height / 2 - 150);


                        Getout();
                    }
                    break;
                }
                index2++;
            }


            //show island shots
            index2 = 0;
            for (let y = 0; y < islandshots.length; y++) {
                if (Ship.hit(islandshots[index2].x, islandshots[index2].y)) {
                    shiphealth--;
                    let r = Math.floor(Math.random() * 3) + 1;
                    if (r === 1) {
                        crew--;
                    }
                    islandshots[index2] = undefined;
                    //remove from list
                    islandshots.splice(index2, 1);

                    if (shiphealth <= 0 || crew <= 0) {
                        fill('black');
                        rect(0, 0, width, height);
                        fill('red');
                        textSize(100);
                        text('GAME OVER', width / 2, 100);
                        let skull = createImg("https://media.giphy.com/media/l3V0yA9zHe5m29sxW/giphy.gif");
                        skull.position(width / 2 - 200, height / 2 - 150);


                        Getout();
                    }
                    break;
                }

                //if the shot hits range
                if (islandshots[index2].destroy) {
                    islandshots[index2] = undefined;
                    //remove from list
                    islandshots.splice(index2, 1);
                    break
                }
                islandshots[index2].show();
                islandshots[index2].moveQ();
                //check if the shot hits the player
                index2++;
            }

            //show shots
            if (shots.length > 0) {
                let index = 0;
                for (let i = 0; i < shots.length; i++) {
                    shots[index].show();
                    index++
                }
            }
            //enemy shots
            if(enemyshots.length > 0){
                let index = 0;
                for(let i = 0; i < enemyshots.length; i++){
                    enemyshots[index].show();
                    index++
                }
            }

            //show speed text
            //if the ship is ready to shoot it slows down
            textSize(20);
            if (shooting) {
                fill('black');
                text("SPEED: " + Math.round(speed * 100) / 100, 200, 50);

            } else {
                fill('black');
                text("SPEED: " + Math.round(Ship.speed * 100) / 100, 200, 50);

            }
            //show crew
            fill('black');
            text("CREW: " + crew, 1200, 60);
            //show ship health
            fill('red');
            text("SHIP HEALTH: " + shiphealth, 1200, 80);

            //show score
            fill('green');
            text("SCORE: " + score, 1200, 100);

            //show coins
            fill('white');
            text("COINS: " + coins, 1200, 120);

            if (Ship.paddling) {
                //paddle
                Ship.paddle();
            } else if (Ship.anchoring) {
                Ship.anchor();

            } else {
                //move the player according to the wind
                Ship.movefront(Wind.dir);
            }
            //show the player ship
            Ship.show();
            //show the compass
            Wind.compass();
        }
        if (mapbig === true) {
            // if m is pressed than show the mission canvas
            Map.show();
            textSize(70);
            fill('orange');
            text("TRADING",700,100);
            textSize(40);
            fill('yellow');
            text("CREW: "+crew,200,50);
            text("SHIP HEALTH: "+shiphealth,200,100);
            text("BULLET RANGE: "+ -1*range+15,200,150);
            text("SHIP MAX SPEED: "+Ship.maxspeed,200,200);
            text("COINS: "+coins,200,250);

            fill('lightgreen');
            text("1 CREW = 100 COINS PRESS Z",700,350);
            text("1 SHIP HEALTH = 30 COINS PRESS X",700,400);
            text("add 1 BULLET RANGE = 1000 COINS PRESS C",700,450);
            text("add 1 SHIP MAX SPEED = 5000 COINS PRESS V",700,500);
            fill('red');
            text("TO EXIT PRESS N",700,600);


        }
    }

}
//update
function update() {
    //winning
    if(score>=7500){
        fill('black');
        rect(0, 0, width, height);
        fill('green');
        textSize(100);
        text('YOU HAVE WON', width / 2, 100);
        let skull = createImg("https://media.giphy.com/media/WQelDfuEcn3Vu/giphy.gif");
        skull.position(width / 2 - 200, height / 2);


        Getout();
    }

    //checking if player is cheating
    if(coins/(score+25)>100 || (score+25)/coins<0.01){
        console.log("HAHAHA YOU THOUGHT YOU CAN STEAL COINS FROM ME. I AM GOD AND I AM ALWAYS WATCHING");
        fill('black');
        rect(0, 0, width, height);
        fill('red');
        textSize(100);
        text('GAME OVER', width / 2, 100);
        let skull = createImg("https://media.giphy.com/media/l3V0yA9zHe5m29sxW/giphy.gif");
        skull.position(width / 2 - 200, height / 2 - 150);


        Getout();
    }

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
                    cord = [-35, 120, 15, 240, 50, 150];
                }else if(allislands[Index].shape===2){
                    cord = [-35,120, 50, 150, 100, 80];
                }else if(allislands[Index].shape===3){
                    cord = [-35, 120];
                }else if(allislands[Index].shape===4){
                    cord = [-35, 120,130, 150, 100, 80, 140, 150,];
                }else if(allislands[Index].shape===5){
                    cord = [-35, 120, 15, 240, 100, 80, 140, 150,];
                }else {
                    cord = [-35, 120, 15, 240, 130, 150, 100, 80, 140, 150,];
                }
                let limit = cord.length;
                let random1= Math.floor(Math.random() *limit/2);
                random1*=2;

                let random2 = random1+1;



                //if the ship is in range of an island

                islandshot = new Shot(allislands[Index].x+cord[random1], allislands[Index].y+cord[random2], int(Math.round(180 / Math.PI * (Math.atan2(allislands[Index].y - Ship.y+100, allislands[Index].x - Ship.x)))),-40);

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
    //move the enemy
    index = 0;
    //move the captured islands
    for(let i = 0;i<allenemy.length;i++) {

        //converting angles to radians then getting the cos of these newly created radians (times the speed)
        //the same with y but except cos => sin
        //by this process we basically get the x and y of a degree
        allenemy[index].x += Math.cos(angle * (Math.PI / 180)) * speed;
        allenemy[index].y += Math.sin(angle * (Math.PI / 180)) * speed;

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
                    let land = allislands[index2];
                    allcapturedislands.push(land);
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
    //################################################################### TRADE ########################################
    index = 0;
    for(let y = 0;y<allcapturedislands.length;y++){
        h = dist(allcapturedislands[index].x + 150, allcapturedislands[index].y + 150, Ship.x + 100, Ship.y);
        if (h < 150) {
            Ship.Rotate+=180;
            //this is the big map of the player screen
            mapbig = true;
            //reset canvas
            setup();

        }
        index++;
    }
    //################################################## GENERATE ENEMY ################################################

    random2 = Math.floor(Math.random() * 2000 - (score+10/10)) + 1;

    if(random2 === 1){
        let random1 = Math.floor(Math.random() * 4) + 1;
        var randomx = Math.floor(Math.random() * 500) +450;
        var randomy = Math.floor(Math.random() * 500) +450;
        if(random1===1){
            randomx = -randomx;
        }if(random1===2){
            randomy = -randomy;
        }if(random1===3) {
           randomx = -randomx;
           randomy = -randomy;
        }
        enemy = new Enemy(randomx+Ship.x,randomy+Ship.y);
        allenemy.push(enemy);
    }
    //### ENEMY SHOTS
    index = 0;
    for(let i = 0;i<allenemy.length;i++) {
        if(allenemy[index].shooting) {
            enemyshootingpause++;
            if(enemyshootingpause>=80) {
                enemyshootingpause = 0;

                for (let x = 0; x < 5; x++) {
                    //resolving a rotation problem

                    if (allenemy[index].Rotate >= 45 && allenemy[index].Rotate <= 135 || allenemy[index].Rotate <= -45 && allenemy[index].Rotate >= -135 || allenemy[index].Rotate >= 225 && allenemy[index].Rotate <= 315 || allenemy[index].Rotate <= -225 && allenemy[index].Rotate >= -315) {
                        SHOT = new Shot(allenemy[index].x-120 + x * 10, allenemy[index].y, allenemy[index].Rotate, range);
                        enemyshots.push(SHOT);
                        Enemyshooting = true;
                    } else {
                        SHOT = new Shot(allenemy[index].x-120, allenemy[index].y + x * 10, allenemy[index].Rotate, range);
                        enemyshots.push(SHOT);
                        Enemyshooting = true;
                    }
                }
            }
        }
        index++;
    }
    //move enemy shots
    index = 0;
    for (let i = 0; i < enemyshots.length; i++) {
        if (enemyshots[index].destroy) {
            enemyshots[index] = undefined;
            Enemyshooting = false;
            enemyshots.splice(index, 1);
            break;
        }
        if (Enemyshooting) {
            enemyshots[index].moveE();
        }
        index++;
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
                    SHOT = new Shot(Ship.x - 20 + x * 10, Ship.y, Ship.Rotate,range);
                    shots.push(SHOT);
                }else {
                    SHOT = new Shot(Ship.x, Ship.y - 20 + x * 10, Ship.Rotate,range);
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
                    SHOT = new Shot(Ship.x - 20 + x * 10, Ship.y, Ship.Rotate,range);
                    shots.push(SHOT);
                }else{
                    SHOT = new Shot(Ship.x, Ship.y-20+x*10, Ship.Rotate,range);
                    shots.push(SHOT);
                }
            }
            shootingQ = true;

        }
    }
}
//un press
function keyPressed() {
    if(key===' '|| key===' '){
        tutorial = true;
    }
    if(key==='n'|| key==='N' && mapbig===true){
        //this is the big map of the player screen
        mapbig = false;
        setup();
    }
    if(key==='z'|| key==='Z' && mapbig===true){
        if(coins>=100) {
            crew += 1;
            coins -= 100;
        }

    }
    if(key==='x'|| key==='X' && mapbig===true){
        if(coins>=30) {
            shiphealth += 1;
            coins -= 30;
        }

    }
    if(key==='c'|| key==='C' && mapbig===true) {
        if (coins >= 150) {
            range -= 1;
            coins -= 1000;
        }
    }
    if(key==='v'|| key==='V' && mapbig===true) {
        if (coins >= 5000) {
            Ship.maxspeed += 1;
            coins -= 5000;
        }
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


