
var Time = new Gdgt_Time();

function Gdgt_Time(){
	this.lastTime = 0;
	this.Elapsed = 0;

}

Gdgt_Time.prototype.CalculateDelta = function(){
    var timeNow = new Date().getTime();
	if(this.lastTime != 0){		
  		this.Elapsed = timeNow - this.lastTime;
	}
    this.lastTime = timeNow;
}