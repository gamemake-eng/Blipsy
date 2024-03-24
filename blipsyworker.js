let ctx;
onmessage = function (e) {
	if (e.data.canvas) {
		ctx = e.data.canvas.getContext("2d")
	}else {
		
			let screen = e.data[1]
			let exports = e.data[2]

			ctx.fillStyle = "#000000"
	    	ctx.fillRect(0,0,exports.width * exports.scale, exports.height * exports.scale)
	    	ctx.fillStyle = "#FFFFFF"
			screen.forEach((e, d, arr) => {
		      if(arr[d] == 1){
		        ctx.fillRect((d%exports.width)*exports.scale, Math.floor(d/exports.height)*exports.scale, exports.scale,exports.scale)
		      }
		    })
			

		
	}
	
}