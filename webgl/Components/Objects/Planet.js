Loader.MultiLoad(["Models/Sphere", "Objects/PlanetChunk"], function(){

	Planet.inheritsFrom( Models.Sphere );

	function Planet(){	
		//on initialise tout de suite le model
		
		this.Chunks = [];
		this.Init();
		this.LoadTexture("moon.gif", function(){});
	}
	
	//en fait la planete override la création de la sphère pour avoir un look custom
	Planet.prototype.Init = function(){
    
        //on initialise le 'bruit'
        seed = Math.random();

        var latitudeBands = 5;
        var longitudeBands = 5;
        var originalRadius = 50;
        
        //on créé les chunks
        for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
            for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
                pc = new Objects.PlanetChunk(latNumber, longNumber);
                pc.OriginalRadius = originalRadius;
                pc.LatitudeBands = latitudeBands;
                pc.LongitudeBands = longitudeBands;
                this.Chunks.push(pc);
            }
        }
        
        //on initialise les chunks
        for (var chunkIndex = 0; chunkIndex < this.Chunks.length; chunkIndex+=1) {
            this.Chunks[chunkIndex].Init();
        }
        this.Chunks[7].ChangeLOD(50);
  }

	Planet.prototype.Animate = function(elapsedTime){

        var deltaX = 0;
        var deltaY = 0;
        
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, Engine.degToRad(deltaX / 10), [0, 1, 0]);

        mat4.rotate(newRotationMatrix, Engine.degToRad(deltaY / 10), [1, 0, 0]);

        mat4.multiply(newRotationMatrix, this.rotationMatrix, this.rotationMatrix);

	}
	
	
    Planet.prototype.Draw = function(){
        
        mat4.multiply(Engine.mvMatrix, this.rotationMatrix);
        //on affiche les Chunks
        for (var chunkIndex = 0; chunkIndex < this.Chunks.length; chunkIndex+=1) {
            this.Chunks[chunkIndex].Draw();
        }
    }
	

	Objects.Planet = Planet;
	Loader.Loaded("Objects/Planet");
})