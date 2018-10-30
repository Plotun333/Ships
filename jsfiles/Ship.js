function ship() {
    //the ship will start in the middle of the screen
    this.x = width/2;
    this.y = height/2;

    //paddling  is equal to
    this.paddling = false;
    //anchoring is equal to
    this.anchoring = false;
    //shooting is equal ti
    this.shooting = false;
    //the rotation of the player ship
    //the current speed of the player
    this.speed = 0;
    this.maxspeed = 1.5;
    this.Rotate = 0;

    //the ship image
    this.ShipShape = loadImage("images/ship.png");
    this.ShipShapePaddling = loadImage("images/shipPaddling.png");
    this.ShipShapeAnchoring = loadImage("images/shipAnchor.png");
    this.ShipShapeShooting = loadImage("images/shipcanon.png");
    //the show function
    this.show = function () {
        //push() == save
        push();

        noStroke();

        //translating the rotation center to this.x this.y
        translate(this.x+100,this.y);
        //drawing the rotation
        rotate(this.Rotate);

        if(this.paddling){
            //draw ship paddling
            image(this.ShipShapePaddling,-20,-60);

        }else if(this.anchoring){
            //draw ship paddling
            image(this.ShipShapeAnchoring,-20,-60);

        }else if(this.shooting){
            //draw ship with canons
            image(this.ShipShapeShooting,-20,-60);
        }else {
            //drawing image with new position
            image(this.ShipShape, -20, -60);
        }
        //making sure that the angle isn't <360 or > -360 (for conditions)
        if(this.Rotate===360 || this.Rotate===-360){
            this.Rotate = 0;
        }
        //restore
        pop();
    };
    //the wind function takes in a arg of the dir of the wind
    this.wind = function (dir) {

    };
    this.move1 = function () {
        //rotating the boat
        this.Rotate+=5;

    };
    this.move2 = function () {
        //rotating the boat
        this.Rotate-=5;



    };
    //this function moves the player
    this.movefront = function(WindAngle){

        //make the var wind since we don not want to change the Rotate var
        //WindAngle is the angle of the wind XP
        let wind = (this.Rotate-WindAngle);

        //if wind is somewhere between 10 and -10 then that means that the wind right behind the player
        //speed 1.5
        if((wind)<10 && (wind)>-10){
            if(this.speed<=this.maxspeed) {
                //acceleration or 0.005 per a frame (fairly slow)
                this.speed += 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is slightly to the left/right
        //of the player but it is still basically behind him
        //speed 1.25
        else if((wind)<20 && (wind)>-20){
            if(this.speed<=this.maxspeed-0.25) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is somewhere in between
        // to the left/right of the player and behind him
        //speed 1
        else if(wind<40 && (wind)>-40){
            if(this.speed<=this.maxspeed-0.5) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is to the left/right
        // since sale ships can reach high speeds when the wind is going from the right or left side of them
        //speed 1.25
        else if((wind)<90 && (wind)>-90) {
            if (this.speed <= this.maxspeed-0.25) {
                this.speed += 0.005;
            } else {
                this.speed -= 0.005;
            }
        }

        //if wind is somewhere between 20 and -20 then that means that the wind is slightly to the left/right
        //of the player but it is still basically in front of him
        //speed 1.25
        else if((wind)<120 && (wind)>-120){
            if(this.speed<=this.maxspeed-0.5) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }

        //we need to create the same statements if the wind > 180
        //#############################################################################################################

        //if wind is 350 or -350 then that means that the wind right behind the player
        //speed 1.5
        else if((wind)>350 || (wind)<-350){
            if(this.speed<=this.maxspeed) {
                //acceleration or 0.005 per a frame (fairly slow)
                this.speed += 0.005;
            }
        }
        //if wind is  340 or -340 then that means that the wind is slightly to the left/right
        //of the player but it is still basically behind him
        //speed 1.25
        else if((wind)>340 || (wind)<-340){
            if(this.speed<=this.maxspeed-0.25) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        //if wind is 300 or -300 then that means that the wind is somewhere in between
        // to the left/right of the player and behind him
        //speed 1
        else if(wind>300 || (wind)<-300){
            if(this.speed<=this.maxspeed-0.5) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        //if wind is 270 or -270 then that means that the wind is to the left/right
        // since sale ships can reach high speeds when the wind is going from the right or left side of them
        //speed 1.25
        else if((wind)>270 || (wind)<-270) {
            if (this.speed <= this.maxspeed-0.25) {
                this.speed += 0.005;
            } else {
                this.speed -= 0.005;
            }
        }

        //if wind is 240 or -240 then that means that the wind is slightly to the left/right
        //of the player but it is still basically in front of him
        //speed 1.25
        else if((wind)>240 || (wind)<-240){
            if(this.speed<=this.maxspeed-0.5) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        //#############################################################################################################
        //the wind is in front of him (slow down)
        else{
            if(this.speed>0) {
                this.speed -= 0.01;
            }
        }

    };
    //get a constant speed with paddle
    this.paddle = function () {
        this.paddling = true;
        if(this.speed<=this.maxspeed-1.2) {

            this.speed += 0.005;
        }
        else{
            this.speed -= 0.005;
        }


    };
    //slow down with anchor
    this.anchor = function () {
        this.anchoring = true;
        if(this.speed>0) {
            this.speed -= 0.025;
        }
    };
    this.hit = function (x,y) {
        let d = dist(this.x+100, this.y , x, y);
        if (d < 60) {
            return true;
        } else {
            return false;
        }
    }

}
