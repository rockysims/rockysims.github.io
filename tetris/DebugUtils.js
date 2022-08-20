function Timer()
{
	this.start();
}


Timer.prototype.start = function()
{
	this.s = (new Date()).getTime();
}

Timer.prototype.display = function()
{
	var e = (new Date()).getTime();
	var d = e - this.s;
	document.getElementById("errorDiv").innerHTML += "duration = " + d + "<br/>";
}

Timer.prototype.getDuration = function()
{
	var e = (new Date()).getTime();
	var d = e - this.s;
	return d;
}