Loader.MultiLoad(["Shaders/Shader"], function(){

	Texture_vert.inheritsFrom( Shaders.Shader );

	function Texture_vert(){
		this._type = GL.VERTEX_SHADER;
		this._source = "\
		    attribute vec3 aVertexPosition;\
		    attribute vec2 aTextureCoord;\
\
		    uniform mat4 uMVMatrix;\
		    uniform mat4 uPMatrix;\
\
		    varying vec2 vTextureCoord;\
\
\
		    void main(void) {\
		        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\
		        vTextureCoord = aTextureCoord;\
		    }\
		"
		this.Compile();
	}

	

	Texture_vert.prototype.AddVars = function(program){

	    program.vertexPositionAttribute = GL.getAttribLocation(program, "aVertexPosition");
	    GL.enableVertexAttribArray(program.vertexPositionAttribute);

	    program.textureCoordAttribute = GL.getAttribLocation(program, "aTextureCoord");
	    GL.enableVertexAttribArray(program.textureCoordAttribute);

	    program.pMatrixUniform = GL.getUniformLocation(program, "uPMatrix");
	    program.mvMatrixUniform = GL.getUniformLocation(program, "uMVMatrix");
	}

  	Shaders.Texture_vert = Texture_vert;
	Loader.Loaded("Shaders/Texture_vert");
	Shaders.Add("Texture_vert", new Texture_vert());
});