function Enemy(x,y) {
    this.x = x;
    this.y = y;

    this.turn = 1;
    this.stop = false;
    this.speed = 0.5;
    this.angle = 0;
    this.Rotate = 0;
    this.shape = loadImage('images/shipenemy.png');
    this.maxspeed = 1.5;


    this.show = function () {
        push();
        translate(this.x, this.y);
        rotate(this.Rotate);
        image(this.shape, -20, -60);


        pop();
        translate(0, 0);


        if (dist(this.x,this.y,Ship.x,Ship.y) <= 300) {
            this.stop = true;
            this.turn++;
        } else {
            this.stop = false;
        }

    };

    this.move = function () {
        this.turn = 0;
        this.Rotate = int(Math.round(180 / Math.PI * (Math.atan2(this.diry, this.dirx))));
        this.Rotate -= 90;
        this.angle = int(Math.round(180 / Math.PI * (Math.atan2(this.y - Ship.y - 20, this.x - Ship.x - 100))));
        this.dirx = Math.cos(this.angle * (Math.PI / 180));
        this.diry = Math.sin(this.angle * (Math.PI / 180));

        let wind = (this.Rotate - Wind.dir);

        if(){
            this.Rotate-=90;
            this.turn++;
        };
        //if wind is somewhere between 10 and -10 then that means that the wind right behind the player
        //speed 1.5
        if ((wind) < 10 && (wind) > -10) {
            if (this.speed <= this.maxspeed) {
                //acceleration or 0.005 per a frame (fairly slow)
                this.speed += 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is slightly to the left/right
        //of the player but it is still basically behind him
        //speed 1.25
        else if ((wind) < 20 && (wind) > -20) {
            if (this.speed <= this.maxspeed - 0.25) {
                this.speed += 0.005;
            }
            else {
                this.speed -= 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is somewhere in between
        // to the left/right of the player and behind him
        //speed 1
        else if (wind < 40 && (wind) > -40) {
            if (this.speed <= this.maxspeed - 0.5) {
                this.speed += 0.005;
            }
            else {
                this.speed -= 0.005;
            }
        }
        //if wind is somewhere between 20 and -20 then that means that the wind is to the left/right
        // since sale ships can reach high speeds when the wind is going from the right or left side of them
        //speed 1.25
        else if ((wind) < 90 && (wind) > -90) {
            if (this.speed <= this.maxspeed - 0.25) {
                this.speed += 0.005;
            } else {
                this.speed -= 0.005;
            }
        }

        //if wind is somewhere between 20 and -20 then that means that the wind is slightly to the left/right
        //of the player but it is still basically in front of him
        //speed 1.25
        else if ((wind) < 120 && (wind) > -120) {
            if (this.speed <= this.maxspeed - 0.5) {
                this.speed += 0.005;
            }
            else {
                this.speed -= 0.005;
            }
        }

        //we need to create the same statements if the wind > 180
        //#############################################################################################################

        //if wind is 350 or -350 then that means that the wind right behind the player
        //speed 1.5
        else if ((wind) > 350 || (wind) < -350) {
            if (this.speed <= this.maxspeed) {
                //acceleration or 0.005 per a frame (fairly slow)
                this.speed += 0.005;
            }
        }
        //if wind is  340 or -340 then that means that the wind is slightly to the left/right
        //of the player but it is still basically behind him
        //speed 1.25
        else if ((wind) > 340 || (wind) < -340) {
            if (this.speed <= this.maxspeed - 0.25) {
                this.speed += 0.005;
            }
            else {
                this.speed -= 0.005;
            }
        }
        //if wind is 300 or -300 then that means that the wind is somewhere in between
        // to the left/right of the player and behind him
        //speed 1
        else if (wind > 300 || (wind) < -300) {
            if (this.speed <= this.maxspeed - 0.5) {
                this.speed += 0.005;
            }
            else {
                this.speed -= 0.005;
            }
        }
        //if wind is 270 or -270 then that means that the wind is to the left/right
        // since sale ships can reach high speeds when the wind is going from the right or left side of them
        //speed 1.25
        else if ((wind) > 270 || (wind) < -270) {
            if (this.speed <= this.maxspeed - 0.25) {
                this.speed += 0.005;
            } else {
                this.speed -= 0.005;
            }
        }

        //if wind is 240 or -240 then that means that the wind is slightly to the left/right
        //of the player but it is still basically in front of him
        //speed 1.25
        else if ((wind) > 240 || (wind) < -240) {
            if (this.speed <= this.maxspeed - 0.5) {
                this.speed += 0.005;
            }
            else {
                this.speed -= 0.005;
            }

        }


        //#############################################################################################################
        //the wind is in front of him (slow down)
        else {
            if (this.speed > 0) {
                if (this.speed <= this.maxspeed - 1.2) {
                    this.speed += 0.005;
                } else {
                    this.speed -= 0.005;
                }
            }
        }


        if (this.stop === false) {
            this.x += this.dirx * -this.speed;
            this.y += this.diry * -this.speed;


        };

        this.shoot = function () {

        }

    }
}