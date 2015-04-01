
var Mouse = new Gdgt_Mouse();

function Gdgt_Mouse(){
    this._mouseCallbacks = [];
}

Gdgt_Mouse.prototype.Subscribe = function(type, callback){
    if(this._mouseCallbacks[type] == null){
        this._mouseCallbacks[type] = [callback];
    }else{
        this._mouseCallbacks[type].push;
    }
}

Gdgt_Mouse.prototype.HandleMove = function(type, moveX, moveY){
    if(this._mouseCallbacks[type] != null){
        for (j = 0; j < this._mouseCallbacks[type].length; j++) { 
            this._mouseCallbacks[type][j](moveX, moveY);
        }
    }
    
    if(this._mouseCallbacks['any'] != null){
        for (j = 0; j < this._mouseCallbacks['any'].length; j++) { 
            this._mouseCallbacks['any'][j](moveX, moveY);
        }
    }
}

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

function handleMouseDown(event) {
    mouseDown = true;
}


function handleMouseUp(event) {
    mouseDown = false;
}


function handleMouseMove(event) {
    var newX = event.clientX;
    var newY = event.clientY;

    var deltaX = newX - lastMouseX
    var deltaY = newY - lastMouseY;
    if(mouseDown){
        Mouse.HandleMove('down', deltaX, deltaY)
    }else{
        Mouse.HandleMove('up', deltaX, deltaY)
    }
    lastMouseX = newX
    lastMouseY = newY;
}


document.onmousedown = handleMouseDown;
document.onmouseup = handleMouseUp;
document.onmousemove = handleMouseMove;