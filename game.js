var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var pointsText = document.getElementById("points");

var gameMap = new function(){
    this.widthBlock = 20;
    this.heightBlock = 15;
    this.blockSize = 40;
}

function convertToVector(xNew,yNew){
    return {x: xNew,y: yNew}
}

var snake = new function(){
        this.x = gameMap.widthBlock/2;
        this.y = gameMap.widthBlock/2;
        this.blockSize = 40;
        
        this.updateX = 1;
        this.updateY = 0;

        this.pts = 0; 

        this.tailLenght = 3;

        this.tail=[];
        this.tail[0] = convertToVector(this.x-1,this.y);
        this.tail[1] = convertToVector(this.x-2,this.y);
        this.tail[2] = convertToVector(this.x-3,this.y);

    this.draw=function(){
        context.fillStyle="#00ff0c";
        context.fillRect(this.x*gameMap.blockSize,this.y*gameMap.blockSize,gameMap.blockSize,gameMap.blockSize);
        context.fillStyle="#ffffff";
        for(var i=0;i<this.tailLenght;i++){
            context.fillRect(this.tail[i].x*gameMap.blockSize,this.tail[i].y*gameMap.blockSize,gameMap.blockSize,gameMap.blockSize);
        }
    }

    this.updatePosition=function(){
        pointsText.textContent = "Ilosc punktów: " + this.pts;
        this.x+=this.updateX;
        this.y+=this.updateY;
    }

    this.updateTail = function(){
        for(var i=this.tailLenght;i>0;i--){
            this.tail[i]=this.tail[i-1];
        }
       this.tail[0]=convertToVector(this.x,this.y);

    }

    this.checkWall=function(){
        if(this.x>gameMap.widthBlock-1)
            this.x=0;
        if(this.x<0)
            this.x=gameMap.widthBlock-1;

        if(this.y>gameMap.heightBlock-1){
            this.y=0;
        }
        if(this.y<0)
            this.y=gameMap.heightBlock-1;
    }

    this.snakeCollision=function(){
        for(var i=0;i<this.tailLenght;i++){
            if(this.x ==this.tail[i].x && this.y == this.tail[i].y)
            {
                console.log("zderzenie");
                return true;
            }
        }
        return false;
    }
}

var points = new function(){
    this.x = Math.round(Math.random()*(gameMap.widthBlock-1));
    this.y = Math.round(Math.random()*(gameMap.heightBlock-1));

    this.draw = function(){
        context.fillStyle="#ff0000";
        context.fillRect(this.x*gameMap.blockSize,this.y*gameMap.blockSize,gameMap.blockSize,gameMap.blockSize);
    }

    this.generateNewLocation=function(confirm){
        if(confirm){
            this.x = Math.round(Math.random()*(gameMap.widthBlock-1));
            this.y = Math.round(Math.random()*(gameMap.heightBlock-1));

            if(alreadyExist()){
                this.generateNewLocation(true);
            }
        }
    }
}

function alreadyExist(){
    for(var i=0;i<snake.tailLenght;i++){
        if(points.x == snake.tail[i].x && points.y == snake.tail[i].y)
            return true;
    }
    return false;

}

window.onload = function(){
    document.addEventListener("keydown",keyListener)
    setInterval(loop,1000/5);
}

function checkColision(){
    if (snake.x==points.x && snake.y == points.y) {
            snake.pts++;
            snake.tailLenght++;

            snake.tail[snake.tailLenght-1]=convertToVector(snake.tail[snake.tailLenght-2].x-1,snake.tail[snake.tailLenght-2].y)
            console.log(snake.tail[snake.tailLenght-1]);
            return true;
     }
     else
        return false;
}

function reset(confirm){
    if(confirm){
        snake.tailLenght=3;
        snake.pts=0;
        points.generateNewLocation();
    }
}

function loop(){
context.fillStyle="#000000";
context.fillRect(0,0,canvas.width,canvas.height);
snake.updateTail();
snake.updatePosition();
snake.checkWall();
points.generateNewLocation(checkColision());
snake.draw();
points.draw();
reset(snake.snakeCollision());
}

function keyListener(e){
    var kcode = e.keyCode;
    switch(kcode){
    case 87:
        //w
        if(snake.updateY !=1 ){
            snake.updateX= 0;
            snake.updateY=-1;
        }
        break;
    case 83:
        //s
        if(snake.updateY !=-1 ){
            snake.updateX = 0;
            snake.updateY=1;
        }
        break;
    case 65:
        if(snake.updateX !=1 ){
            snake.updateX=-1;
            snake.updateY=0;
        }
        break;
        //a
    case 68:
        if(snake.updateX !=-1 ){
            snake.updateX =1;
            snake.updateY=0;
        }
        //d
        break;
    }
}