let oldGrid = [[]]
let newGrid = [[]]

const scale = 20;

class cell{
    constructor(state) {
        this.state = state;
    }
    SetState(state) {
        this.state = state;
    }
    GetState(){
        return this.state;
    }
    IncrementGeneration(){
        this.generation++;
    }
    ResetGeneration(){
        this.generation = 0;
    }
    GetGeneration(){
        return this.generation;
    }
}

function start(){
    var canvas = document.getElementById("myCanvas");
  
    canvas.setAttribute('width', window.innerWidth/scale);
    canvas.setAttribute('height', window.innerHeight/scale);
    for (let i = 0; i < (window.innerWidth/scale); i++){
        oldGrid[i] = [];
        newGrid[i] = [];
    }
    for (let i = 0; i < (window.innerWidth/scale); i++){
        for (let j = 0; j < (window.innerHeight/scale); j++){
            oldGrid[i][j] = new cell(false);
            newGrid[i][j] = new cell(false);
        }
    }
    iterateThrough();
}
function resize(e){
    var canvas = document.getElementById("myCanvas");
  
    canvas.setAttribute('width', window.innerWidth/scale);
    canvas.setAttribute('height', window.innerHeight/scale);
    for (let i = 0; i < (window.innerWidth/scale); i++){
        oldGrid[i] = [];
        newGrid[i] = [];
    }
    for (let i = 0; i < (window.innerWidth/scale); i++){
        for (let j = 0; j < (window.innerHeight/scale); j++){
            oldGrid[i][j] = new cell(false);
            newGrid[i][j] = new cell(false);
        }
    }

}

function draw(e){
    if(oldGrid.length < 5){
        return;
    }
    var canvas = document.getElementById("myCanvas");
  
   
    let mousepos = getMousePos(canvas, e);
    if(mousepos.x > 1 && mousepos.x < oldGrid.length-1 && mousepos.y > 1 && mousepos.y < oldGrid[0].length-1){
        oldGrid[mousepos.x][mousepos.y].SetState(true);
        oldGrid[mousepos.x+1][mousepos.y+1].SetState(true);
    }
}

function iterateThrough(){
       
    let aliveNum = 0;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    for (let i = 1; i < (window.innerWidth/scale) -1; i++){
        for (let j = 1; j < (window.innerHeight/scale) -1; j++){


                aliveNum+=oldGrid[i-1][j-1].GetState();
                aliveNum+=oldGrid[i-1][j].GetState();
                aliveNum+=oldGrid[i-1][j+1].GetState();
                aliveNum+=oldGrid[i][j+1].GetState();
                aliveNum+=oldGrid[i+1][j+1].GetState();
                aliveNum+=oldGrid[i+1][j].GetState();
                aliveNum+=oldGrid[i+1][j-1].GetState();
                aliveNum+=oldGrid[i][j-1].GetState();
                if(oldGrid[i][j].GetState() && aliveNum < 2){
                    newGrid[i][j].SetState(false);
                }
                else if(oldGrid[i][j].GetState() && aliveNum > 3){
                    newGrid[i][j].SetState(false);
                }
                else if(oldGrid[i][j].GetState() && (aliveNum == 2 || aliveNum == 3)){
                    newGrid[i][j].SetState(true);
                }
                else if(!oldGrid[i][j].GetState() && aliveNum == 3){
                    newGrid[i][j].SetState(true);
                }
                if(newGrid[i][j].GetState()){
                    newGrid[i][j].IncrementGeneration();
                    ctx.fillStyle = `rgb(
                    ${255-40*newGrid[i][j].GetGeneration()}, 
                    ${255-100*newGrid[i][j].GetGeneration()}, 
                    ${255-40*newGrid[i][j].GetGeneration()})`;
                }
                else{
                    newGrid[i][j].ResetGeneration();
                    ctx.fillStyle = "#111111";
                }
                ctx.fillRect(i, j, 1, 1);            
         
            aliveNum = 0;
        }
    }

    flipGrids();
    
    setTimeout(iterateThrough, 20);

}

function flipGrids(){
    
    for (let i = 1; i < (window.innerWidth/scale) -1; i++){
        for (let j = 1; j < (window.innerHeight/scale) -1; j++){
            oldGrid[i][j] = Object.assign(Object.create(Object.getPrototypeOf(newGrid[i][j])), newGrid[i][j])
        }
    }
}

function getMousePos(canvas, evt) {
    return {
        x: parseInt(evt.clientX/scale),
        y: parseInt(evt.clientY/scale),
        //x: parseInt((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        //y: parseInt((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}
function cloneArray(a){
    return a.map(e => Array.isArray(e) ? cloneArray(e) : e);
  };