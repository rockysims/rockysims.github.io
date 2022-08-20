function Block(map, width, height)
{
    this.map = map;
    this.height = height;
    this.width = width;
    
    this.offsetX = 0; //Public
    this.offsetY = 0; //Public
}

Block.prototype.moveLeft = function()
{
    this.offsetX--;
}

Block.prototype.moveRight = function()
{
    this.offsetX++;
}

Block.prototype.moveDown = function()
{
    this.offsetY++;
}

Block.prototype.rotate = function()
{
    var newH = this.width;
    var newW = this.height;
    
    var m = new Array(newH);
    for (var r = 0; r < newH; r++)
    {
        m[r] = new Array(newW);
        for (var c = 0; c < newW; c++)
            m[r][c] = this.map[newW-1-c][r];
    }
    
    this.map = m;
	this.width = newW;
	this.height = newH;
}

Block.prototype.getWidth = function()
{
    return this.width;
}

Block.prototype.getHeight = function()
{
    return this.height;
}

Block.prototype.getMap = function()
{
    return this.map;
}

Block.prototype.makeCopy = function()
{
    var block = new Block(this.map, this.width, this.height);
    block.offsetX = this.offsetX;
    block.offsetY = this.offsetY;
    return block;
}