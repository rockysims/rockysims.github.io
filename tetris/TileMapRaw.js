function TileMapRaw(width, height)
{
	this.width = width;
	this.height = height;
	
	this.tiles = new Array(height);
	for (var r = 0; r < height; r++)
	{
		this.tiles[r] = new Array(width);
		for (var c = 0; c < width; c++)
			this.tiles[r][c] = false;
	}	
}

TileMapRaw.prototype.makeCopy = function()
{
	var map = new Array(this.height);
	for (var r = 0; r < this.height; r++)
	{
		map[r] = new Array(this.width);
		for (var c = 0; c < this.width; c++)
			map[r][c] = this.tiles[r][c];
	}
	
	var rawMap = new TileMapRaw(this.width, this.height);
	rawMap.setMap(map);
	return rawMap;
}

TileMapRaw.prototype.merge = function(block)
{
	 //Add Block
    var w = block.getWidth();
    var h = block.getHeight();
    var colOffset = block.offsetX;
    var rowOffset = block.offsetY;
    var map = block.getMap();
    
    for (var r = 0; r < h; r++)
    {
        for (var c = 0; c < w; c++)
        {
            if (map[r][c] == true)
                this.tiles[r + rowOffset][c + colOffset] = true;
        }
    }
}

TileMapRaw.prototype.getRegionMap = function(x, y, w, h)
{
	var map = new Array(h);
	for (var r = 0; r < h; r++)
	{
		map[r] = new Array(w);
		for (var c = 0; c < w; c++)
			map[r][c] = this.tiles[y + r][x + c];
	}
	
	return map;
}

TileMapRaw.prototype.getTile = function(r, c)
{
	return this.tiles[r][c];
}

TileMapRaw.prototype.setTile = function(r, c, value)
{
	this.tiles[r][c] = value;
}

TileMapRaw.prototype.getTileRow = function(r)
{
	return this.tiles[r];
}

TileMapRaw.prototype.setTileRow = function(r, newRow)
{
	for (var c = 0; c < this.width; c++)
		this.tiles[r][c] = newRow[c];
}

TileMapRaw.prototype.setMap = function(map)
{
	this.tiles = map;
}