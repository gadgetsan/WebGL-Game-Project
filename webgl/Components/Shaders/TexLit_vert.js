Loader.MultiLoad(["Shaders/Shader"], function(){

	TexLit_vert.inheritsFrom( Shaders.Shader );

	function TexLit_vert(){
		this._type = GL.VERTEX_SHADER;
		this._source = "\
		    attribute vec3 aVertexPosition;\
		    attribute vec3 aVertexNormal;\
		    attribute vec2 aTextureCoord;\
\
		    uniform mat4 uMVMatrix;\
		    uniform mat4 uPMatrix;\
		    uniform mat3 uNMatrix;\
\
		    uniform vec3 uAmbientColor;\
\
		    uniform vec3 uLightingDirection;\
		    uniform vec3 uDirectionalColor;\
\
		    uniform bool uUseLighting;\
\
		    varying vec2 vTextureCoord;\
		    varying vec3 vLightWeighting;\
\
		    void main(void) {\
		        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\
		        vTextureCoord = aTextureCoord;\
\
		        if (!uUseLighting) {\
		            vLightWeighting = vec3(1.0, 1.0, 1.0);\
		        } else {\
		            vec3 transformedNormal = uNMatrix * aVertexNormal;\
		            float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);\
		            vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;\
		        }\
		    }\
		"
		this.Compile();
	}

	

	TexLit_vert.prototype.AddVars = function(program){

	    program.vertexPositionAttribute = GL.getAttribLocation(program, "aVertexPosition");
	    GL.enableVertexAttribArray(program.vertexPositionAttribute);

	    program.textureCoordAttribute = GL.getAttribLocation(program, "aTextureCoord");
	    GL.enableVertexAttribArray(program.textureCoordAttribute);


        program.vertexNormalAttribute = GL.getAttribLocation(program, "aVertexNormal");
        GL.enableVertexAttribArray(program.vertexNormalAttribute);

	    program.pMatrixUniform = GL.getUniformLocation(program, "uPMatrix");
	    program.mvMatrixUniform = GL.getUniformLocation(program, "uMVMatrix");
        program.nMatrixUniform = GL.getUniformLocation(program, "uNMatrix");
        
        program.useLightingUniform = GL.getUniformLocation(program, "uUseLighting");
        program.ambientColorUniform = GL.getUniformLocation(program, "uAmbientColor");
        program.lightingDirectionUniform = GL.getUniformLocation(program, "uLightingDirection");
        program.directionalColorUniform = GL.getUniformLocation(program, "uDirectionalColor");

	}

  	Shaders.TexLit_vert = TexLit_vert;
	Loader.Loaded("Shaders/TexLit_vert");
	Shaders.Add("TexLit_vert", new TexLit_vert());
});