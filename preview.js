var editor;

var Preview = (function(exports) {
	
	let gridsize = 8;
	

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
		
		
		//Blipsy.drawSprite(0, Blipsy.mouse.x,Blipsy.mouse.y)
		cur.x += 1
		//Blipsy.update = update
		
	}
	exports.load = (data) => {
		editor.setValue(data.code)
		Blipsy.loadData(data)

	}

	exports.init = () => {
		console.log("canvas loaded")

		
		
		/*Blipsy.init("preview", () => {
			let x = 0
		  	let y = 0
		  	let update = () => {

		  		x += (Blipsy.mouse.x - x) * 0.1
		  		y += (Blipsy.mouse.y - y) * 0.1
		  		Blipsy.drawSprite(0, x,y)
		  	}

		  	return update


		})*/
		editor = ace.edit("codeedit");
	    editor.setTheme("ace/theme/monokai");
	    editor.session.setMode("ace/mode/javascript");
		Blipsy.init("preview", 
				editor.getValue())
		Blipsy.setCode(editor.getValue())




		

		
		exports.update()
	}

	return exports

	
})({})

let res = document.getElementById("restart");
res.addEventListener("click", (event)=>{
Blipsy.setCode(editor.getValue())
Blipsy.restart()
})

let ld = document.getElementById("load");
ld.addEventListener("click", (event)=>{
	$("#loadfile").trigger("click")
})

let filepick = document.getElementById("loadfile")
filepick.addEventListener("change", function(event) {
	let file = this.files[0]
	if(file){
		const reader = new FileReader();
		reader.onload = (e) => {
			let data = e.target.result
			Preview.load(JSON.parse(data))
			Blipsy.restart()
		}
		reader.readAsText(file);
	}
	
})

let sv = document.getElementById("save");
sv.addEventListener("click", (event)=>{
	const blob = new Blob([Blipsy.getData()], {type: "application/json"})
	const objurl = window.URL.createObjectURL(blob)

	const downloadLink = document.createElement("a")
	downloadLink.href = objurl
	downloadLink.download = "game.json"

	downloadLink.click();

	window.URL.revokeObjectURL(objurl)
})
setInterval(() => {Blipsy.setCode(editor.getValue())},5)
Preview.init()