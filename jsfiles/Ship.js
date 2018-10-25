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

        if((wind)<10){
            this.speed=5;
        }
        else if((wind)<20){
            this.speed = 4;
        }
        else if(wind<40){
            this.speed = 3;
        }
        else if((wind)<80){
            this.speed = 2;
        }
        else if((wind)<100){
            this.speed = 1;
        }
        else{
            this.speed = 0;
        }

    }

}