var GL;
var Engine = new Gdgt_Engine();
console.log("Engine Loaded...");

function Gdgt_Engine(){
    this.mvMatrix = mat4.create();
    this.mvMatrixStack = [];
    this.pMatrix = mat4.create();
    this.normalMatrix = mat3.create();
}

Gdgt_Engine.prototype.initGL = function(canvas) {
    //console.log("InitGL");
    try {
        GL = canvas.getContext("experimental-webgl");
        GL.viewportWidth = canvas.width;
        GL.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!GL) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

Gdgt_Engine.prototype.MvMPush = function() {
    var copy = mat4.create();
    mat4.set(this.mvMatrix, copy);
    this.mvMatrixStack.push(copy);
}

Gdgt_Engine.prototype.MvMPop = function() {
    if (this.mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    this.mvMatrix = this.mvMatrixStack.pop();
}

Gdgt_Engine.prototype.setMatrixUniforms = function() {
    GL.uniformMatrix4fv(Shaders.Program.pMatrixUniform, false, this.pMatrix);
    GL.uniformMatrix4fv(Shaders.Program.mvMatrixUniform, false, this.mvMatrix);
    
    mat4.toInverseMat3(this.mvMatrix, this.normalMatrix);
    mat3.transpose(this.normalMatrix);
    GL.uniformMatrix3fv(Shaders.Program.nMatrixUniform, false, this.normalMatrix);
}

Gdgt_Engine.prototype.degToRad = function(degrees) {
    return degrees * Math.PI / 180;
}

Gdgt_Engine.prototype.Translate = function(location) {
    mat4.translate(this.mvMatrix, location);
}

Gdgt_Engine.prototype.RotateDeg = function(deg, vector) {
    if(vector == null){vector = [0,1,0]}
    mat4.rotate(this.mvMatrix, Engine.degToRad(deg), vector);
}


