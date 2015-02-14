////////////////////////////////////////////////////////////////////////////////
// START OF FILE ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param rows - or array
 * @param [columns] - or transposed
 * @constructor
 */
function Matrix(rows, columns)
{
    var i, j;
	
    
    if (Array.isArray(rows))
    {
        // special case, much comfort
        
        var m = rows; // matrix
        if (!Array.isArray(m[0]))
        {
            m = [m];
        }
        
        this.matrix = m;
        this.rows = m.length;
        this.columns = m[0].length;
        
        if (typeof columns === "boolean")
        {
            // transpose on
            if (columns === true)
            {
                var nm = [];
                var nr = this.columns;
                var nc = this.rows;
                
                for (i = 0; i < nr; i++)
                {
                    nm[i] = [];
                    for (j = 0; j < nc; j++)
                    {
                        nm[i][j] = this.matrix[j][i];
                    }
                }
                
                this.matrix = nm;
                this.rows = nr;
                this.columns = nc;
            }
        }
        
    }
    else
    {
        this.matrix = [];
        this.rows = rows;
        this.columns = columns;

        for (i = 0; i < rows; i++)
        {
            this.matrix[i] = [];
            for (j = 0; j < columns; j++)
            {
                this.matrix[i][j] = 0;
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// CLASS INSTANCE METHODS //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param index
 * @returns {*}
 */
Matrix.prototype.getIndex = function(index)
{
    var row = Math.floor(index / this.columns);
    var column = index - row * this.columns;
    
    return this.matrix[row][column];
};

/**
 * 
 * @param index
 * @param value
 */
Matrix.prototype.setIndex = function(index, value)
{
    var row = Math.floor(index / this.columns);
    var column = index - row * this.columns;

    this.matrix[row][column] = value;
};

/**
 * 
 * @param that
 * @returns {Matrix}
 */
Matrix.prototype.multiply = function(that)
{
    var result = new Matrix(this.rows, that.columns);
    
    for (var i = 0; i < this.rows; i++)
    {
        for (var j = 0; j < that.columns; j++)
        {
            var sum = 0;
            
            for (var k = 0; k < this.columns; k++)
            {
                sum += this.matrix[i][k] * that.matrix[k][j];
            }
            
            result.matrix[i][j] = sum;
        }
    }
    
    return result;
};

/**
 * 
 * @returns {string}
 */
Matrix.prototype.print = function()
{
    var msg = "\n";
    
    for (var i = 0; i < this.rows; i++)
    {
        for (var j = 0; j < this.columns; j++)
        {
            msg += "[" + this.matrix[i][j] + "]";
        }
        
        msg += "\n"
    }
    
    return msg;
};

/**
 * 
 * @returns {Matrix}
 */
Matrix.prototype.clone = function()
{
    var clone = new Matrix(this.rows, this.columns);
    
    for (var i = 0; i < this.rows; i++)
    {
        for (var j = 0; j < this.columns; j++)
        {
            clone.matrix[i][j] = this.matrix[i][j];
        }
    }
    
    return clone;
};

Matrix.prototype.transpose = function()
{
    return new Matrix(this.matrix, true);
};

////////////////////////////////////////////////////////////////////////////////
// STATIC METHODS //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param rows
 * @param columns
 * @param start
 * @returns {Matrix}
 */
Matrix.getNumberedMatrix = function(rows, columns, start)
{
    var nm = new Matrix(rows, columns);
    
    var c = (typeof start === "undefined") ? 1 : start;
    
    for (var i = 0; i < rows; i++)
    {
        for (var j = 0; j < columns; j++)
        {
            nm.matrix[i][j] = c;
            c++;
        }
    }
    
    return nm;
};

/**
 * 
 * @param size
 * @returns {Matrix}
 */
Matrix.getIdentityMatrix = function(size)
{
    var idm = new Matrix(size, size);
    
    for (var i = 0; i < size; i++)
    {
        idm.matrix[i][i] = 1;
    }
    
    return idm;
};

////////////////////////////////////////////////////////////////////////////////
// END OF FILE /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////