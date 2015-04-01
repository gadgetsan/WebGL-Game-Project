Loader.MultiLoad(["Models/Component"], function(){

    TexturedComponent.inheritsFrom( Models.Component );

    function TexturedComponent(){
        this.texture;
        
        this._vertexPositionBuffer;
        this._vertexIndexBuffer;
        this._texCoordBuffer;
        this._vertexNormalBuffer;
    }

    //on affiche l'objet en utilisant le buffer dans le CPU (si présent)
    //on affiche aussi ses enfants


    TexturedComponent.prototype.LoadTexture = function(filename, callback){

        this.texture = GL.createTexture();
        this.texture.image = new Image();
        var tex = this.texture; 
        this.texture.image.onload = function() {
            GL.bindTexture(GL.TEXTURE_2D, tex);
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, tex.image);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
            GL.bindTexture(GL.TEXTURE_2D, null);
            callback();
        }

        this.texture.image.src = folder + "Data/" +filename;
    }


    TexturedComponent.prototype.Draw = function(){

        //juste un petit test pour modifier le vertexBuffer sur la go
        //GL.bufferSubData(GL.ARRAY_BUFFER, Shaders.Program.vertexPositionAttribute, new Float32Array([Math.random()]));

        var lighting = true;
        if (lighting) {
          
            GL.uniform1i(Shaders.Program.useLightingUniform, lighting);
            GL.uniform3f(Shaders.Program.ambientColorUniform, 0, 0, 0);

            var lightingDirection = [0,0,-1];
            var adjustedLD = vec3.create();
            vec3.normalize(lightingDirection, adjustedLD);
            vec3.scale(adjustedLD, -1);
            GL.uniform3fv(Shaders.Program.lightingDirectionUniform, adjustedLD);

            GL.uniform3f(Shaders.Program.directionalColorUniform,1,1,1);
        }
        
    	//on va déplacer la matrice avant d'afficher le component
    	Engine.MvMPush();

    	Engine.Translate(this.Location);
        mat4.multiply(Engine.mvMatrix, this.rotationMatrix);
        
        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.uniform1i(Shaders.Program.samplerUniform, 0);

        //buffer de position des vertex
    	GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexPositionBuffer);
        GL.vertexAttribPointer(Shaders.Program.vertexPositionAttribute, this._vertexPositionBuffer.itemSize, GL.FLOAT, false, 0, 0);
        
        //application de la texture    
        GL.bindBuffer(GL.ARRAY_BUFFER, this._texCoordBuffer);
        GL.vertexAttribPointer(Shaders.Program.textureCoordAttribute, this._texCoordBuffer.itemSize, GL.FLOAT, false, 0, 0);
        
        
        GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexNormalBuffer);
        GL.vertexAttribPointer(Shaders.Program.vertexNormalAttribute, this._vertexNormalBuffer.itemSize, GL.FLOAT, false, 0, 0);

        //buffer d'Index    this._vertexIndexBuffer
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);

        Engine.setMatrixUniforms();
        GL.drawElements(this.drawingType, this._vertexIndexBuffer.numItems, GL.UNSIGNED_SHORT, 0);

    	Engine.MvMPop();
    }


    //TO_Implement
    //GL au lieu de gl
    //MV_MATRIX au lieu de mvMatrix
    //ajouter l'objet 3D comme objet utilitaire
    Models.TexturedComponent = TexturedComponent;
    Loader.Loaded("Models/TexturedComponent");
});