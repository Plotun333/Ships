function wind() {
    //the dir can be 0-360 like circle
    this.dir = 0;
    //the speed of the change
    this.speed = 0.1;

    //creating a compass for the wind
    this.compass = function () {
        //push == save()
        push();
        //translate is rotation center
        translate(100-10,10+80);
        //color of line
        stroke('white');

        //rotate by this.dir (the direction of the wind)
        rotate(this.dir);
        //draw line
        line(0,-55,0,25);
        stroke('red');
        line(0,-5,0,50);


        //restore
        pop();

    };

    //the change function will be called in MAIN.js update()
    this.change = function () {
        //changing the speed for bigger variations
        this.speed = random(0,2);
        //getting a value if 0 this.dir-this.speed; if 1 this.dir-this.speed
        let r1 = random(0,1);


        //vary the wind angle
        if(r1>0.5){
            this.dir+=this.speed;
        }
        else{
            this.dir-=this.speed;
        }
    }

}