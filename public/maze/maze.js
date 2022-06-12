var canvas;
var pencil;

var xDisplay;
var yDisplay;

var SIZE = 740;
var SCALE = SIZE/37;

var position = [0, 0, 0, 0]; //xyzq
var PLANES = ["x", "y", "z", "q"];
var facing = 0; //0:north, 1:east, 2:south, 3:west
var looking = 0; //-1: down, 0: ahead, 1: up

var COLOURS = [
	{"floor": "#808080", "wall": "#404040"}
];

window.onload = function() {
	canvas = document.getElementById("screen");
	canvas.width = SIZE;
	canvas.height = SIZE;
	pencil = canvas.getContext("2d");
	console.log("Loaded");
	
	for (button of document.getElementsByClassName("moveBtn")) {
		button.onclick = handleMovement;
	}
	
	document.addEventListener("keyup", event => {
		if ([16, 32, 37, 38, 39, 40].includes(event.keyCode)) {
			var type;
			switch (event.keyCode) {
				case 32:
					type = "forward";
					break;
				case 16:
					type = "back";
					break;		
				case 37:
					type = "left";
					break;
				case 38:
					type = "up";
					break;
				case 39:
					type = "right";
					break;
				case 40:
					type = "down";
					break;
			}
			handleMovement({target: {id: type}});
		}
	});
	
	test();
}

function handleMovement(event) {
	var direction = event.target.id;
	switch(direction) {
		case "forward":
			attemptMove(facingPlane(), 1*facingDirection());
			break;
		case "back":
			attemptMove(facingPlane(), -1*facingDirection());
			break;
		case "right":
			turn(1);
			break;
		case "left":
			turn(-1);
			break;
		case "up":
			look(1);
			break;
		case "down":
			look(-1);
			break;
	}
}

function turn(direction) {
	facing = (facing + direction + 4) % 4;
	drawScreen(ahead(facingPlane(), facingDirection(), position), facing, looking);
}

function look(direction) {
	switch (direction) {
		case 1:
			if (looking < 1) {
				looking++;
			}
			break;
		case -1:
			if (looking > -1) {
				looking--;
			}
			break;
	}
	drawScreen(ahead(facingPlane(), facingDirection(), position), facing, looking);
}

function attemptMove(plane, direction) {
	if (currentCell()[relevantWall(plane, direction)]) {
		return;
	} else {
		move(plane, direction);	
	}
}

function move(plane, direction) {
	position[plane] += direction;
	drawScreen(ahead(plane, facingDirection(), position), facing, looking);
}

function currentCell() {
	return maze[position[3]][position[2]][position[0]][position[1]];
}

function facingPlane() {
	//which plane are you looking up? (x or y)
	if (looking == 0) { //if looking 'ahead', you are looking up the x or y plane
		if (facing % 2 == 0) {
			return 1;
		} else {
			return 0;
		}
	} else { //if you are either looking down or up, you are looking up the z plane
		return 2;
	}
}

function facingDirection() {
	//within your plane, which direction are you looking (positive or negative)
	switch (looking) {
		case 0: //if ahead
			if (facing < 2) {
				return 1;
			} else {
				return -1;
			}
			break;
		case -1: //if down
			return -1;
			break;
		case 1: //if up
			return 1;
			break;
	}
}

function relevantWall(plane, direction) {
	return `${PLANES[plane]}${(direction+1)/2}`;
}

function ahead(plane, direction, position) {
	var viewing = currentCell();
	var ahead = [viewing];
	count = 1;
	while (count < 5 && !viewing[relevantWall(plane, direction)]) {
		switch (plane) {
			case 0:
				viewing = maze[position[3]][position[2]][position[0] + direction*count][position[1]]
				break;
			case 1:
				viewing = maze[position[3]][position[2]][position[0]][position[1]  + direction*count]
				break;
			case 2:
				console.log(position);
				viewing = maze[position[3]][position[2] + direction*count][position[0]][position[1]]
				break;
		}
		ahead.push(viewing);
		count++;
	}
	return ahead;
}

function drawScreen(ahead, facing, looking) {
	//draws the screen using an array of the cells ahead
	clearScreen();
	drawFrame(ahead.length, looking);
	drawSurfaces(ahead, facing, looking);
	updateWhereAmI();
}

function updateWhereAmI() {
	document.getElementById("whereAmI").innerText = `You are located at x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, q: ${position[3]}\nYou are facing ${["north", "east", "south", "west"][facing]} and looking ${["down", "ahead", "up"][looking+1]}`;
}

function clearScreen() {
	pencil.clearRect(0, 0, canvas.width, canvas.height);
}

function drawFrame(distance, looking) {
	var length = getEdgeDistance(distance);
	drawDiagonals(length);
	drawCorners(length);
	drawEndWall(length, looking);
}

