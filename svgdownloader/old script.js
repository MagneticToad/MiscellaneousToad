function downloadSVGasPNG(svg) {
	//adapted from https://stackoverflow.com/a/28226736
	//changed heavily to work with html2canvas
	
	var canvas = document.createElement('canvas');
	canvas.width = svg.width.baseVal.value;
	canvas.height = svg.height.baseVal.value;
	
	var ctx = canvas.getContext('2d');
	var data = (new XMLSerializer()).serializeToString(svg);
	var DOMURL = window.URL || window.webkitURL || window;

	var img = new Image();
	var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
	var url = DOMURL.createObjectURL(svgBlob);

	img.onload = function () {
		ctx.drawImage(img, 0, 0);
		DOMURL.revokeObjectURL(url);

		var imgURI = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream');
		
		var a = document.createElement('a');
		a.setAttribute('download', 'image.png'); //filename goes here
		a.setAttribute('href', imgURI);
		a.setAttribute('target', '_blank');

		a.click();
	};

	img.src = url;
}