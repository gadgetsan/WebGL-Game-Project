
var Physics = new Gdgt_Physics();

function Gdgt_Physics(){
    this.PhysicsObjects = [];

}

Gdgt_Physics.prototype.RegisterPhysicsObject = function(obj){
    this.PhysicsObjects.push(obj);
}

Gdgt_Physics.prototype.Update = function(elapsedTime){
    for (var i = 0; i < this.PhysicsObjects.length; i++) { 
        this.PhysicsObjects[i].NewFrame(elapsedTime)
    }
    for (var i = 0; i < this.PhysicsObjects.length; i++) { 
        this.PhysicsObjects[i].UpdateForce(elapsedTime)
    }
    for (var i = 0; i < this.PhysicsObjects.length; i++) { 
        this.PhysicsObjects[i].UpdateMovement(elapsedTime)
    }
}
