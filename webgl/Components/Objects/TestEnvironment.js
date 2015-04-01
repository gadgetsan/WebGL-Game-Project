Loader.MultiLoad(["Characteristics/Gravity", "Objects/TestObject"], function(){
    
    function TestEnvironment(){
        this.Location = [0,0,0];
        new Characteristics.Gravity(this);
        this.Children = [];
        this.Children[0] = new Objects.TestObject();
        this.Children[0].Location = [0,1,1];

        this.Draw = function(){
            for(var i=0;i<this.Children.length;i++){
                this.Children[i].Draw();
            }
        }
        
    }

    Objects.TestEnvironment = TestEnvironment;
    Loader.Loaded("Objects/TestEnvironment");
});