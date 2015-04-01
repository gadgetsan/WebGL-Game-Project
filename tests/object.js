
function OtherItem(){
    var OIPrivateVar = "default";
    
    var OIPrivateFunction = function(){
        console.log(OIPrivateVar);
    }
    
    this.OIPublicVar = "default";
    
    this.OISemiPublicFunction = function(){
        OIPrivateFunction();
    }
}

Item.inheritsFrom( OtherItem );

function Item(){
    var OIPrivateVar = "Overritten by Children";
    var IPrivateVar = "default";
    this.IPublicVar = "default";
}