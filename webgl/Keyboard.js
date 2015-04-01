
var Keyboard = new Gdgt_Keyboard();


function Gdgt_Keyboard(){
    this._keyCallbacks = [];
}

Gdgt_Keyboard.prototype.Subscribe = function(key, callback){
    if(this._keyCallbacks[key] == null){
        this._keyCallbacks[key] = [callback];
    }else{
        this._keyCallbacks[key].push(callback);
    }
}

Gdgt_Keyboard.prototype.HandleKeys = function(){
    for (i = 0; i < this._keyCallbacks.length; i++) { 
        if(currentlyPressedKeys[i] && this._keyCallbacks[i] != null){
            for (j = 0; j < this._keyCallbacks[i].length; j++) { 
                this._keyCallbacks[i][j]();
            }
        }
    }
}



var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}
function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;