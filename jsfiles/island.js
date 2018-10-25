function Island(x,y) {
    this.x = x;
    this.y = y;

    this.islandshape = loadImage('images/island1.png');
    this.show = function () {
        image(this.islandshape,this.x,this.y);




    }




}