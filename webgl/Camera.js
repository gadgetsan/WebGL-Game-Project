
var Camera = new Gdgt_Camera();

function Gdgt_Camera(){
    this.Location = [0.0, 0.0, 5.0];
    this.fov = 45;
    this.RotationVector = [-1,0,0];
    this.RotationAngle = Math.PI/4;

}

Gdgt_Camera.prototype.Init = function(){
    //on l'abonne au boutons de souris      
    self = this;
    //w
    Keyboard.Subscribe(87, function(){
        self.Location[2] -= 0.5;
    });
    
    //s
    Keyboard.Subscribe(83, function(){
        self.Location[2] += 0.5;
    });
    
    //a
    Keyboard.Subscribe(65, function(){
        self.Location[0] -= 0.5;
    });
    
    //d
    Keyboard.Subscribe(68, function(){
        self.Location[0] += 0.5;
    });
    
    //[SPACE]
    Keyboard.Subscribe(32, function(){
        self.Location[1] += 0.5;
    });
    //[ALT]
    Keyboard.Subscribe(18, function(){
        self.Location[1] -= 0.5;
    });
    
    Mouse.Subscribe('down', function(x, y){
        self.fov += y/10;
    })
}

Gdgt_Camera.prototype.Draw = function(){
	GL.clearColor(0.0, 0.0, 0.0, 1.0);
    GL.enable(GL.DEPTH_TEST);


    GL.viewport(0, 0, GL.viewportWidth, GL.viewportHeight);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    mat4.perspective(this.fov, GL.viewportWidth / GL.viewportHeight, 0.1, 200.0, Engine.pMatrix);

    mat4.identity(Engine.mvMatrix);
    
    Engine.Rotate(this.RotationAngle, this.RotationVector);
    
    //on va faire un déplacement de tout inverse au deplacement de la camera
    //pour créer l'illusion que la camera est à un emplacement spécifique
    Engine.Translate([-this.Location[0], -this.Location[1], -this.Location[2]]);
}