function Island(x,y,shape) {
    this.x = x;
    this.y = y;

    this.islandshape = loadImage('images/island1.png');

    if(shape===1){

        this.islandshape = loadImage('images/island2.png');
    }else if(shape===2){

        this.islandshape = loadImage('images/island3.png');
    }else if(shape===3){

    this.islandshape = loadImage('images/island4.png');
    }else if(shape===4){

        this.islandshape = loadImage('images/island5.png');
    }else if(shape===5){

        this.islandshape = loadImage('images/island6.png');
    }

    this.show = function () {
        image(this.islandshape,this.x,this.y);




    }




}