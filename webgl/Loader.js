

var Loader = new Gdgt_Loader();
var GlobalScope = this;

function Gdgt_Loader(){    
    this._loaded = [];
    this._loading = [];
}

Gdgt_Loader.prototype.Load = function(name, callback){
    //si c'est pas deja loadé
    if(Loader._loaded.indexOf(name) != -1){callback(); return}
    console.log("Loading " + name);

    //on doit créer un Namespace pour cet élément (si il n'existe pas deja)
    var namespace = name.split("/")[0]
    if(GlobalScope[namespace] == null){
        GlobalScope[namespace] = {};
    }



    // DOM: Create the script element
    var script = document.createElement("script");
    // set the type attribute
    script.type = "application/javascript";
    // make the script element load file
    script.src = folder + "Components/"+ name +".js";

    Loader._loaded.push(name);
    //si il load deja, on ajoute le callback
    if(Loader._loading[name]){
        Loader._loading[name].push(callback);
    }else{
        Loader._loading[name] = [callback];
    }

    // finally insert the element to the body element in order to load the script
    document.body.appendChild(script);
}

Gdgt_Loader.prototype.Loaded = function(name){

    console.log("loaded " + name);
    //on va aller caller les callback
    async.each(Loader._loading[name], function(callback1, callback2){
        callback1();
        callback2();
    }, function(){
        //on va l'enlever de loading, on va le mettre dans loaded
        var index = Loader._loading.indexOf(name);
        if (index > -1) {
            Loader._loading.splice(index, 1);
            Loader._loaded.push(name);
        }
    })
}


Gdgt_Loader.prototype.MultiLoad = function(names, callback){
    async.eachSeries(names, Loader.Load, function(){
        callback();
    })
}