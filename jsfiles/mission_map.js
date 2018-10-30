//constructor mission map will build the mission map with the mission
function Mission_map() {
    //the x,y coordinates
    this.x = 0;
    this.y = 0;

    // the map shape (picture)
    this.Shape = loadImage('images/tradebackground.png');

    //creating the image
    this.show = function () {
        image(this.Shape,this.x,this.y);
    }

}