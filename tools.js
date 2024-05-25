// select the element
let pencilElement = document.querySelector("#pencil");
let eraserElement = document.querySelector("#eraser");
let stickyElement = document.querySelector("#sticky");
let uploadElement = document.querySelector("#upload");
let downloadElement = document.querySelector("#download");
let undoElement = document.querySelector("#undo");
let redoElement = document.querySelector("#redo");
let toolbar = document.querySelector(".toolbar");

let toolsArr = document.querySelectorAll(".tool")
let currentTool = "pencil"

for (let i = 0; i<toolsArr.length; i++){
    toolsArr[i].addEventListener("click", function(){
        const toolName = toolsArr[i].id
        if (toolName == "pencil"){
            currentTool = "pencil"
            tool.strokeStyle = "black"
        }else if (toolName == "eraser"){
            currentTool = "eraser"
            tool.strokeStyle = "white"
            tool.lineWidth = 5
        }else if (toolName == "sticky"){
            currentTool = "sticky"
            createSticky()
        }else if (toolName == "upload"){
            
        }else if (toolName == "download"){
            
        }else if (toolName == "redo"){
            
        }else if (toolName == "undo"){

        }
    })
}


// select canvas tag and give it full height and width
let canvas = document.querySelector("#board");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

// draw something on canvas
let tool = canvas.getContext("2d");
let isDrawing = false

// pencil logic start
canvas.addEventListener("mousedown", function(e) {
    let sidx = e.clientX
    let sidy = e.clientY
    let toolBarHeight = getYDelta()
    isDrawing = true
    tool.beginPath()
    tool.moveTo(sidx, sidy-toolBarHeight)
})

canvas.addEventListener("mousemove", function(e) {
    let eidx = e.clientX
    let eidy = e.clientY
    if (isDrawing == false){
        return
    }
    let toolBarHeight = getYDelta()
    tool.lineTo(eidx, eidy-toolBarHeight)
    tool.stroke()
})

canvas.addEventListener("mouseup", function(e){
    isDrawing = false
})
// pencil logic end

// helper function
function getYDelta(){
    return toolbar.getBoundingClientRect().height;
}

// create Sticky
// 1. static version
// 2. how added to ui
// 3. how it will move/functionality

function createSticky(){
    let stickyDiv = document.createElement("div")
    let navDiv = document.createElement("div")
    let closeDiv = document.createElement("div")
    let minimizeDiv = document.createElement("div")
    let textArea = document.createElement("textarea")

    closeDiv.innerText = "X"
    minimizeDiv.innerText = "min"

    // class styling
    stickyDiv.setAttribute("class", "sticky")
    navDiv.setAttribute("class", "nav")
    textArea.setAttribute("class", "text-area")

    // tree structure
    stickyDiv.appendChild(navDiv);
    stickyDiv.appendChild(textArea);
    navDiv.appendChild(minimizeDiv);
    navDiv.appendChild(closeDiv);

    // append in body
    document.body.appendChild(stickyDiv)

    closeDiv.addEventListener("click", function(){
        stickyDiv.remove();
    })

    let isMinimized = false
    minimizeDiv.addEventListener("click", function(){
        if (isMinimized == false){
            isMinimized = true
            textArea.style.display = "block"
        }else{
            isMinimized = false
            textArea.style.display = "none"
        }
    })

    // navbar -> mouse down, mouse move, mouse up
}