Loader.MultiLoad(["Characteristics/Gravity", "Objects/TestObject"], function(){
    
    function TestEnvironment(){
        this.Location = [0,0,0];
        this.Children = [];
        this.Children[0] = new Objects.TestObject();
        this.Children[0].Location = [1,1,1];
        
        Characteristics.Gravity(this);
    }

    Objects.TestEnvironment = TestEnvironment;
    Loader.Loaded("Objects/TestEnvironment");
});