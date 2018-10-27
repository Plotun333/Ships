function Island(x,y,shape) {
    this.x = x;
    this.y = y;

    this.islandshape = loadImage('images/island1.png');

    if(shape===1){
        console.log('here');
        this.islandshape = loadImage('images/island2.png');
    }else if(shape===2){
        console.log('here');
        this.islandshape = loadImage('images/island3.png');
    }else if(shape===3){
        console.log('here');
    this.islandshape = loadImage('images/island4.png');
    }else if(shape===4){
        console.log('here');
        this.islandshape = loadImage('images/island5.png');
    }else if(shape===5){
        console.log('here');
        this.islandshape = loadImage('images/island6.png');
    }

    this.show = function () {
        image(this.islandshape,this.x,this.y);




    }




}