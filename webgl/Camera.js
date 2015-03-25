
var Camera = new Gdgt_Camera();

function Gdgt_Camera(){

}

Gdgt_Camera.prototype.Init = function(){
	GL.clearColor(0.0, 0.0, 0.0, 1.0);
    GL.enable(GL.DEPTH_TEST);


    GL.viewport(0, 0, GL.viewportWidth, GL.viewportHeight);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    mat4.perspective(45, GL.viewportWidth / GL.viewportHeight, 0.1, 100.0, Engine.pMatrix);

    mat4.identity(Engine.mvMatrix);
}