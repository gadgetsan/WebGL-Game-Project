//Un shader très simple sans texture (mais avec de la lumière)
Loader.MultiLoad(["Shaders/Shader"], function(){

	Lit_frag.inheritsFrom( Shaders.Shader );

	function Lit_frag(){
		this._type = GL.FRAGMENT_SHADER;
		this._source = "\
		    precision mediump float;\
\
		    varying vec2 vTextureCoord;\
		    varying vec3 vLightWeighting;\
\
		    uniform sampler2D uSampler;\
\
		    void main(void) {\
		        vec4 color = vec4(1.0, 1.0, 1.0, 1.0);\
		        gl_FragColor = vec4(color.rgb * vLightWeighting, 1.0);\
		    }\
		"
		this.Compile();
	}



	Lit_frag.prototype.AddVars = function(program){
	    program.samplerUniform = GL.getUniformLocation(program, "uSampler");
	}

  	Shaders.Lit_frag = Lit_frag;
	Loader.Loaded("Shaders/Lit_frag");
	Shaders.Add("Lit_frag", new Lit_frag());
});