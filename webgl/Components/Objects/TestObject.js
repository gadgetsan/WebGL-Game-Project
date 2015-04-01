Loader.MultiLoad(["Characteristics/PhysicalObject", "Models/Sphere"], function(){
    
    function TestObject(){
        this.Location = [0,0,0];
        this.Model = new Models.Sphere(this);
        
        Characteristics.PhysicalObject(this);
    }

    Objects.TestObject = TestObject;
    Loader.Loaded("Objects/TestObject");
});