let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencileToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let upload = toolsCont.children[3];

let sticky =toolsCont.children[4];
let download = toolsCont.children[2];
let optionFlag = true;
let pencilFlag = false;
let eraserFlag = false;

optionsCont.addEventListener("click" , (e)=>{

let contChild = optionsCont.children[0];
console.log(contChild);

let iconClass = contChild.classList[1];
console.log(iconClass);

optionFlag =!optionFlag;
if(optionFlag){
   
    contChild.classList.remove("fa-xmark");
    contChild.classList.add("fa-bars"); 
    // console.log(contChild);
    toolsCont.style.display = "flex";

    
}
else{
    contChild.classList.remove("fa-bars");
    contChild.classList.add("fa-xmark");
    // console.log(contChild);
    toolsCont.style.display = "none";
    pencileToolCont.style.display = "none";
    eraserToolCont.style.display = "none";

}

})

let pencilTool =toolsCont.children[0];

pencilTool.addEventListener( "click" ,(e)=>{



    pencilFlag = !pencilFlag ;

    if(!pencilFlag){
        pencileToolCont.style.display = "none";
     }
else{
    pencileToolCont.style.display = "flex";

}
     
})

let eraserTool =toolsCont.children[1];

eraserTool.addEventListener( "click" ,(e)=>{

    eraserFlag = !eraserFlag ;

    if(!eraserFlag){
        eraserToolCont.style.display = "none";
     }
else{
    eraserToolCont.style.display = "flex";

}
     
})


sticky.addEventListener("click" , (e)=>{
 
    let stickyCont = document.createElement("div");

    // stickyCont.classList.add("sticky-cont");
    stickyCont.setAttribute("class" , "sticky-cont" );

    stickyCont.innerHTML=`
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
     </div>
        
     <div class="note-cont">
        <textarea></textarea>
     </div>
    `;
    
    document.body.appendChild(stickyCont);
   
    handleRemove(stickyCont);   // sticky notes remove function calling...

    handleMinimize(stickyCont); // sticky notes minimizing finction...

    stickyCont.onmousedown = function(event) {
        dragAndDrop(stickyCont , event);
        };
      
      stickyCont.ondragstart = function() {
        return false;
      };

});


function handleRemove(stickyCont){
    let removebtn = stickyCont.querySelector(".remove");

    removebtn.addEventListener("click" , (e)=>{
        stickyCont.remove();
    })
}

function handleMinimize(stickyCont) {

    let minimizeBtn = stickyCont.querySelector(".minimize");

    minimizeBtn.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");

        if (display === "none") {
            noteCont.style.display = "block";
            console.log("here-1");
        } else {
            noteCont.style.display = "none";
            console.log("here-2");

        }
    });
}
// drag and drop

function dragAndDrop(ball , event ){
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
  
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    // document.body.append(ball);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    ball.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    };

}


upload.addEventListener("click" , (e)=>{
let input = document.querySelector("input");
input.setAttribute("type" , "file");
input.click();

input.addEventListener("change" , (e)=>{

let file = input.files[0];
let url = URL.createObjectURL(file);



 
    let stickyCont = document.createElement("div");

    // stickyCont.classList.add("sticky-cont");
    stickyCont.setAttribute("class" , "sticky-cont");

    stickyCont.innerHTML=`
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
     </div>
        
     <div class="note-cont">
        <img src="${url}"/>
     </div>
    `;
    
    document.body.appendChild(stickyCont);
   
    handleRemove(stickyCont);   // sticky notes remove function calling...

    handleMinimize(stickyCont); // sticky notes minimizing finction...

    stickyCont.onmousedown = function(event) {
        dragAndDrop(stickyCont , event);
        };
      
      stickyCont.ondragstart = function() {
        return false;
      };

});

});

download.addEventListener("click" , (e)=>{

  let url = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = url;
//   console.log("here");
  a.download = "board.jpg";
  a.click();

});

