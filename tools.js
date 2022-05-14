let optioncont=document.querySelector(".options-cont")
let flagoption=false;
let toolsCont=document.querySelector(".tools-cont")
let pencilToolCont=document.querySelector(".pencil-tool-cont")
let eraserToolCont=document.querySelector(".eraser-tool-cont");
let pencil=document.querySelector(".pencil");
let eraser=document.querySelector(".eraser");
let pencilFlag=false;
let eraserFlag=false;
let stickyFlag=true;
let sticky=document.querySelector(".sticky-notes");
let upload=document.querySelector(".upload");
let download=document.querySelector(".download");
let undoRedoTrracker=[];//data
let track=0;//represent which
let undo=document.querySelector(".undo");
let redo=document.querySelector(".redo");



optioncont.addEventListener("click",()=>{
    flagoption=!flagoption;

    if(flagoption)
    {
        openTools();
    }
    else{
        closeTools();
    }
})

function openTools() {
    let iconEle=optioncont.children[0];
    iconEle.classList.remove("fa-times");
    iconEle.classList.add("fa-bars");
    toolsCont.style.display="flex";
    // pencilToolCont.style.display="block";
    // eraserToolCont.style.display="flex";
}

function closeTools()
{
    let iconEle=optioncont.children[0];
    iconEle.classList.remove("fa-bars");
    iconEle.classList.add("fa-times");
    toolsCont.style.display="none";
    eraserToolCont.style.display="none";
    pencilToolCont.style.display="none"
}

pencil.addEventListener("click",()=>{
    pencilFlag=!pencilFlag;
if(pencilFlag)
{
    pencilToolCont.style.display="block";}
    else{
        pencilToolCont.style.display="none";
    }
})
eraser.addEventListener("click",()=>{
    eraserFlag=!eraserFlag
    if(eraserFlag)
    {
    eraserToolCont.style.display="flex";
    }
    else{
        eraserToolCont.style.display="none";

    }
})
sticky.addEventListener("click",()=>{
  
    let stickyCont=document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML=`  <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
</div>
<div class="notes-cont">
    <textarea name="" ></textarea>
</div>`
document.body.append(stickyCont);
stickyCont.onmousedown = function (event) {
  dragAndDrop(stickyCont, event);
};

stickyCont.ondragstart = function () {
  return false;
};
remove(stickyCont);
minimize(stickyCont);
})

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
  };
}

function remove(element) {
  let removebtn=element.querySelector(".remove");
  removebtn.addEventListener("click",()=>{
    element.remove();
  })
}

function minimize(element)
{
  let minimizebtn=element.querySelector(".minimize");
  minimizebtn.addEventListener("click",()=>{
    let notescont=element.querySelector(".notes-cont");
  
      
      let display =getComputedStyle(notescont).getPropertyValue("display");
      if(display==="block")
      {

        notescont.style.display="none";
        element.style.boxShadow = "none";
      }
      else{
        notescont.style.display="block";
        element.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
      }
   

  })
}
upload.addEventListener("click",()=>{

  let input=document.createElement("input");
  input.setAttribute("type","file");
  input.click();
  input.addEventListener("change",()=>{
    let file=input.files[0];
    let url=URL.createObjectURL(file);
    let stickyCont=document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML=`  <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
</div>
<div class="notes-cont">
<img src="${url}" >
</div>`
document.body.append(stickyCont);

stickyCont.onmousedown = function (event) {
  dragAndDrop(stickyCont, event);
};

stickyCont.ondragstart = function () {
  return false;
};
remove(stickyCont);
minimize(stickyCont);
  })
  
})

download.addEventListener("click",()=>{
  let url=canvas.toDataURL();

  let a=document.createElement("a");
  a.href=url;
  a.download="board.jpg";
  a.click();
  // document.body.append(a);
 
})


