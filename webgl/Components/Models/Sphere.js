Loader.MultiLoad(["Models/TexturedComponent"], function(){

  Sphere.inheritsFrom( Models.TexturedComponent );

  function Sphere(other){
  	//un component peut avoir une liste de component enfant
      this.drawingType = GL.TRIANGLES;
      this.rotationMatrix = mat4.create();
      mat4.identity(this.rotationMatrix);
      this._vertexPositionBuffer = {};
      this._vertexIndexBuffer = {};
      this._texCoordBuffer = {};
      this._vertexNormalBuffer = {};
      
      this.Parent = other;
      if(this.Parent.Location == null){
        this.Parent.Location = [0,0,0];
      }      
      
      this.Init();

  }

  //on doit initialiser la geometrie de l'objet en créant un objet dans le GPU
  Sphere.prototype.Init = function(){
        console.log("INIT SPHERE");
        
        var latitudeBands = 30;
        var longitudeBands = 30;
        var radius = 2;

        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];
        for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
              
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1 - (longNumber / longitudeBands);
                var v = 1 - (latNumber / latitudeBands);

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
        for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;
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

    Sphere.prototype.Draw = function(){

      var lighting = true;
        if (lighting) {
          
            GL.uniform1i(Shaders.Program.useLightingUniform, lighting);
            GL.uniform3f(Shaders.Program.ambientColorUniform, 0, 0, 0);

            var lightingDirection = [0,-1,0];
            var adjustedLD = vec3.create();
            vec3.normalize(lightingDirection, adjustedLD);
            vec3.scale(adjustedLD, -1);
            GL.uniform3fv(Shaders.Program.lightingDirectionUniform, adjustedLD);

            GL.uniform3f(Shaders.Program.directionalColorUniform,1,1,1);
        }


        mat4.translate(Engine.mvMatrix, this.Parent.Location);

        mat4.multiply(Engine.mvMatrix, this.rotationMatrix);

        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.uniform1i(Shaders.Program.samplerUniform, 0);

        GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexPositionBuffer);
        GL.vertexAttribPointer(Shaders.Program.vertexPositionAttribute, this._vertexPositionBuffer.itemSize, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ARRAY_BUFFER, this._texCoordBuffer);
        GL.vertexAttribPointer(Shaders.Program.textureCoordAttribute, this._texCoordBuffer.itemSize, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexNormalBuffer);
        GL.vertexAttribPointer(Shaders.Program.vertexNormalAttribute, this._vertexNormalBuffer.itemSize, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
        Engine.setMatrixUniforms();
        GL.drawElements(GL.TRIANGLES, this._vertexIndexBuffer.numItems, GL.UNSIGNED_SHORT, 0);
      }


  Models.Sphere = Sphere;
  Loader.Loaded("Models/Sphere");
});