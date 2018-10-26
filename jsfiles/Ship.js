function ship() {
    //the ship will start in the middle of the screen
    this.x = width/2;
    this.y = height/2;

    this.speed = 0;
    this.Rotate = 0;

    //the ship image
    this.ShipShape = loadImage("images/ship.jpg");

    //the show function
    this.show = function () {
        //push() == save
        push();

        noStroke();

        //translating the rotation center to this.x this.y
        translate(this.x+100,this.y);
        //drawing the rotation
        rotate(this.Rotate);
        //drawing image with new position
        image(this.ShipShape,-20,-60);
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
        var wind = (this.Rotate-WindAngle);

        //if wind is somewhere between 10 and -10 then that means that the wind right behind the player
        //speed 1.5
        if((wind)<10 && (wind)>-10){
            if(this.speed<=1.5) {
                //acceleration or 0.005 per a frame (fairly slow)
                this.speed += 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is slightly to the left/right
        //of the player but it is still basically behind him
        //speed 1.25
        else if((wind)<20 && (wind)>-20){
            if(this.speed<=1.25) {
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
            if(this.speed<=1) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is to the left/right
        // since sale ships can reach high speeds when the wind is going from the right or left side of them
        //speed 1.25
        else if((wind)<90 && (wind)>-90){
            if(this.speed<=1.25){
                this.speed += 0.005;
            }
        else{
                this.speed -= 0.005;
            }
        }

        //if wind is somewhere between 20 and -20 then that means that the wind is slightly to the left/right
        //of the player but it is still basically in front of him
        //speed 1.25
        else if((wind)<120 && (wind)>-120){
            if(this.speed<=1) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        //the wind is in front of him (slow down)
        else{
            if(this.speed>0) {
                this.speed -= 0.01;
            }
        }

    }

}