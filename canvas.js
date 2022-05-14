const canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
const tool=canvas.getContext("2d");
let currentColor="red";
tool.strokeStyle="red";
tool.lineWidth="7";
let linewidth="7";
let eraserWidthElem = document.querySelector(".eraser-width");
let eraserWidth = eraserWidthElem.value
// tool.beginPath();
// let eraserFlag="false";
const penColors=document.querySelectorAll(".pencil-color");
const pencilWidth=document.querySelector(".penc");
// let eraser=document.querySelector(".eraser");
let url=canvas.toDataURL();
undoRedoTrracker.push(url);
let mousedownFlag=false;
canvas.addEventListener("mousedown",(e)=>{
   
    mousedownFlag=true;
    tool.beginPath();
    tool.moveTo(e.clientX,e.clientY);

})
canvas.addEventListener("mousemove",(e)=>{
    if(mousedownFlag)
    {
    tool.lineTo(e.clientX,e.clientY);
    tool.stroke();}
})
canvas.addEventListener("mouseup",()=>{
    mousedownFlag=false;
    let url=canvas.toDataURL();
    undoRedoTrracker.push(url);
    track=undoRedoTrracker.length-1;
})

penColors.forEach((ColorElem)=>{

    ColorElem.addEventListener("click",()=>{

    let color=ColorElem.classList[0];
currentColor=color;
tool.strokeStyle=currentColor;


    })

})
pencilWidth.addEventListener("change",()=>{
    console.log("pencil-width-change");
linewidth=pencilWidth.value;

tool.lineWidth=linewidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = "white";
        tool.lineWidth=eraserWidthElem.value*5;
        // tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = currentColor;
        tool.lineWidth=linewidth;
        // tool.lineWidth = penWidth;
    }
})
undo.addEventListener("click",()=>{

    if(track>0)
    {
        track--;
    }


    let url=undoRedoTrracker[track];
    let img=new Image();

    img.src=url;

    img.onload=(e)=>{

        tool.clearRect(0, 0, canvas.width, canvas.height);
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }

})

redo.addEventListener("click",()=>

{
    if(track<undoRedoTrracker.length-1)   {
        track++;
    }

    let url=undoRedoTrracker[track];
    let img=new Image();

    img.src=url;

    img.onload=(e)=>{

        tool.clearRect(0, 0, canvas.width, canvas.height);
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
})