function Component(){
	//un component peut avoir une liste de component enfant
	this.Children = [];
	this.Location = [-1.5, 0.0, -7.0];
	this.Angle = 0;

	this._VertexPositionBuffer;
	this._vertexColorBuffer;

	this.rotationVector = [1,1,1];
	this.drawingType = GL.TRIANGLE_STRIP;


}

//on affiche l'objet en utilisant le buffer dans le CPU (si présent)
//on affiche aussi ses enfants
Component.prototype.Draw = function(){


	//on va déplacer la matrice avant d'afficher le component
	Engine.MvMPush();

	Engine.Translate(this.Location);

	Engine.RotateDeg(this.Angle, this.rotationVector);

    //buffer de position des vertex
	GL.bindBuffer(GL.ARRAY_BUFFER, this._VertexPositionBuffer);
    GL.vertexAttribPointer(Shaders.Program.vertexPositionAttribute, this._VertexPositionBuffer.itemSize, GL.FLOAT, false, 0, 0);

    //buffer de couleur des vertex
    GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexColorBuffer);
    GL.vertexAttribPointer(Shaders.Program.vertexColorAttribute, this._vertexColorBuffer.itemSize, GL.FLOAT, false, 0, 0);

    Engine.setMatrixUniforms();
    GL.drawArrays(this.drawingType, 0, this._VertexPositionBuffer.numItems);

	Engine.MvMPop();
}

Component.prototype.Animate = function(elapsedTime){
	this.Angle += (90 * elapsedTime) / 1000.0;
}


//TO_Implement
//GL au lieu de gl
//MV_MATRIX au lieu de mvMatrix
//ajouter l'objet 3D comme objet utilitaire
Models.Component = Component;
Loader.Loaded("Models/Component");