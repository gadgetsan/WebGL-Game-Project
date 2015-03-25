Loader.MultiLoad(["Models/Sphere"], function(){

	Planet.inheritsFrom( Models.Sphere );

	function Planet(){	
		//on initialise tout de suite le model
		this.Init();
		this.LoadTexture("moon.gif", function(){});
	}

	Planet.prototype.Animate = function(elapsedTime){

        var deltaX = 1;
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, Engine.degToRad(deltaX / 10), [0, 1, 0]);

        var deltaY = 1;
        mat4.rotate(newRotationMatrix, Engine.degToRad(deltaY / 10), [1, 0, 0]);

        mat4.multiply(newRotationMatrix, this.rotationMatrix, this.rotationMatrix);

	}

	Objects.Planet = Planet;
	Loader.Loaded("Objects/Planet");
})