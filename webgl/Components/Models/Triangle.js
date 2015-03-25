
Triangle.inheritsFrom( Component );
function Triangle(){
	//un component peut avoir une liste de component enfant
    this.Location = [-1.5, 0.0, -7.0];
    this.drawingType = GL.TRIANGLE_STRIP;
}


//on doit initialiser la geometrie de l'objet en créant un objet dans le GPU
Triangle.prototype.Init = function(){

    //emplacement de chaque vertex
    this._VertexPositionBuffer = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, this._VertexPositionBuffer);

    var vertices = [
         0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0
    ];

    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
    this._VertexPositionBuffer.itemSize = 3;
    this._VertexPositionBuffer.numItems = 3;

    //couleur de chaque Vertex
    this._vertexColorBuffer =  GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexColorBuffer);
    var colors = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ];
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(colors), GL.STATIC_DRAW);
    this._vertexColorBuffer.itemSize = 4;
    this._vertexColorBuffer.numItems = 3;


}