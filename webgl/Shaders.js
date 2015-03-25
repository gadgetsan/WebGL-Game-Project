//Fichier permettant de gérer la création et l'utilisation des shaders
var Shaders = new Gdgt_Shaders();

function Gdgt_Shaders(){
	this._shaders = [];
}

Gdgt_Shaders.prototype.Load = function(shaders, callback){
	//on va commencer par aller voir si ces shaders sont deja dans la liste
	for (i = 0; i < shaders.length; i++) { 
        var index = Shaders._shaders.indexOf(shaders[i]);
        if (index > -1) {
            shaders.splice(index, 1);
        }
	}


    Loader.MultiLoad(shaders, function(){
    	callback();
    });
}

Gdgt_Shaders.prototype.Add = function(name, shader){
	//pendant que le shader se load, il s'ajoute lui-même à la liste
	this._shaders[name] = shader;
}

Gdgt_Shaders.prototype.Use = function(shaders){
    this.Program = GL.createProgram();
    for (i = 0; i < shaders.length; i++) { 
    	GL.attachShader(this.Program, this._shaders[shaders[i]].shader);
	}
    GL.linkProgram(this.Program);


    if (!GL.getProgramParameter(this.Program, GL.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    GL.useProgram(this.Program);
    for (i = 0; i < shaders.length; i++) { 
    	this._shaders[shaders[i]].AddVars(this.Program);
	}
}