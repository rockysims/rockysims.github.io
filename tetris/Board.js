function Board(container, width, height, clearence, onClass, offClass)
{
    this.container = container;
    this.width = width;
    this.height = height;
    this.clearence = clearence;
	this.onClass = onClass;
	this.offClass = offClass;
    
    this.fallingBlock = null;
    this.tileMap = new TileMap(width, height);
    
    this.clear();
}

Board.prototype.moveLeft = function()
{
    if (this.canMoveBlockLeft(this.fallingBlock))
	{
		this.fallingBlock.moveLeft();
		this.render();
	}
}

Board.prototype.moveRight = function()
{
    if (this.canMoveBlockRight(this.fallingBlock))
	{
        this.fallingBlock.moveRight();
		this.render();
	}
}

Board.prototype.rotate = function()
{
    if (this.canRotateBlock(this.fallingBlock))
	{
        this.fallingBlock.rotate();
		this.render();
	}
}

Board.prototype.moveDown = function()
{
    if (this.canMoveBlockDown(this.fallingBlock))
	{
        this.fallingBlock.moveDown();
		this.render();
	}
}

Board.prototype.canMoveBlockLeft = function(block)
{
	if (block == null)
		return false;
	
    var blk = block.makeCopy();
    blk.offsetX--;
    return !this.tileMap.blockConflicts(blk);
}

Board.prototype.canMoveBlockRight = function(block)
{
	if (block == null)
		return false;
	
    var blk = block.makeCopy();
    blk.offsetX++;
    return !this.tileMap.blockConflicts(blk);
}

Board.prototype.canMoveBlockDown = function(block)
{
	if (block == null)
		return false;
	
    var blk = block.makeCopy();
    blk.offsetY++;
    return !this.tileMap.blockConflicts(blk);
}

Board.prototype.canRotateBlock = function(block)
{
	if (block == null)
		return false;
	
    var blk = block.makeCopy();
	var diff = Math.abs(blk.getWidth() - blk.getHeight());
	var moveCount = 0;
	blk.rotate();
	if (this.tileMap.blockConflicts(blk))
	{
		for (; diff > 0; diff--)
		{
			moveCount++;
			blk.moveLeft();
			if (!this.tileMap.blockConflicts(blk))
			{
				for (; moveCount > 0; moveCount--)
					block.moveLeft();
				return true;
			}
		}
		return false;
	}
	else
		return true;
}

Board.prototype.changeClearence = function(c)
{
    //TODO: add validity checking
    this.clearence = c;
    this.render();
}

Board.prototype.clear = function()
{
    this.tileMap.clear();
    this.render();
}

Board.prototype.needsNewFallingBlock = function()
{
    return (this.fallingBlock == null);
}

Board.prototype.setFallingBlock = function(block)
{
	block.offsetX = Math.round((this.width - block.getWidth()) / 2);
    this.fallingBlock = block;
}

Board.prototype.tick = function()
{
    var tetrises = 0;
    
    if (this.canMoveBlockDown(this.fallingBlock))
    {
        this.fallingBlock.moveDown();
    }
    else
    {
        tetrises = this.tileMap.addBlock(this.fallingBlock);
        this.ensureClearence();
        this.fallingBlock = null;
    }
    
    this.render();
    
    return tetrises;
}

Board.prototype.ensureClearence = function()
{
    while (this.tileMap.getClearence() < this.clearence)
    {
        if (!this.tileMap.sink())
            break;
    }
    while (this.tileMap.getClearence() > this.clearence)
    {
        if (!this.tileMap.rise())
            break;
    }
}

Board.prototype.render = function()
{
	this.tileMap.render(this.fallingBlock, this.container, this.onClass, this.offClass);
}