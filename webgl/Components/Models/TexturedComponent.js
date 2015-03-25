Loader.MultiLoad(["Models/Component"], function(){

    TexturedComponent.inheritsFrom( Models.Component );

    function TexturedComponent(){
    	this._vertexIndexBuffer;
        this._texCordBuffer;
        this.texture;
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


    	//on va déplacer la matrice avant d'afficher le component
    	Engine.MvMPush();

    	Engine.Translate(this.Location);

    	Engine.RotateDeg(this.Angle, this.rotationVector);

        //buffer de position des vertex
    	GL.bindBuffer(GL.ARRAY_BUFFER, this._VertexPositionBuffer);
        GL.vertexAttribPointer(Shaders.Program.vertexPositionAttribute, this._VertexPositionBuffer.itemSize, GL.FLOAT, false, 0, 0);

        //application de la texture    
        GL.bindBuffer(GL.ARRAY_BUFFER, this._texCordBuffer);
        GL.vertexAttribPointer(Shaders.Program.textureCoordAttribute, this._texCordBuffer.itemSize, GL.FLOAT, false, 0, 0);

        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.uniform1i(Shaders.Program.samplerUniform, 0);

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