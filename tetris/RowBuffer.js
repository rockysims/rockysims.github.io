function RowBuffer(width)
{
	this.width = width;
    this.rows = new Array();
    this.count = 0;
}

RowBuffer.prototype.add = function(row)
{
	this.rows[this.count] = new Array(this.width);
	for (var c = 0; c < this.width; c++)
	{
		this.rows[this.count][c] = row[c];
	}
    this.count++;
}

RowBuffer.prototype.getSize = function()
{
    return this.count;
}

RowBuffer.prototype.remove = function()
{
    this.count--;
    return this.rows[this.count];
}