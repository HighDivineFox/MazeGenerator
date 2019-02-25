
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var scale = document.getElementById("Scale").value;
var speed = document.getElementById("Speed").value;

var cols = Math.floor(canvas.width / scale);
var rows = Math.floor(canvas.height / scale);

export function Cell(i , j){
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
        /*
        context.beginPath();
        context.rect(this.i * scale, this.j * scale, 1 * scale, 1 * scale);
        context.strokeStyle = "black";
        context.stroke();
        */

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

function isValid(x, y){
    if(x < 0 || y < 0 || x > cols || y > rows){
        return false;
    }else{
        return true;
    }
}