function TileMap(width, height)
{
	this.width = width;
	this.height = height;
	
	this.TILE_WIDTH = 15;
	this.TILE_HEIGHT = 15;
	
    this.rowBuffer = new RowBuffer(width);
    this.tileMapRaw = new TileMapRaw(width, height);
	this.tileElem = new Array(height);
	for (var r = 0; r < height; r++)
	{
		this.tileElem[r] = new Array(width);
		for (var c = 0; c < width; c++)
			this.tileElem[r][c] = null;
	}
}

TileMap.prototype.blockConflicts = function(block)
{
	var w = block.getWidth();
	var h = block.getHeight();
	var cOff = block.offsetX;
	var rOff = block.offsetY;
	
	if (0 <= cOff && cOff+w <= this.width)
	{
		if (0 <= rOff && rOff+h <= this.height)
		{
			var blockMap = block.getMap();
			var map = this.tileMapRaw.getRegionMap(cOff, rOff, w, h);
			
			for (var r = 0; r < h; r++)
			{
				for (var c = 0; c < w; c++)
				{
					if (map[r][c] == true && blockMap[r][c] == true)
					{
						return true;
					}
				}
			}
			
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return true;
	}
}

TileMap.prototype.addBlock = function(block)
{
	this.tileMapRaw.merge(block);
	return this.clearTetrises(); 
}

TileMap.prototype.clearTetrises = function()
{
	var count = 0;
	var tetris = false;
	
	for (var r = this.height - 1; r >= 0; r--)
	{
		tetris = true;
		for (var c = 0; c < this.width; c++)
		{
			if (this.tileMapRaw.getTile(r, c) == false)
			{
				tetris = false;
			}
		}
		
		if (count != 0)
		{
			this.tileMapRaw.setTileRow(r + count, this.tileMapRaw.getTileRow(r));
			for (var c = 0; c < this.width; c++)
				this.tileMapRaw.setTile(r, c, false);
		}
		
		if (tetris)
			count++;
	}
	
	return count;
}

TileMap.prototype.getClearence = function()
{
    for (var r = 0; r < this.height; r++)
    {
        for (var c = 0; c < this.width; c++)
        {
            if (this.tileMapRaw.getTile(r, c) == true)
            {
                return r;
            }
        }   
    }
    
    return this.height;
}

TileMap.prototype.sink = function()
{
    var rowIsEmpty = true;
    for (var c = 0; c < this.width; c++)
    {
        if (this.tileMapRaw.getTile(this.height - 1, c)  == true)
            rowIsEmpty = false;
    }
    
    if (!rowIsEmpty)
    {
        this.rowBuffer.add(this.tileMapRaw.getTileRow(this.height - 1));
    
        for (var r = this.height - 1; r >= 1; r--)
            this.tileMapRaw.setTileRow(r, this.tileMapRaw.getTileRow(r - 1));
        
        for (var c = 0; c < this.width; c++)
            this.tileMapRaw.setTile(0, c, false);
        
        return true;
    }
    else
	{
        return false;
	}
}

TileMap.prototype.rise = function()
{
    if (this.rowBuffer.getSize() >= 1)
    {
        for (var r = 1; r < this.height; r++)
        {
            for (var c = 0; c < this.width; c++)
            {
                this.tileMapRaw.setTile(r - 1, c, this.tileMapRaw.getTile(r, c));
            }
        }
        
        var newRow = this.rowBuffer.remove();
        this.tileMapRaw.setTileRow(this.height - 1, newRow);
        
        return true;
    }
    else
	{
        return false;
	}
}

TileMap.prototype.clear = function()
{
    for (var r = 0; r < this.height; r++)
    {
        for (var c = 0; c < this.width; c++)
        {
            this.tileMapRaw.setTile(r, c, false);
        }
    }
}

TileMap.prototype.render = function(fallingBlock, container, onClass, offClass)
{
	container.style.width = (this.TILE_WIDTH * this.width) + "px";
	container.style.height = (this.TILE_HEIGHT * this.height) + "px";
	
	var tag = null;
	var tiles = this.tileMapRaw.makeCopy();
	if (fallingBlock != null)
		tiles.merge(fallingBlock);
	
	for (var r = 0; r < this.height; r++)
	{
		for (var c = 0; c < this.width; c++)
		{
			if (this.tileElem[r][c] == null)
			{
				tag = document.createElement("img");
				
				tag.style.width =  this.TILE_WIDTH + "px";
				tag.style.height = this.TILE_HEIGHT + "px";
				tag.style.position = "relative";
				
				this.tileElem[r][c] = tag;
				container.appendChild(tag);
			}
			
			if (!this.prevTileMapRaw || this.prevTileMapRaw.getTile(r, c) != tiles.getTile(r, c))
			{
				if (tiles.getTile(r, c))
				{
					this.tileElem[r][c].src = "tetris/onTile.JPG";
					this.tileElem[r][c].className = onClass;
				}
				else
				{
					this.tileElem[r][c].src = "tetris/offTile.JPG";
					this.tileElem[r][c].className = offClass;
				}
			}
		}
	}
	this.prevTileMapRaw = tiles;
}