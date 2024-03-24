var Canvas = (function(exports) {
	let stage;
	let sprW = 8;
	let sprH = 8;
	let gridsize = 16;
	let currspr = 0;
	let mode;
	
	let ctx;
	let mouseX = 0;
	let mouseY = 0;
	let mousedown = false;

	let cur = {
		x: 0,
		y: 0
	}

	

	exports.update = () => {
		window.requestAnimationFrame(exports.update)
		if (mouseX < 0) {
			mouseX = 0
		}
		if (mouseX > document.getElementById("pixeldraw").width) {
			mouseX = document.getElementById("pixeldraw").width
		}
		if (mouseY < 0) {
			mouseY = 0
		}
		if (mouseY > document.getElementById("pixeldraw").height) {
			mouseY = document.getElementById("pixeldraw").height
		}


		var x = Math.floor(mouseX/gridsize)
		var y = Math.floor(mouseY/gridsize)
		cur.x += (x - cur.x) * 0.5
		cur.y += (y - cur.y) * 0.5
		ctx.fillStyle = "#000000"
		ctx.fillRect(0,0,sprW * gridsize, sprH * gridsize)
		ctx.fillStyle = "#FFFFFF"

		for (var d = 0; d < Blipsy.sprites[currspr].length; d++) {
		    if (Blipsy.sprites[currspr][d] == 1) {
		      
		      ctx.fillRect(
		        (d % sprW) * gridsize,
		        Math.floor(d / sprH) * gridsize,
		        1 * gridsize,
		        1 * gridsize
		      );
		      
		    }
		 }

		if (mousedown === true) {
		    if(x < 8 && y < 8 && x > -1 && y > -1){
		      
		    	if(mode.innerText == "Brush"){Blipsy.sprites[currspr][x + sprW * y] = 1;}
		    	if(mode.innerText == "Eraser"){Blipsy.sprites[currspr][x + sprW * y] = 0;}
		    }
		}
		ctx.lineWidth = 2
		ctx.strokeStyle = "#787877"
		ctx.strokeRect(cur.x*gridsize,cur.y*gridsize,gridsize, gridsize)
		ctx.fillStyle = "#787877"
		ctx.font = "20px serif"
		ctx.fillText(currspr, 5, 20)
		
		
	}
	

	exports.init = () => {
		console.log("canvas loaded")
		document.getElementById("pixeldraw").width = sprW * gridsize
		document.getElementById("pixeldraw").height = sprH * gridsize
		document.getElementById("pixeldraw").addEventListener("mousemove", (e)=>{
		  let rect = e.target.getBoundingClientRect();
	      mouseX = e.clientX - rect.left; //x position within the element.
	      mouseY = e.clientY - rect.top;  //y position within the element.
	      
		})

		document.getElementById("pixeldraw").addEventListener("mousedown", (e)=>{
		  mousedown = true
	      
		})

		document.getElementById("pixeldraw").addEventListener("mouseup", (e)=>{
		  mousedown = false
	      
		})
		ctx = document.getElementById("pixeldraw").getContext("2d")
		mode = document.getElementById("mode");
		mode.addEventListener("click", (event)=>{
		  if(mode.innerText == "Brush"){
		    mode.innerText = "Eraser"
		  }else {
		    mode.innerText = "Brush"
		  }
		})
		let buttons = document.querySelectorAll(".frame");
		for (let i = 0; i < buttons.length; i++) {
		  
		  if (i != "entries" || i != "keys") {
		  	buttons[i].innerText = i
		    buttons[i].addEventListener("click", (event) => {
		      currspr = parseInt(buttons[i].innerText);
		      
		    });
		  }
		}

		for (let i = 0; i < buttons.length+1; i++) {
			let templist = []
		  
		  for (let d = 0; d < sprW * sprH; d++) {
		    templist.push(0);
		  }
		  Blipsy.appendBank(templist)
		}


		console.log(Blipsy.sprites)

		
		exports.update()
	}

	return exports

	
})({})

Canvas.init()
