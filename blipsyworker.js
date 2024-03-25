let ctx;
let canvas;
onmessage = function (e) {
	if (e.data.canvas) {
		ctx = e.data.canvas.getContext("2d")
		canvas = e.data.canvas
	}else {
		
		let screen = e.data[1]
		let exports = e.data[2]
		canvas.width = exports.width * exports.scale
		canvas.height = exports.height * exports.scale


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