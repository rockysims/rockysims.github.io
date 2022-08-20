function BlockGenerator()
{
    this.allBlocks = new Array();
    this.size = 0;
    
    this.generateAll();
}

BlockGenerator.prototype.newRandom = function()
{
    var block = this.allBlocks[Math.round(Math.random()*(this.size - 1))].makeCopy();
    return block;
}

BlockGenerator.prototype.generateAll = function()
{
    var m;
    var h;
    var w;
    
    //xx
    //xx
    h = 2;
    w = 2;
    m = new Array(h);
    for (var r = 0; r < h; r++)
        m[r] = new Array(w);
    m[0][0] = true;
    m[0][1] = true;
    m[1][0] = true;
    m[1][1] = true;
    this.allBlocks[this.size] = new Block(m, w, h);
    this.size++;

    //x_
    //xx
    //x_
    h = 3;
    w = 2;
    m = new Array(h);
    for (var r = 0; r < h; r++)
        m[r] = new Array(w);
    m[0][0] = true;
    m[0][1] = false;
    m[1][0] = true;
    m[1][1] = true;
    m[2][0] = true;
    m[2][1] = false;
    this.allBlocks[this.size] = new Block(m, w, h);
    this.size++;

    //_x
    //xx
    //x_
    h = 3;
    w = 2;
    m = new Array(h);
    for (var r = 0; r < h; r++)
        m[r] = new Array(w);
    m[0][0] = false;
    m[0][1] = true;
    m[1][0] = true;
    m[1][1] = true;
    m[2][0] = true;
    m[2][1] = false;
    this.allBlocks[this.size] = new Block(m, w, h);
    this.size++;

    //x_
    //xx
    //_x
    h = 3;
    w = 2;
    m = new Array(h);
    for (var r = 0; r < h; r++)
        m[r] = new Array(w);
    m[0][0] = true;
    m[0][1] = false;
    m[1][0] = true;
    m[1][1] = true;
    m[2][0] = false;
    m[2][1] = true;
    this.allBlocks[this.size] = new Block(m, w, h);
    this.size++;
    
    //x_
    //x_
    //xx
    h = 3;
    w = 2;
    m = new Array(h);
    for (var r = 0; r < h; r++)
        m[r] = new Array(w);
    m[0][0] = true;
    m[0][1] = false;
    m[1][0] = true;
    m[1][1] = false;
    m[2][0] = true;
    m[2][1] = true;
    this.allBlocks[this.size] = new Block(m, w, h);
    this.size++;

    //_x
    //_x
    //xx
    h = 3;
    w = 2;
    m = new Array(h);
    for (var r = 0; r < h; r++)
        m[r] = new Array(w);
    m[0][0] = false;
    m[0][1] = true;
    m[1][0] = false;
    m[1][1] = true;
    m[2][0] = true;
    m[2][1] = true;
    this.allBlocks[this.size] = new Block(m, w, h);
    this.size++;

    //x
    //x
    //x
    //x
    h = 4;
    w = 1;
    m = new Array(h);
    for (var r = 0; r < h; r++)
        m[r] = new Array(w);
    m[0][0] = true;
    m[1][0] = true;
    m[2][0] = true;
    m[3][0] = true;
    this.allBlocks[this.size] = new Block(m, w, h);
    this.size++;
}