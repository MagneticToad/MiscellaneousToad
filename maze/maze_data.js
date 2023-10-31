//true - is wall there, false - is not
//q, z, x, y
var maze = [
	[
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: true, y1: true, y0: false, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true}
			], //x in 2d
			[
				{x1: true, x0: false, y1: true, y0: true, z1: false, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: false, y1: false, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: false, z1: true, z0: true, q1: true, q0: true}
			], //x in 2d
			[
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true}
			], //x in 2d
			[
				{x1: false, x0: true, y1: false, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true}
			], //x in 2d
			[
				{x1: true, x0: false, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: false, y1: false, y0: true, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: true, q1: true, q0: true},
				{x1: true, x0: false, y1: true, y0: false, z1: true, z0: true, q1: true, q0: true}
			] //x in 2d
		], //0 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			] //x in 2d
		], //1 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			] //x in 2d
		], //2 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: true}
			] //x in 2d
		], //3 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: false, x0: true, y1: true, y0: false, z1: true, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: false, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: true},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: true}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: true},
				{x1: true, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: true}
			] //x in 2d
		] //4 in 3d
	], //0 in 4d
	[
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			] //x in 2d
		], //0 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //1 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //2 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //3 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			] //x in 2d
		] //4 in 3d
	], //1 in 4d
	[
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			] //x in 2d
		], //0 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //1 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //2 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //3 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			] //x in 2d
		] //4 in 3d
	], //2 in 4d
	[
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: true, q1: false, q0: false}
			] //x in 2d
		], //0 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //1 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //2 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: false, q0: false}
			] //x in 2d
		], //3 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: false, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: false, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: true, z0: false, q1: false, q0: false}
			] //x in 2d
		] //4 in 3d
	], //3 in 4d
	[
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: true, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: true, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: true, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: true, q1: true, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: true, q1: true, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: true, q1: true, q0: false}
			] //x in 2d
		], //0 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			] //x in 2d
		], //1 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			] //x in 2d
		], //2 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: false, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: false, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: false, z0: false, q1: true, q0: false}
			] //x in 2d
		], //3 in 3d
		[
			[
				{x1: false, x0: true, y1: false, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: true, y1: true, y0: false, z1: true, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: false, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: false, z1: true, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: false, x0: false, y1: true, y0: true, z1: true, z0: false, q1: true, q0: false}
			], //x in 2d
			[
				{x1: true, x0: false, y1: false, y0: true, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: true, y1: false, y0: false, z1: true, z0: false, q1: true, q0: false},
				{x1: true, x0: false, y1: true, y0: false, z1: true, z0: false, q1: true, q0: false}
			] //x in 2d
		] //4 in 3d
	]  //4 in 4d
];