function getEdgeDistance(wallNumber) {
	switch (wallNumber) {
		case 0:
			return 0;
			break;
		case 1:
			return 2;
			break;
		case 2:
			return 7;
			break;
		case 3:
			return 11;
			break;
		case 4:
			return 14;
			break;
		case 5:
			return 16;
			break;
	}
}

function drawDiagonals(length) {
	pencil.beginPath();
	pencil.lineWidth = 1.1;
	draw({x: 0, y: 0}, {x: length, y: length});
	draw({x: 0, y: 37}, {x: length, y: 37-length});
	draw({x: 37, y: 0}, {x: 37-length, y: length});
	draw({x: 37, y: 37}, {x: 37-length, y: 37-length});
	pencil.closePath();
	pencil.lineWidth = 1;
}

function drawCorners(length) {
	var count = 1;
	while (getEdgeDistance(count) < length) {
		drawRectangle({x: getEdgeDistance(count), y: getEdgeDistance(count)}, {x: 37-getEdgeDistance(count), y: 37-getEdgeDistance(count)});
		count++;
	}
}

function drawEndWall(length, looking) {
	drawRectangle({x: length, y: length}, {x: 37-length, y: 37-length});
	
	var colour;
	if (looking == 0) {
		colour = COLOURS[0].wall;
	} else {
		colour = COLOURS[0].floor;
	}
	fillRectangle(colour, {x: length, y: length}, {x: 37-length, y: 37-length});
}

function draw(start, end) {
	drawRaw({x: start.x*SCALE, y: start.y*SCALE}, {x: end.x*SCALE, y: end.y*SCALE});
}

function drawRectangle(topleft, bottomright) {
	pencil.beginPath();
	draw({x: topleft.x, y: topleft.y}, {x: bottomright.x, y: topleft.y});
	draw({x: bottomright.x, y: topleft.y}, {x: bottomright.x, y: bottomright.y});
	draw({x: bottomright.x, y: bottomright.y}, {x: topleft.x, y: bottomright.y});
	draw({x: topleft.x, y: bottomright.y}, {x: topleft.x, y: topleft.y});
	pencil.closePath();
}

function drawRaw(start, end) {
	pencil.moveTo(start.x, start.y);
	pencil.lineTo(end.x, end.y);
	pencil.stroke();
}

function drawSample() {
	pencil.beginPath();
	pencil.lineWidth = 1.1;
	draw({x: 0, y: 0}, {x: 16, y: 16});
	draw({x: 0, y: 37}, {x: 16, y: 21});
	draw({x: 37, y: 0}, {x: 21, y: 16});
	draw({x: 37, y: 37}, {x: 21, y: 21});
	pencil.closePath();
	pencil.lineWidth = 1;

	
	drawRectangle({x: 16, y: 16}, {x: 21, y: 21});
	
	var diff = 0;
	for (var i = 2; i < 6; i++) {
		diff += i;
		drawRectangle({x: 16-diff, y: 16-diff}, {x: 21+diff, y: 21+diff});
	}

	blocked = [[false, true, false, true, true], [true, true, false, true, true], [true, true, false, true, false], [true, true, false, true, true]]; //left -> top -> right -> bottom, all from far -> close
	drawSurfaces(blocked);

	
}

function drawSurfaces(ahead, facing, looking) {
	var paints = getPaints(looking);
	for (var i = 0; i < ahead.length; i++) {	
		for (var j = 0; j < 4; j++) {
			if (j % 2 == 0) { //if wall
				if (ahead[i][determineWall(facing, looking, j)]) {
					fillRectangle(paints.horizontalWall, translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j));				
					fillTriangle(paints.horizontalWall, translate({x: getEdgeDistance(i), y: getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j));
					fillTriangle(paints.horizontalWall, translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i+1)}, j));
				} else {
					drawRectangle(translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j));
					fillRectangle(paints.horizontalOpening, translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j));				
					fillTriangle(paints.horizontalOpeningEdge, translate({x: getEdgeDistance(i), y: getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j));
					fillTriangle(paints.horizontalOpeningEdge, translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i+1)}, j));
				}
			} else { //if floor
				if (ahead[i][determineWall(facing, looking, j)]) {
					fillRectangle(paints.verticalWall, translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j));				
					fillTriangle(paints.verticalWall, translate({x: getEdgeDistance(i), y: getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j));
					fillTriangle(paints.verticalWall, translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i+1)}, j));
				} else {
					drawRectangle(translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j));
					fillRectangle(paints.verticalOpening, translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j));				
					fillTriangle(paints.verticalOpeningEdge, translate({x: getEdgeDistance(i), y: getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: getEdgeDistance(i+1)}, j));
					fillTriangle(paints.verticalOpeningEdge, translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i)}, j), translate({x: getEdgeDistance(i+1), y: 37-getEdgeDistance(i+1)}, j), translate({x: getEdgeDistance(i), y: 37-getEdgeDistance(i+1)}, j));
				}
			}
		}
		
	}
}

