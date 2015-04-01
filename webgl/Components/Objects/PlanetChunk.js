	PlanetChunk.inheritsFrom( Models.Sphere );

	function PlanetChunk(latitudeIndex, longitudeIndex, seed){	
		//on initialise tout de suite le model
		
		this.Init();
		this.LoadTexture("moon.gif", function(){});
		
		this.Perlin = [1, 20, 100, 1, 10, 5];
		this.LongitudeBands = 10;
		this.LatitudeBands = 10;
		this.OriginalRadius = 5;
    
        this.longitudeIndex = longitudeIndex;
        this.latitudeIndex = latitudeIndex;
        this.seed = seed;
        
        this.LOD = 1;
        
	}
	
	//en fait la planete override la création de la sphère pour avoir un look custom
	PlanetChunk.prototype.Init = function(){
	    
	    var radius = this.OriginalRadius;
	    
        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];

        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;
        var u = 1 - (this.longitudeIndex / this.LongitudeBands);
        var v = 1 - (this.latitudeIndex / this.LatitudeBands);

        var indexData = [];
        
        var initialTheta = this.latitudeIndex * Math.PI / (this.LatitudeBands);
        var initialPhi = this.longitudeIndex * 2 * Math.PI / (this.LongitudeBands);

        
        for (var latNumber=0; latNumber <= this.LOD; latNumber++) {
            var theta = initialTheta + latNumber * Math.PI / (this.LatitudeBands * this.LOD);
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber=0; longNumber <= this.LOD; longNumber++) {
                var phi = initialPhi + longNumber * 2 * Math.PI / (this.LongitudeBands * this.LOD);
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1 - (this.longitudeIndex / this.LongitudeBands);
                var v = 1 - (this.latitudeIndex / this.LatitudeBands);

                //on va additionner les différentes valeurs de Perlin
                radius = this.OriginalRadius;
                for (var perlinIndex=0; perlinIndex < this.Perlin.length; perlinIndex+=2) {
                	var perlinValue =  noise.perlin3(x*this.Perlin[perlinIndex], y*this.Perlin[perlinIndex], z*this.Perlin[perlinIndex]);
                	//console.log((Math.abs(perlinValue)));
                    radius += (Math.abs(perlinValue))*this.Perlin[perlinIndex+1];
                }
                
                normalData.push(x);
                normalData.push(y);
                normalData.push(z);
                textureCoordData.push(u);
                textureCoordData.push(v);
                vertexPositionData.push(radius * x);
                vertexPositionData.push(radius * y);
                vertexPositionData.push(radius * z);
                
                
            }
        }
                
        
        var indexData = [];
        for (var latNumber=0; latNumber < this.LOD; latNumber++) {
            for (var longNumber=0; longNumber < this.LOD; longNumber++) {
                var first = (latNumber * (this.LOD + 1)) + longNumber;
                var second = first + this.LOD + 1;
                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);

                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }

        this._vertexNormalBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexNormalBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(normalData), GL.STATIC_DRAW);
        this._vertexNormalBuffer.itemSize = 3;
        this._vertexNormalBuffer.numItems = normalData.length / 3;

        this._texCoordBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this._texCoordBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(textureCoordData), GL.STATIC_DRAW);
        this._texCoordBuffer.itemSize = 2;
        this._texCoordBuffer.numItems = textureCoordData.length / 2;

        this._vertexPositionBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexPositionBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertexPositionData), GL.STATIC_DRAW);
        this._vertexPositionBuffer.itemSize = 3;
        this._vertexPositionBuffer.numItems = vertexPositionData.length / 3;

        this._vertexIndexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), GL.STATIC_DRAW);
        this._vertexIndexBuffer.itemSize = 1;
        this._vertexIndexBuffer.numItems = indexData.length;

    }
    
    PlanetChunk.prototype.ChangeLOD = function(newLOD){
      this.LOD = newLOD
      this.Init();
    }

    PlanetChunk.prototype.Animate = function(elapsedTime){
    
    }   
    
    
    Objects.PlanetChunk = PlanetChunk;
    Loader.Loaded("Objects/PlanetChunk");