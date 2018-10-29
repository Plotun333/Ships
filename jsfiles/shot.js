function Shot(x,y,angle) {
    //the x and y of the shot
    this.x = x+100;
    this.y = y;
    //the range of the shot
    this.range = -100;
    // boolean that check if the shot should be popped from the shots array
    this.destroy = false;
    //the speed
    this.speed = 10;
    //the direction of the movement times the speed (so it moves)
    this.dirx =  Math.cos(angle * (Math.PI / 180));
    this.diry =  Math.sin(angle * (Math.PI / 180));
    //the shape
    this.shape = loadImage('images/canonball.png');

    this.moveE = function () {
        if (this.range < 15) {
            //move the shot
            this.x += this.dirx * this.speed;
            this.y += this.diry * this.speed;
            this.range++;
        } else {
            this.destroy = true;
        }
    };

    this.moveQ = function () {
        if(this.range<15) {
            //move the shot
            this.x += this.dirx * -this.speed;
            this.y += this.diry * -this.speed;
            this.range++;
        }else{
            this.destroy = true;
        }
    };

    this.show = function () {
        //show the image;
        image(this.shape,this.x,this.y);
    }




}