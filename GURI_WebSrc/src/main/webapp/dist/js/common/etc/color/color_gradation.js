function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color = [];
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}


function fn_startEndColor(startColor, endColor, cnt) {
	/* The start of your code. */
	var start = convertToRGB (startColor);    /* The beginning of your gradient */
	var end   = convertToRGB (endColor);    /* The end of your gradient #*/
	console.log("start", start)
	//var arr = $('.gradientList').childElements();
	//var len = arr.length();                  /* The number of colors to compute */
	var alpha = 0.0;                         /* Alpha blending amount */
	var gradationColor = [];
	for (i = 0; i < cnt; i++) {

		var c = [];
		alpha += (1.0/cnt);
	    c[0] = start[0] * alpha + (1 - alpha) * end[0];
	    c[1] = start[1] * alpha + (1 - alpha) * end[1];
	    c[2] = start[2] * alpha + (1 - alpha) * end[2];
	    gradationColor.push("#"+convertToHex(c));
	    /* Set the background color of this element */
	   // arr[i].setStyle ({ 'background-color': convertToHex (c) });
	}
	return gradationColor;
}

function fn_startEndRgbColor(startColor, endColor, cnt) {
	/* The start of your code. */
	var start = convertToRGB (startColor);    /* The beginning of your gradient */
	var end   = convertToRGB (endColor);    /* The end of your gradient #*/
	
	//var arr = $('.gradientList').childElements();
	//var len = arr.length();                  /* The number of colors to compute */
	var alpha = 0.0;                         /* Alpha blending amount */
	var gradationColor = [];
	for (i = 0; i < cnt; i++) {
		
		var c = [];
		alpha += (1.0/cnt);
		c[0] = start[0] * alpha + (1 - alpha) * end[0];
		c[1] = start[1] * alpha + (1 - alpha) * end[1];
		c[2] = start[2] * alpha + (1 - alpha) * end[2];
		gradationColor.push("#"+convertToHex(c));
		/* Set the background color of this element */
		// arr[i].setStyle ({ 'background-color': convertToHex (c) });
	}
	return gradationColor;
}

