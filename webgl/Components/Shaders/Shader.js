function Shader(){
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


Shader.prototype.Compile = function(){

    var shader;

    shader = GL.createShader(this._type);

    GL.shaderSource(shader, this._source);
    GL.compileShader(shader);

    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
        alert(GL.getShaderInfoLog(shader));
        return null;
    }

    this.shader = shader;
}

Shader.prototype.AddVars = function(program){
    program.samplerUniform = GL.getUniformLocation(program, "uSampler");
}

Shaders.Shader = Shader;
Loader.Loaded("Shaders/Shader");
Shaders.Add("Shader", new Shader());