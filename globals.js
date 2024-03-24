var Blipsy = (function(exports) {
  let sc = 20;
  let gridW = 64;
  let gridH = 64;
  let scriptenv = false;
  let ctx;
  let backbuffer;
  let offscreen;
  let bbc;
  let mouseX = 0;
  let mouseY = 0;
  let mousedown = false;
  let maps = [
    []
    ]
  let data = {
  	sprites: [],
  	code: ``
  }

  let screen = []

  let worker;
  
  function drawSprite(i, x, y){
  	//ctx.strokeStyle = "#787877"
  	let r = Math.floor((x)/exports.scale)
  	let c = Math.floor((y)/exports.scale)
  	
  	let rx = Math.floor(x)
  	let ry = Math.floor(y)
  	
    for(var d = 0; d < data.sprites[i].length; d++){


      if(data.sprites[i][d] == 1){
        //backbuffer.fillRect(((rx)+((d%8)*exports.scale)), ((ry)+(((Math.floor(d/8))))*exports.scale), exports.scale,exports.scale)
        exports.drawPixel(rx+((d%8)), ry+(Math.floor(d/8)))
      }

    }
  }
  exports.drawPixel = (x, y) => {
    screen[Math.floor(x) + exports.width * Math.floor(y)] = 1
    
  }
  exports.clearScreen = () => {
    screen.forEach((e, i, arr) => {
      arr[i] = 0
    })
  }
  exports.scale = sc;
  exports.width = gridW;
  exports.height = gridH;
  exports.sprites = data.sprites;
  exports.code = data.code;
  exports.setCode = (code) => {
    data.code = code
  }
  exports.drawSprite = drawSprite;
  exports.env = scriptenv;
  exports.appendBank = (bank) => {
    if(scriptenv===false){
      data.sprites.push(bank)
    }else{
      console.error("Denied: setBank is a restricted function")
    }
  };

  exports.setCtx = (bank) => {
    ctx = bank
  };

  exports.setEnv = (issc) => {
    if(!scriptenv){
      scriptenv = issc
    }
    
  };

  exports.mouse = {
  	x: 0,
  	y: 0
  }

  exports.mouseDown = false

  exports.update = () => {

  }

  exports.run = () => {
  	window.requestAnimationFrame(exports.run)
    exports.mouseDown = mousedown

    worker.postMessage(["draw", screen, {width: exports.width, height:exports.height, scale: exports.scale}])


    exports.update()

    ctx.drawImage(bbc, 0, 0)
  }

  exports.getData = () => {
    return JSON.stringify(data)
  }

  exports.restart = () => {

  	if (document.getElementById("spp")) {
  		document.getElementById("spp").remove()
  	}
  	

  	let cd = document.createElement("script")
  	cd.id = "spp"
  	cd.innerHTML = data.code
  	document.body.appendChild(cd)
  	exports.mouse.x = 0
   exports.mouse.y = 0
   exports.mouseDown = false;
   exports.clearScreen()
   init()
 }

 exports.loadData = (cartdata)=>{
  data = cartdata
  exports.sprites = data.sprites
}

exports.init = (id, script) => {
  worker = new Worker("blipsyworker.js")
  for (var i = 0; i < exports.width * exports.height; i++) {
    screen.push(0)
  }
  console.log(screen)
  exports.scale = 5
  exports.id = id
  document.getElementById(id).width = exports.width * exports.scale
  document.getElementById(id).height = exports.height * exports.scale
  document.getElementById(id).addEventListener("mousemove", (e)=>{
    let rect = e.target.getBoundingClientRect();
	      exports.mouse.x = (e.clientX - rect.left); //x position within the element.
	      exports.mouse.y = (e.clientY - rect.top); //y position within the element.
        exports.mouse.x = Math.floor(exports.mouse.x/exports.scale)
        exports.mouse.y = Math.floor(exports.mouse.y/exports.scale)


      })

  document.getElementById(id).addEventListener("mousedown", (e)=>{
    mousedown = true

  })

  document.getElementById(id).addEventListener("mouseup", (e)=>{
    mousedown = false

  })
  ctx = document.getElementById(id).getContext("2d")

  bbc = document.createElement("canvas")
  bbc.width = exports.width * exports.scale
  bbc.height = exports.height * exports.scale
  let offscreen = bbc.transferControlToOffscreen()
  worker.postMessage({canvas: offscreen}, [offscreen])
  
  //backbuffer = bbc.getContext("2d")

  exports.mouse.x = 0
  exports.mouse.y = 0



  mousedown = false;



  if (document.getElementById("spp")) {
    document.getElementById("spp").remove()
  }
  data.code = script
  let cd = document.createElement("script")
  cd.id = "spp"
  cd.innerHTML = data.code
  document.body.appendChild(cd)
  init()
  	//exports.update = update
  exports.run()
}
return exports;
})({})