function determineWall(facing, looking, side) {
	//side - 0: left, 1: roof, 2: right, 3: floor
	
	//all permutations of looking -> facing -> side and what wall that is
	return {"-1|0|0": "x0", //when looking down and facing north, the left wall is x0
	"-1|0|1": "y1",
	"-1|0|2": "x1",
	"-1|0|3": "y0",
	"-1|1|0": "y1",
	"-1|1|1": "x1",
	"-1|1|2": "y0",
	"-1|1|3": "x0",
	"-1|2|0": "x1",
	"-1|2|1": "y0",
	"-1|2|2": "x0",
	"-1|2|3": "y1",
	"-1|3|0": "y0",
	"-1|3|1": "x0",
	"-1|3|2": "y1",
	"-1|3|3": "x1",
	"0|0|0": "x0",
	"0|0|1": "z1",
	"0|0|2": "x1",
	"0|0|3": "z0",
	"0|1|0": "y1",
	"0|1|1": "z1",
	"0|1|2": "y0",
	"0|1|3": "z0",
	"0|2|0": "x1",
	"0|2|1": "z1",
	"0|2|2": "x0",
	"0|2|3": "z0",
	"0|3|0": "y0",
	"0|3|1": "z1",
	"0|3|2": "y1",
	"0|3|3": "z0",
	"1|0|0": "x0",
	"1|0|1": "y0",
	"1|0|2": "x1",
	"1|0|3": "y1",
	"1|1|0": "y1",
	"1|1|1": "x0",
	"1|1|2": "y0",
	"1|1|3": "x1",
	"1|2|0": "x1",
	"1|2|1": "y0",
	"1|2|2": "x0",
	"1|2|3": "y1",
	"1|3|0": "y0",
	"1|3|1": "x0",
	"1|3|2": "y1",
	"1|3|3": "x1"}[`${looking}|${facing}|${side}`];
}

function getPaints(looking) {
	var paints = {};
	if (looking == 0) {
		paints.horizontalWall = COLOURS[0].wall;
		paints.verticalWall = COLOURS[0].floor;
		paints.horizontalOpening = COLOURS[0].wall;
		paints.horizontalOpeningEdge = COLOURS[0].floor;
		paints.verticalOpening = COLOURS[0].wall;
		paints.verticalOpeningEdge = COLOURS[0].wall;
	} else {
		paints.horizontalWall = COLOURS[0].wall;
		paints.verticalWall = COLOURS[0].wall;
		paints.horizontalOpening = COLOURS[0].floor;
		paints.horizontalOpeningEdge = COLOURS[0].wall;
		paints.verticalOpening = COLOURS[0].floor;
		paints.verticalOpeningEdge = COLOURS[0].wall;
	}
	return paints;
}

function translate(point, rotations) {
	for (var i = 0; i < rotations; i++) {
		point = rotate(point);
	}
	return point;
}

function rotate(point) {
	return {x: -1*point.y + 37, y: point.x};
}

function fillRectangle(colour, topleft, bottomright) {
	pencil.globalCompositeOperation = "destination-over";
	var oldColour = pencil.fillStyle;
	pencil.fillStyle = colour;
	pencil.beginPath();
	pencil.moveTo(topleft.x*SCALE, topleft.y*SCALE);
	pencil.lineTo(bottomright.x*SCALE, topleft.y*SCALE);
	pencil.lineTo(bottomright.x*SCALE, bottomright.y*SCALE);
	pencil.lineTo(topleft.x*SCALE, bottomright.y*SCALE);
	pencil.closePath();
	pencil.fill();
	pencil.fillStyle = oldColour;
	pencil.globalCompositeOperation = "source-over";
}

function fillTriangle(colour, point1, point2, point3) {
	pencil.globalCompositeOperation = "destination-over";
	var oldColour = pencil.fillStyle;
	pencil.fillStyle = colour;
	pencil.beginPath();
	pencil.moveTo(point1.x*SCALE, point1.y*SCALE);
	pencil.lineTo(point2.x*SCALE, point2.y*SCALE);
	pencil.lineTo(point3.x*SCALE, point3.y*SCALE);
	pencil.closePath();
	pencil.fill();
	pencil.fillStyle = oldColour;
	pencil.globalCompositeOperation = "source-over";
}

function test() {
	// drawSample();
	// drawSample();
	drawScreen(ahead(facingPlane(), facingDirection(), position), facing, looking);
	
	xDisplay = document.getElementById("xCoord");
	yDisplay = document.getElementById("yCoord");
	
	canvas.onmousemove = function(e) {
		var rect = this.getBoundingClientRect();
		setCoordsDisplay(e.clientX - rect.left, e.clientY - rect.top);
	}
}

function setCoordsDisplay(x, y) {
	xDisplay.innerHTML = `X: ${Math.round(x/SCALE)}`;
	yDisplay.innerHTML = `Y: ${Math.round(y/SCALE)}`;
}