function Island(x,y,shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.lives = 5;
    this.islandshape = loadImage('images/island1.png');
    if(this.shape===1){
        this.islandshape = loadImage('images/island2.png');
    }else if(this.shape===2){
        this.islandshape = loadImage('images/island3.png');
    }else if(this.shape===3){
        this.islandshape = loadImage('images/island4.png');
    }else if(this.shape===4){
        this.islandshape = loadImage('images/island5.png');
    }else if(this.shape===5) {
        this.islandshape = loadImage('images/island6.png');

    }
    //the captured island shapes
    this.show = function () {
        image(this.islandshape,this.x,this.y);
    };
    this.hit = function (x,y) {
        if(this.shape===0) {
            let d = dist(this.x + 65, this.y + 120, x, y);
            let d2 = dist(this.x +110,this.y + 240,x,y);
            let d3 = dist(this.x +150,this.y + 160,x,y);
            let d4 = dist(this.x +200,this.y + 80,x,y);
            let d5 = dist(this.x + 240,this.y + 150,x,y);

            if(d < 10) {
                return true;
            }else if(d2 < 10) {
                return true;
            }else if(d3 < 10) {
                return true;
            }else if(d4 < 10) {
                return true;
            }else if(d5 < 10) {
                return true;
            }else{
                return false;
            }
        }else if(this.shape===1){
            let d = dist(this.x + 65, this.y + 120, x, y);
            let d2 = dist(this.x +110,this.y + 240,x,y);
            let d3 = dist(this.x +150,this.y + 160,x,y);

            if(d < 10) {
                return true;
            }else if(d2 < 10) {
                return true;
            }else if(d3 < 10) {
                return true;
            }else{
                return false;
            }
        }else if(this.shape===2){
            let d = dist(this.x + 65, this.y + 120, x, y);
            let d2 = dist(this.x +110,this.y + 240,x,y);
            let d4 = dist(this.x +200,this.y + 80,x,y);

            if(d < 10) {
                return true;
            }else if(d2 < 10) {
                return true;
            }else if(d4 < 10) {
                return true;
            }else{
                return false;
            }
        }else if(this.shape===3){
            let d = dist(this.x + 65, this.y + 120, x, y);

            if(d < 10) {
                return true;
            }else{
                return false;
            }
        }else if(this.shape===4) {
            let d = dist(this.x + 65, this.y + 120, x, y);
            let d2 = dist(this.x +110,this.y + 240,x,y);
            let d3 = dist(this.x +150,this.y + 160,x,y);
            let d4 = dist(this.x +240,this.y + 150,x,y);


            if(d < 10) {
                return true;
            }else if(d2 < 10) {
                return true;
            }else if(d3 < 10) {
                return true;
            }else if(d4 < 10) {
                return true;
            }else{
                return false;
            }
        }else if(this.shape===5) {
            let d2 = dist(this.x +110,this.y + 240,x,y);
            let d3 = dist(this.x +150,this.y + 160,x,y);
            let d4 = dist(this.x +200,this.y + 80,x,y);
            let d5 = dist(this.x + 240,this.y + 150,x,y);


            if(d2 < 10) {
                return true;
            }else if(d3 < 10) {
                return true;
            }else if(d4 < 10) {
                return true;
            }else if(d5 < 10){
                return true;
            }else{
                return false;
            }
        }
    }




}