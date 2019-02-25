<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"></meta>
        <title>Maze Generator</title>
        <link rel="stylesheet" href="..\..\CSS\css.css"></link>
    </head>
    <style>
        canvas{
            border: 1px solid black;
            margin: 10px;
        }

        body{
            margin : 0;
        }

    </style>
    <body>
        <h1>
            Maze Generator
        </h1>
        <div>
            <?php include '..\..\menu.php'; ?>
        </div>
        
        <canvas></canvas>
        

        <div id="settings">
            <h2>Settings</h2>
            Scale&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <input id="Scale" type="text" value="50"></input><br /><br />
            Speed&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<input id="Speed" type="text" value="1"></input><br /><br />
            
            <button id="btnsave">Regenerate Maze</button> 
        </div>   

        <script src="canvas.js" type="module"></script> 
        <script src="cell.js" type="module"></script> 
            

        <div class="review">
            <h2>Code Review</h2>
            <h3>Sources:<br /><a href="https://www.youtube.com/watch?v=HyK_Q5rrcr4&index=14&list=WL&t=785s">Maze Generation</a></h3>
            <div class="explanation">
                <h3>Concepts:</h3>
                <h4>Concept 1</h4>
            </div>
        </div>
        

    </body>
</html>