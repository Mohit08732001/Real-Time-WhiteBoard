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
            currentTool = "upload"
            uploadFile()
        }else if (toolName == "download"){
            currentTool = "download"
            downloadFile()
        }else if (toolName == "redo"){
            currentTool = "redo"
            redoFunction()
        }else if (toolName == "undo"){
            currentTool = "undo"
            undoFunction()
        }
    })
}

let undoStack = []
let redoStack = []

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
    let pointDesc = {
        x: sidx,
        y: sidy - toolBarHeight,
        desc: "md"
    }
    undoStack.push(pointDesc)
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

    let pointDesc = {
        x: eidx,
        y: eidy - toolBarHeight,
        desc: "mm"
    }
    undoStack.push(pointDesc)
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

function createOuterShell(){
    let stickyDiv = document.createElement("div")
    let navDiv = document.createElement("div")
    let closeDiv = document.createElement("div")
    let minimizeDiv = document.createElement("div")

    closeDiv.innerText = "X"
    minimizeDiv.innerText = "min"

    // class styling
    stickyDiv.setAttribute("class", "sticky")
    navDiv.setAttribute("class", "nav")
    
    // tree structure
    stickyDiv.appendChild(navDiv);
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
    let isStickyDown = false

    navDiv.addEventListener("mousedown", function(e){
        initialX = e.clientX
        initialY = e.clientY
        isStickyDown = true
    })

    navDiv.addEventListener("mousemove", function(e){
        if (isStickyDown == true){
            let finalX = e.clientX
            let finalY = e.clientY

            let dx = finalX - initialX
            let dy = finalY = initialY

            let {top, left} = stickyDiv.getBoundingClientRect()

            stickyDiv.style.top = top + dy + "px"
            stickyDiv.style.left = left + dx + "px"
            initialX = finalX
            initialY = finalY
        }
    })

    navDiv.addEventListener("mouseup", function(e){
        isStickyDown = false
    })

    return stickyDiv
}

function createSticky(){
    let stickyDiv = createOuterShell()
    let textArea = document.createElement("textarea")
    textArea.setAttribute("class", "text-area")
    stickyDiv.appendChild(textArea)
}

let upload_button = document.querySelector("#upload")
let input_tag = document.querySelector(".input-tag")
function uploadFile(){
    console.log("upload clicked")
    // input tag -> file [hide]
    // click image icon
    // should click input tag
    input_tag.click()
    // file read input tag
    input_tag.addEventListener("change", function(e){
        let data = input_tag.files[0]

        // add in ui
        let img = document.createElement("img")
        let url = URL.createObjectURL(data)
        img.src = url
        img.setAttribute("class", "upload-img")
        
        let stickyDiv = createOuterShell()
        stickyDiv.appendChild(img)
    })
}

function downloadFile(){
    // anchor button
    // href = canavas -> url
    // anchor click
    // anchor remove
    let a = document.createElement("a")
    a.download = "file.jpeg"

    let url = canvas.toDataURL("image/jpeg:base64")
    a.href = url
    a.click()
    a.remove()
}

function redraw(){
    for (let i = 0; i<undoStack.length; i++){
        let {x, y, desc} = undoStack[i]
        if (desc == "md"){
            tool.beginPath()
            tool.moveTo(x, y)
        }else if(desc == "mm"){
            tool.lineTo(x, y)
            tool.stroke()
        }
    }
}

function undoFunction(){
    if(undoStack.length > 0){
        tool.clearRect(0, 0, canvas.width, canvas.height)
        redoStack.push(undoStack.pop())
        redraw()
    }
}

function redoFunction(){
    if(undoStack.length > 0){
        tool.clearRect(0, 0, canvas.width, canvas.height)
        undoStack.push(redoStack.pop())
        redraw()
    }
}