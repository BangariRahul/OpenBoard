let canvas = document.querySelector("canvas");
canvas.width =window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");

let pencilWidthElem = document.querySelector
(".pencil-width");

let eraserWidthElem =document.querySelector(".eraser-width");

let undoRedoTracker = [];
let track = 0;

let redo = toolsCont.children[5];
let undo = toolsCont.children[6];
let penColor ="red";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let eraserColor = "white";

let mouseDown = false;

//api
let tool = canvas.getContext("2d");
// tool.beginPath(); // new graphic 
// tool.moveTo(0,0); // start point
// tool.lineTo(100 , 150);
// tool.stroke(); // fill color (fill graphic);
 
tool.strokeStyle = "red";
tool.lineWidth="3";

canvas.addEventListener("mousedown", (e)=>{
    mouseDown=true;
    tool.beginPath();
    tool.moveTo(e.clientX, e.clientY);

    tool.strokeStyle = eraserFlag ? eraserColor : penColor;
    tool.lineWidth = eraserFlag ? eraserWidth : penWidth;
})
canvas.addEventListener("mousemove", (e)=>{
    if(mouseDown){
    tool.lineTo(e.clientX, e.clientY);
    tool.stroke();
    }
})

canvas.addEventListener("mouseup", (e)=>{
      mouseDown = false;

      let url = canvas.toDataURL();
      undoRedoTracker.push(url);
      track =undoRedoTracker.length-1; 

})


pencilColor.forEach((color)=>{

    color.addEventListener("click" , (e)=>{
        let clr = color.classList[0];
        penColor=clr;
        tool.strokeStyle = penColor; 
    })
});

pencilWidthElem.addEventListener("change" , (e)=>{
     
    penWidth = pencilWidthElem.value;
    tool.lineWidth=penWidth;
});

eraserWidthElem.addEventListener("change", (e)=>{

    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
    tool.strokeStyle = "white";
});

undo.addEventListener("click" , (e)=>{
// track action
    if(track > 0 ) {
        track--;
    let trackObj ={
        trackValue : track,
        undoRedoTracker
  }
  tool.clearRect(0, 0, canvas.width, canvas.height);
undoRedoCanvas(trackObj);
    }
});

redo.addEventListener("click" , (e)=>{

    if(track < undoRedoTracker.length - 1 ) {
        track++; 

    let trackObj ={
          trackValue : track,
          undoRedoTracker
    }

  tool.clearRect(0, 0, canvas.width, canvas.height);

undoRedoCanvas(trackObj);
    }
}); 


function undoRedoCanvas(trackobj){
    track = trackobj.trackValue;
    undoRedoTracker = trackobj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image(); // new image referance element
    img.src = url;
    img.onload =(e) => {
        tool.drawImage(img, 0 , 0, canvas.width , canvas.height);
    }
}