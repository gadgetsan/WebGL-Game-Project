Loader.MultiLoad(["Models/TexturedComponent"], function(){

  Sphere.inheritsFrom( Models.TexturedComponent );

  function Sphere(){
  	//un component peut avoir une liste de component enfant
      this.Location = [0.0, 0.0, -7.0];
      this.drawingType = GL.TRIANGLES;
      this.rotationMatrix = mat4.create();
      mat4.identity(this.rotationMatrix);

  }

  //on doit initialiser la geometrie de l'objet en créant un objet dans le GPU
  Sphere.prototype.Init = function(){

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

        moonVertexNormalBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, moonVertexNormalBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(normalData), GL.STATIC_DRAW);
        moonVertexNormalBuffer.itemSize = 3;
        moonVertexNormalBuffer.numItems = normalData.length / 3;

        moonVertexTextureCoordBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(textureCoordData), GL.STATIC_DRAW);
        moonVertexTextureCoordBuffer.itemSize = 2;
        moonVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

        moonVertexPositionBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, moonVertexPositionBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertexPositionData), GL.STATIC_DRAW);
        moonVertexPositionBuffer.itemSize = 3;
        moonVertexPositionBuffer.numItems = vertexPositionData.length / 3;

        moonVertexIndexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), GL.STATIC_DRAW);
        moonVertexIndexBuffer.itemSize = 1;
        moonVertexIndexBuffer.numItems = indexData.length;

  }

    Sphere.prototype.Draw = function(){

      var lighting = true;
        GL.uniform1i(Shaders.Program.useLightingUniform, lighting);
        if (lighting) {
            GL.uniform3f(Shaders.Program.ambientColorUniform, 1, 1, 1);

            var lightingDirection = [1,1,1];
            var adjustedLD = vec3.create();
            vec3.normalize(lightingDirection, adjustedLD);
            vec3.scale(adjustedLD, -1);
            GL.uniform3fv(Shaders.Program.lightingDirectionUniform, adjustedLD);

            GL.uniform3f(Shaders.Program.directionalColorUniform,1,1,1);
        }

        mat4.identity(Engine.mvMatrix);

        mat4.translate(Engine.mvMatrix, [0, 0, -6]);

        mat4.multiply(Engine.mvMatrix, this.rotationMatrix);

        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.uniform1i(Shaders.Program.samplerUniform, 0);

        GL.bindBuffer(GL.ARRAY_BUFFER, moonVertexPositionBuffer);
        GL.vertexAttribPointer(Shaders.Program.vertexPositionAttribute, moonVertexPositionBuffer.itemSize, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
        GL.vertexAttribPointer(Shaders.Program.textureCoordAttribute, moonVertexTextureCoordBuffer.itemSize, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ARRAY_BUFFER, moonVertexNormalBuffer);
        GL.vertexAttribPointer(Shaders.Program.vertexNormalAttribute, moonVertexNormalBuffer.itemSize, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
        Engine.setMatrixUniforms();
        GL.drawElements(GL.TRIANGLES, moonVertexIndexBuffer.numItems, GL.UNSIGNED_SHORT, 0);
      }


  Models.Sphere = Sphere;
  Loader.Loaded("Models/Sphere");
});