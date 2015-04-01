  function Gravity(other){
      this.Parent = other;
      
      if(this.Parent.Location == null){
        this.Parent.Location = [0,0,0];
      }
      if(this.Parent.Children == null){
        this.Parent.Children = [];
      }
      other.Gravity = this;
      
      
      this.NewFrame = function(elapsedTime){
      }
      
      this.UpdateForce = function(elapsedTime){
          //on va aller voir tout les enfants du parent et leur assigner une force relative à leur position
          for(var i=0;i<this.Parent.Children.length;i++){
              //on calcul le vecteur de direction de la 
              
              if(this.Parent.Children[i].Location != null){
                var deltaLocation = [];
                deltaLocation[0] = this.Parent.Location[0] - this.Parent.Children[i].Location[0]
                deltaLocation[1] = this.Parent.Location[1] - this.Parent.Children[i].Location[1]
                deltaLocation[2] = this.Parent.Location[2] - this.Parent.Children[i].Location[2]
                this.Parent.Children[i].PhysicalObject.AddForce(deltaLocation);
              }
              
          }
      }
      
      this.UpdateMovement = function(elapsedTime){
      }
      
      Physics.RegisterPhysicsObject(this);
      
  }

  Characteristics.Gravity = Gravity;
  Loader.Loaded("Characteristics/Gravity");