Loader.MultiLoad(["Shaders/Shader"], function(){

	Texture_frag.inheritsFrom( Shaders.Shader );

	function Texture_frag(){
		this._type = GL.FRAGMENT_SHADER;
		this._source = "\
		    precision mediump float;\
\
		    varying vec2 vTextureCoord;\
\
		    uniform sampler2D uSampler;\
\
		    void main(void) {\
		        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\
		    }\
		"
		this.Compile();
	}



	Texture_frag.prototype.AddVars = function(program){
	    program.samplerUniform = GL.getUniformLocation(program, "uSampler");
	}

  	Shaders.Texture_frag = Texture_frag;
	Loader.Loaded("Shaders/Texture_frag");
	Shaders.Add("Texture_frag", new Texture_frag());
});