  function PhysicalObject(other){
      this.Mass = 1;
      this.Speed = [0,0,0];
      this.Forces = [];
      this.Parent = other;
      
      
      if(this.Parent.Location == null){
        this.Parent.Location = [0,0,0];
      }
      other.PhysicalObject = this;
      
      
      this.NewFrame = function(){
        this.Forces = [];
      }
      
      this.UpdateForce = function(elapsedTime){
      }
      
      this.UpdateMovement = function(elapsedTime){
        
        //on commence par calculer la force totale
        this.force = [0,0,0];
        if(this.updateForce){
          for(var i=0;i<this.Forces.length;i++){
            force[0] += this.Forces[i][0];
            force[1] += this.Forces[i][1];
            force[2] += this.Forces[i][2];
          }
          //this.updateForce = false;
        }
        
        //f=ma, on applique l'acceleration avec la force
        if(vec3.length(force) > 0.0001){
            var acceleration = [this.force[0] / this.Mass, this.force[1] / this.Mass, this.force[2] / this.Mass];
            this.Speed[0] += acceleration[0] * elapsedTime;
            this.Speed[1] += acceleration[1] * elapsedTime;
            this.Speed[2] += acceleration[2] * elapsedTime;
        }
        console.log(vec3.length(this.Speed));
        this.Parent.Location[0] += this.Speed[0]* elapsedTime;
        this.Parent.Location[1] += this.Speed[1]* elapsedTime;
        this.Parent.Location[2] += this.Speed[2]* elapsedTime;
      }
      
      this.AddForce = function(force){
        this.updateForce = true;
        this.Forces.push(force);
      }
      
      Physics.RegisterPhysicsObject(this);
      
  }

  Characteristics.PhysicalObject = PhysicalObject;
  Loader.Loaded("Characteristics/PhysicalObject");