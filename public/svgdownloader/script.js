function downloadSVGasPNG(svg) {
	//create a wrapper div for the svg with equal width and height
	var div = document.createElement("div");
	div.width = svg.width.baseVal.value;
	div.height = svg.height.baseVal.value;

	//append a clone of the svg to the wrapper so that the original remains
	div.appendChild(svg.cloneNode(true));
	
	document.body.appendChild(div); //div must be in the DOM for html2canvas to work; temporarily added then removed below
	
	//create a canvas of the div with the same width and height using html2canvas
	html2canvas(div, {width: div.width, height: div.height}).then(canvas => {
		var imgURI = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream');
		
		//download it
		var a = document.createElement('a');
		a.setAttribute('download', 'image.png'); //filename goes here
		a.setAttribute('href', imgURI);
		a.setAttribute('target', '_blank');

		a.click();
	});
	document.body.removeChild(div); //remove the div
}