function include(src) { document.write("<script src=\"" + src + "\"> </script>"); }

include("tetris/Board.js");
include("tetris/TileMap.js");
include("tetris/TileMapRaw.js");
include("tetris/RowBuffer.js");
include("tetris/BlockGenerator.js");
include("tetris/Block.js");
include("tetris/DebugUtils.js");

function TetrisUnlimitedGame(container, width, height, clearence, rate, fastRate, keyRepeatSpeed, rotateSpeed, onClass, offClass)
{
	this.container = container;
    this.width = width;
    this.height = height;
    this.clearence = clearence;
    this.rate = rate;
	this.fastRate = fastRate;
	this.onClass = onClass;
	this.offClass = offClass;
	this.keyRepeatSpeed = keyRepeatSpeed;
	this.rotateSpeed = rotateSpeed;
	
    this.timeoutId = -1;
	this.leftIntervalId = -1;
	this.rightIntervalId = -1;
	this.upIntervalId = -1;
	this.downIntervalId = -1;
    
    this.blockGenerator = new BlockGenerator();
    this.nextBlock = this.blockGenerator.newRandom();
    this.fastDrop = false;
    this.paused = false;
    this.board = new Board(this.container, this.width, this.height, this.clearence, this.onClass, this.offClass);
    
	this.tetrises = 0;
	
    this.start();
}

//left UI
TetrisUnlimitedGame.prototype.uiLeftStart = function()
{
	if (this.leftIntervalId == -1)
	{
		var self = this;
		this.board.moveLeft();
		this.leftIntervalId = setInterval(function() { self.board.moveLeft(); }, this.keyRepeatSpeed);
	}
}

TetrisUnlimitedGame.prototype.uiLeftEnd = function()
{
    clearInterval(this.leftIntervalId);
	this.leftIntervalId = -1;
}

//right UI
TetrisUnlimitedGame.prototype.uiRightStart = function()
{
	if (this.rightIntervalId == -1)
	{
		var self = this;
		this.board.moveRight();
		this.rightIntervalId = setInterval(function() { self.board.moveRight(); }, this.keyRepeatSpeed);
	}
}

TetrisUnlimitedGame.prototype.uiRightEnd = function()
{
    clearInterval(this.rightIntervalId);
	this.rightIntervalId = -1;
}

//up UI
TetrisUnlimitedGame.prototype.uiUpStart = function()
{
	if (this.upIntervalId == -1)
	{
		var self = this;
		this.board.rotate();
		this.upIntervalId = setInterval(function() { self.board.rotate(); }, this.rotateSpeed);
	}
}

TetrisUnlimitedGame.prototype.uiUpEnd = function()
{
    clearInterval(this.upIntervalId);
	this.upIntervalId = -1;
}

//down UI
TetrisUnlimitedGame.prototype.uiDownStart = function()
{
	if (this.downIntervalId == -1)
	{
		var self = this;
		this.board.moveDown();
		this.downIntervalId = setInterval(function() { self.board.moveDown(); }, this.fastRate);
	}
}

TetrisUnlimitedGame.prototype.uiDownEnd = function()
{
    clearInterval(this.downIntervalId);
	this.downIntervalId = -1;
}

TetrisUnlimitedGame.prototype.changeClearence = function(c)
{
    //Validity checking done in method.
    this.board.changeClearence(c);
}

TetrisUnlimitedGame.prototype.changeRate = function(r)
{
    //TODO: add validity checking
    this.rate = r;
}

TetrisUnlimitedGame.prototype.changeFastRate = function(r)
{
    //TODO: add validity checking
    this.fastRate = r;
}

TetrisUnlimitedGame.prototype.changeKeyRepeatRate = function(r)
{
    //TODO: add validity checking
    this.keyRepeatRate = r;
}

TetrisUnlimitedGame.prototype.changeRotateSpeed = function(r)
{
    //TODO: add validity checking
    this.rotateSpeed = r;
}

TetrisUnlimitedGame.prototype.uiTogglePause = function()
{
    this.paused = !this.paused;
}

TetrisUnlimitedGame.prototype.stop = function()
{
	//*
	var kids = this.container.childNodes;
	while (kids.length > 0)
		this.container.removeChild(kids[0]);
		//*/
	//delete this.container
	//this.passedContainer.removeChild(0);
	//this.container.innerHTML = "";
	
	clearTimeout(this.timeoutId);
	this.timeoutId = -1;
	this.leftIntervalId = -1;
	this.rightIntervalId = -1;
	this.upIntervalId = -1;
	this.downIntervalId = -1;
}

TetrisUnlimitedGame.prototype.start = function()
{
	//this.container = document.createElement("div");
	//this.passedContainer.appendChild(this.container);
	
    this.tetrises = 0;
    var self = this;
    this.timeoutId = setTimeout(function() { self.tick(); }, this.rate);
}

TetrisUnlimitedGame.prototype.tick = function()
{
	if (!this.paused)
	{
		if (this.board.needsNewFallingBlock())
		{
		    this.board.setFallingBlock(this.nextBlock);
		    this.nextBlock = this.blockGenerator.newRandom();
		}
		
		var tetrisesCompleted = this.board.tick();
		this.tetrises += tetrisesCompleted;
	}
	
	var self = this;
	var r = (this.fastDrop) ? this.fastRate : this.rate;
	this.timeoutId = setTimeout(function() { self.tick(); }, r);
}
