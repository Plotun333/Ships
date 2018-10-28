function HIT(x,y,x2,y2,dis) {
    this.x = x;
    this.y = y;
    this.dist2 = dis;
    this.y2 = y2;
    this.x2 = x2;

    this.dist = dist(x,y,x2,y2);

    this.collision = this.dist <= this.dist2;

}