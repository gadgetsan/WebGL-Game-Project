Loader.MultiLoad(["Models/Cube"], function(){

	ProceduralBuilding.inheritsFrom( Models.Cube );

	function ProceduralBuilding(){	
		//on initialise tout de suite le model
		this.Init();
		this.LoadTexture('crate.gif', function(){});
        this.drawingType = GL.TRIANGLES;
        
        this.rotationMatrix = mat4.create();
        mat4.identity(this.rotationMatrix);
	}
	
	//en fait la planete override la création de la sphère pour avoir un look custom
	ProceduralBuilding.prototype.Init = function(){
	    
	    var numberOfSides = 6;
	    var width = 5.0;
	    var length = 5.0;
	    var height = 1.0;
	    var levels = 1;
	    
	    var vertices = [];
	    var normals = [];
	    var indexes = [];
	    var textureCoords = [];
	    
	    //on va commencer par un niveau
	    
	    var currentLevel = 0.0;
	    var nextLevel = currentLevel+height;
	    var currentVertexCount = 0;
	    
	    var sideAngle = (Math.PI*2)/numberOfSides;
	    
        var normalRotationMatrix = mat4.create();
        mat4.identity(normalRotationMatrix);
        mat4.rotate(normalRotationMatrix, Math.PI*2 - sideAngle, [0, 1, 0]);
        
        //pour afficher notre forme à partir du centre, on doit trouver l'apotheme de cette forme
        var apothem = width / (2*Math.tan(Math.PI/numberOfSides))
    
        for(j = 0; j < levels; j++){
            var currenAngle = 0;
            var currentX = 0;
            var currentY = 0;
            var currentNormal = [0,0,-1];
            
            textureCoords = textureCoords.concat([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]);
            
            //la matrice qu'on va utiliser pout faire la rotation des normales
            
            
            vertices = vertices.concat([currentX, currentLevel, currentY, 
                                        currentX, nextLevel, currentY]);            
                                        
            normals = normals.concat(currentNormal);
            normals = normals.concat(currentNormal);
            
            currentVertexCount += 2;
            for (i = 0; i < numberOfSides; i++) { 
                currentX += width * Math.cos(currenAngle);
                currentY += length * Math.sin(currenAngle);
                
                vertices = vertices.concat([currentX, currentLevel, currentY, 
                                          currentX, nextLevel, currentY]);
                
                indexes = indexes.concat([currentVertexCount-2, currentVertexCount, currentVertexCount-1,
                                        currentVertexCount, currentVertexCount-1, currentVertexCount+1]);
                                        
                mat4.multiplyVec3(normalRotationMatrix, currentNormal);               
                                        
                normals = normals.concat(currentNormal);
                normals = normals.concat(currentNormal);
                
                textureCoords = textureCoords.concat([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]);
                              
                currentVertexCount += 2;
                currenAngle += sideAngle;
                                          
            }
            currentLevel += height+0.01;
            nextLevel = currentLevel+height;
        }
	    
	    //indexes
                        
          
        console.dir(vertices);

        this._vertexNormalBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexNormalBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(normals), GL.STATIC_DRAW);
        this._vertexNormalBuffer.itemSize = 3;
        this._vertexNormalBuffer.numItems = normals.length / 3;
        
        this._texCoordBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this._texCoordBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(textureCoords), GL.STATIC_DRAW);
        this._texCoordBuffer.itemSize = 2;
        this._texCoordBuffer.numItems = textureCoords.length / 2;

        this._vertexPositionBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexPositionBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
        this._vertexPositionBuffer.itemSize = 3;
        this._vertexPositionBuffer.numItems = vertices.length / 3;

        this._vertexIndexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), GL.STATIC_DRAW);
        this._vertexIndexBuffer.itemSize = 1;
        this._vertexIndexBuffer.numItems = indexes.length;
	    

    }
  

	ProceduralBuilding.prototype.Animate = function(elapsedTime){

        var deltaX = 2;
        var deltaY = 2;
        
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, Engine.degToRad(deltaX / 10), [0, 1, 0]);

        mat4.rotate(newRotationMatrix, Engine.degToRad(deltaY / 10), [1, 0, 0]);

        mat4.multiply(newRotationMatrix, this.rotationMatrix, this.rotationMatrix);

	}
	

	Objects.ProceduralBuilding = ProceduralBuilding;
	Loader.Loaded("Objects/ProceduralBuilding");
})