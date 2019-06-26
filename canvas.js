var canvas = document.querySelector('canvas');
document.getElementById ("btnsave").addEventListener ("click", reset, false);

canvas.height = window.innerHeight * 0.61;
canvas.width = window.innerWidth/2.02;
canvas.style = "background: #DDD;";

var context = canvas.getContext('2d');

var centreX = canvas.width/2;
var centreY = canvas.height/2;

var scale = 50;

var cols = Math.floor(canvas.width / scale);
var rows = Math.floor(canvas.height / scale);

function GetIndex(x, y){
    return x + y * cols;
}

function isValid(x, y){
    if(x < 0 || y < 0 || x > cols || y > rows){
        return false;
    }else{
        return true;
    }
}

function RemoveWalls(current, next){

    var x = current.i - next.i;
    if(x == 1){
        current.walls[3] = false;
        next.walls[1] = false;
    }else if(x == -1){
        current.walls[1] = false;
        next.walls[3] = false;
    }

    var y = current.j - next.j;
    if(y == 1){
        current.walls[0] = false;
        next.walls[2] = false;
    }else if(y == -1){
        current.walls[2] = false;
        next.walls[0] = false;
    }
}

function Cell(i , j){
    this.i = i; // I think this is X
    this.j = j; // I think this is y
    this.visited = false;

                // Top Right Bottom Left
    this.walls = [true, true, true, true];

    this.CheckNeighbours = function(){
        var neighbours = [];
        var top, right, bottom, left;

        if(isValid(i, j-1)){
            top =       grid[GetIndex(i, j - 1)];
        }

        if(isValid(i + 1, j)){
            right =     grid[GetIndex(i + 1, j)];
        }

        if(isValid(i, j+1)){
            bottom =    grid[GetIndex(i, j + 1)];
        }

        if(isValid(i - 1, j)){
            left =      grid[GetIndex(i - 1, j)];
        }

        if(top && !top.visited){
            neighbours.push(top);
        }

        if(right && !right.visited){
            neighbours.push(right);
        }

        if(bottom && !bottom.visited){
            neighbours.push(bottom);
        }

        if(left && !left.visited){
            neighbours.push(left);
        }

        if(neighbours.length > 0){
            var random = Math.floor(Math.random() * neighbours.length);                       
            return neighbours[random];
        }else{
            return undefined;
        }

    }

    this.Show = function(){
        var x = this.i * scale;
        var y = this.j * scale;

        if(this.visited){
            context.beginPath();
            context.rect(x, y, 1 * scale, 1 * scale);
            context.fillStyle = "lightgreen";
            context.fill();
        }

        context.strokeStyle = "black";
        /*
        // Draw top line
        if(this.walls[0]){
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + scale, y);
            context.stroke();
        }
        */

        // Draw right line
        if(this.walls[1]){
            context.beginPath();
            context.moveTo(x + scale, y);
            context.lineTo(x + scale, y + scale);
            context.stroke();
        }

        // Draw Bottom line
        if(this.walls[2]){
            context.beginPath();
            context.moveTo(x, y + scale);
            context.lineTo(x + scale, y + scale);
            context.stroke();
        }

        // Draw left line
        /*
        if(this.walls[3]){
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x, y + scale);
            context.stroke();
       }
       */
    }

    this.Highlight = function(){
            context.beginPath();
            context.rect(this.i*scale+1, this.j*scale+1, 1 * scale-1, 1 * scale-1);
            context.fillStyle = "pink";
            context.fill();
    }
}

var grid = [];

for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++){
        grid.push(new Cell(i, j));
    }
}

var stack = [];
var current = grid[0];
var next;

var timer = 0;
var speed = 1;

animate();
function animate(){
    timer++;

    if(timer % speed == 0){
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Do stuff here
        for(var i = 0; i < grid.length; i++){
            grid[i].Show();
        }
        
        current.Highlight();
        next = current.CheckNeighbours();
    
        if(next){
            next.visited = true;

            if(current.CheckNeighbours()){
                stack.push(current);
            }
            
            RemoveWalls(current, next);

            current = next;
        }else if(stack.length > 0){
            current = stack.pop();
        }
    }

    requestAnimationFrame(animate);
}

function reset(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    scale = parseInt(document.getElementById("Scale").value);
    speed = parseInt(document.getElementById("Speed").value);

    if (speed < 1){
        speed = 1;
    }

    cols = Math.floor(canvas.width / scale);
    rows = Math.floor(canvas.height / scale);
    
    stack = [];
    grid = [];
    next = null;

    for(var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            grid.push(new Cell(i, j));
        }
    }
    current = grid[0];
}
