Loader.MultiLoad(["Characteristics/PhysicalObject", "Models/Sphere"], function(){
    
    function TestObject(){
        this.Location = [0,0,0];
        this.Model = new Models.Sphere(this);
        
        new Characteristics.PhysicalObject(this);

        this.Draw = function(){
            this.Model.Draw();
        }
    }

    Objects.TestObject = TestObject;
    Loader.Loaded("Objects/TestObject");
});