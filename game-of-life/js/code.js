function Cell(top, left, size) {
	this.alive = false;
	this.neighbors = [];
	this.id = -1;
	this.top = top;
	this.left = left;
	this.size = size;
	this.colorAlive = "#000000";
	this.colorDead = "#FFFFFF";
	this.border = "#FF0000";
	this.draw = function(ctx) {
		ctx.strokeStyle = this.border;
		ctx.font = "10px Arial";
		if (this.alive) {
			ctx.fillStyle = this.colorAlive;
			ctx.fillRect(this.top, this.left, this.size, this.size);
			//ctx.fillStyle = this.colorDead;
			//ctx.fillText(""+this.id, this.top+this.size/2.75, this.left+this.size/1.5);
		} else {
			ctx.fillStyle = this.colorDead;
			ctx.fillRect(this.top, this.left, this.size, this.size);
			//ctx.fillStyle = this.colorAlive;
			//ctx.fillText(""+this.id, this.top+this.size/2.75, this.left+this.size/1.5);
		}
		
		ctx.strokeRect(this.top, this.left, this.size, this.size);
	}
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

function Board(NCells, CellDim) {
	this.NCells = NCells;
	this.Fid = NCells*NCells;
	this.CellDim = CellDim;
	this.Cells = [];

	this.IintialAlive = 0;
	this.MaxAlive = 0;
	this.MinAlive = 0;
	this.NowAlive = 0;
	
	this.init = function(Nalive) {
		var id = 0;
		for (var i = 0; i < NCells; i++) {
			for (var j = 0; j < NCells; j++) {
				var c = new Cell(i*this.CellDim, j*this.CellDim, this.CellDim);
				c.neighbors = [	mod(id - 1, this.NCells) + i*NCells,
								mod(id + 1, this.NCells) + i*NCells,
								mod(id - NCells, this.Fid),
								mod(id + NCells, this.Fid),
								mod(mod(id - NCells, this.Fid) - 1, this.NCells) + mod(i-1,NCells)*NCells,
								mod(mod(id - NCells, this.Fid) + 1, this.NCells) + mod(i-1,NCells)*NCells,
								mod(mod(id + NCells, this.Fid) - 1, this.NCells) + mod(i+1,NCells)*NCells,
								mod(mod(id + NCells, this.Fid) + 1, this.NCells) + mod(i+1,NCells)*NCells	];	
				c.id = id;
				this.Cells[id] = c;
				id++;
			}
		}

		
		// this.Cells[0].alive = true;
		// this.Cells[1].alive = true;
		// this.Cells[20].alive = true;
		// this.Cells[21].alive = true;

		// this.Cells[42].alive = true;
		// this.Cells[43].alive = true;
		// this.Cells[62].alive = true;
		// this.Cells[63].alive = true;
	
		for (var i = 0; i < Nalive; ) {
			var idx = Math.floor(Math.random()*this.Fid);
			if (!this.Cells[idx].alive) {
				this.Cells[idx].alive = true;
				i++;
			}
		}

		this.IintialAlive = Nalive;
		this.MaxAlive = Nalive;
		this.MinAlive = Nalive;
		this.NowAlive = Nalive;

	}

	this.draw = function(ctx) {
		for (var i = 0; i < this.Cells.length; i++) {
			this.Cells[i].draw(ctx);
		} 
	}

	this.cycle = function() {
		var tmp = [];
		for (var i = 0; i < this.Cells.length; i++) {
			var c = new Cell(this.Cells[i].top, this.Cells[i].left, this.Cells[i].size);
			c.id = this.Cells[i].id;
			c.neighbors = this.Cells[i].neighbors;
			c.alive = this.Cells[i].alive;
			var livenb = 0;
			for (var j = 0; j < c.neighbors.length; j++) {
				if (this.Cells[c.neighbors[j]].alive) {
					livenb++;
				}
			}
			tmp[i] = c;
			if (tmp[i].alive) {
				if (livenb < 2 || livenb > 3) {
					tmp[i].alive = false;
				}
			} else {
				if (livenb === 3) {
					tmp[i].alive = true;
				}
			}
		}
		this.Cells = null;
		this.Cells = tmp;

		this.NowAlive = 0;
		for (var i = 0; i < this.Cells.length; i++) {
			if (this.Cells[i].alive) {
				this.NowAlive++;
			}
		}
		if (this.NowAlive < this.MinAlive) {
			this.MinAlive = this.NowAlive;
		}
		if (this.NowAlive > this.MaxAlive) {
			this.MaxAlive = this.NowAlive;
		}
	}

}


function loop(brd, tout) {
	brd.cycle();
	console.log("Cycling!");
	brd.draw(ctx);
	var s1 = document.getElementById("max-alive");
	var s2 = document.getElementById("min-alive");
	var s3 = document.getElementById("now-alive");
	s1.innerHTML = brd.MaxAlive;
	s2.innerHTML = brd.MinAlive;
	s3.innerHTML = brd.NowAlive;
	setTimeout(function(){loop(brd,tout);},tout);
}

var canvas = document.getElementById("mcv");
var dim = Math.floor(window.innerHeight * 0.8);
var NCells = 30;
var Nalive = 200;
var cd = dim / NCells;
canvas.width  = dim;
canvas.height = dim;

var s0 = document.getElementById("init-alive");
s0.innerHTML = Nalive;

var ctx = canvas.getContext("2d");

var brd = new Board(NCells, cd);
brd.init(Nalive);

var tout = 500;

brd.draw(ctx);
setTimeout(function(){loop(brd, tout);}, tout);


