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
    this.movefront = function(WindAngle){
        var wind = (this.Rotate-WindAngle);
        if(wind<0){
            wind = - wind;
        }

        if((wind)<10 && (wind)>-10){
            if(this.speed<=1.5) {
                this.speed += 0.005;
            }
        }
        else if((wind)<20 && (wind)>-20){
            if(this.speed<=1.25) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        else if(wind<40 && (wind)>-40){
            if(this.speed<=1) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        else if((wind)<90 && (wind)>-90){
            if(this.speed<=1.25){
                this.speed += 0.005;
            }
        else{
                this.speed -= 0.005;
            }
        }
        else if((wind)<120 && (wind)>-120){
            if(this.speed<=0.25) {
                this.speed += 0.005;
            }
            else{
                this.speed -= 0.005;
            }
        }
        else{
            if(this.speed>0) {
                this.speed -= 0.01;
            }
        }

    }

}