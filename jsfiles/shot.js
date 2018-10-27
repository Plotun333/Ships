function Shot(x,y) {
    this.x = x;
    this.y = y;
    this.shape = loadImage('images/canonball.png');

    //this.move = function (angle) {

    //};
    this.show = function () {
        image(this.shape,this.x,this.y);
    }




}