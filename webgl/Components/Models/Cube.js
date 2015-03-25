
Cube.inheritsFrom( TexturedComponent );
function Cube(){
	//un component peut avoir une liste de component enfant
    this.Location = [0.0, 0.0, -7.0];
    this.drawingType = GL.TRIANGLES;

}

//on doit initialiser la geometrie de l'objet en créant un objet dans le GPU
Cube.prototype.Init = function(){

    //emplacement de chaque vertex
	this._VertexPositionBuffer = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, this._VertexPositionBuffer);

    vertices = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ];

    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
    this._VertexPositionBuffer.itemSize = 3;
    this._VertexPositionBuffer.numItems = 24;

    //couleur de chaque Vertex
    this._vertexColorBuffer =  GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexColorBuffer);    

    colors = [
      [1.0, 0.0, 0.0, 1.0],     // Front face
      [1.0, 1.0, 0.0, 1.0],     // Back face
      [0.0, 1.0, 0.0, 1.0],     // Top face
      [1.0, 0.5, 0.5, 1.0],     // Bottom face
      [1.0, 0.0, 1.0, 1.0],     // Right face
      [0.0, 0.0, 1.0, 1.0],     // Left face
    ];
    var unpackedColors = [];
    for (var i in colors) {
      var color = colors[i];
      for (var j=0; j < 4; j++) {
        unpackedColors = unpackedColors.concat(color);
      }
    }
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(unpackedColors), GL.STATIC_DRAW);
    this._vertexColorBuffer.itemSize = 4;
    this._vertexColorBuffer.numItems = 24;


    //Index Buffer
    this._vertexIndexBuffer = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
    var indices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ]
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), GL.STATIC_DRAW);
    this._vertexIndexBuffer.itemSize = 1;
    this._vertexIndexBuffer.numItems = 36;

    //Texture Coord Buffer
    this._texCordBuffer = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, this._texCordBuffer);
    var textureCoords = [
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(textureCoords), GL.STATIC_DRAW);
    this._texCordBuffer.itemSize = 2;
    this._texCordBuffer.numItems = 24;

}