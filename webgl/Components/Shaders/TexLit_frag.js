Loader.MultiLoad(["Shaders/Shader"], function(){

	TexLit_frag.inheritsFrom( Shaders.Shader );

	function TexLit_frag(){
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
		        vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\
		        gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);\
		    }\
		"
		this.Compile();
	}



	TexLit_frag.prototype.AddVars = function(program){
	    program.samplerUniform = GL.getUniformLocation(program, "uSampler");
	}

  	Shaders.TexLit_frag = TexLit_frag;
	Loader.Loaded("Shaders/TexLit_frag");
	Shaders.Add("TexLit_frag", new TexLit_frag());
});