// a place where all utility uses exist 

function shuffleArray(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}

//showing / hiding pages
function changePage(From, To){
    From.classList.remove("show")
    From.classList.add("hide")
    To.classList.remove("hide")
    To.classList.add("show")
}

//rendering boxes
function renderBoxes(array) {
    const box = document.querySelector(".boxes");
    box.style.display = "block"
    box.innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        box.appendChild(array[i])
    }
    document.querySelector(".rightBox").style.display = "none"
    document.querySelector(".leftBox").style.display = "none"
}

//rendering match boxes
function renderMatchBoxes() {
    const box = document.querySelector(".boxes");
    box.style.display = "none"
    document.querySelector(".rightBox").style.display = "block"
    document.querySelector(".leftBox").style.display = "block"

    document.querySelector(".rightBox").innerHTML = ""
    document.querySelector(".leftBox").innerHTML = ""
    let half = Math.round(Total.length/2)
    var Extras = (half)%TotalRow;
    var AmountToAdd = Math.round((half)/TotalRow);
    var samplesContainer = [];
    var index = 0;

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < TotalRow; j++) {
            let sample = document.createElement("div");
            sample.classList.add("row")
            sample.style.border = `3px solid #${Math.floor(Math.random()*16777215).toString(16)}`
            for (let k = 0; k < AmountToAdd; k++) {
                sample.innerHTML += `
                    <div class="box">${index}</div>
                `
                index++
            }
            samplesContainer.push(sample)
        }
    }
    samplesContainer.forEach((e,i) => {
        if(i+1 <= TotalRow) {
            document.querySelector(".leftBox").appendChild(e)
        }else {
            document.querySelector(".rightBox").appendChild(e)
        }
    })
    document.querySelector(".header").style.display = "none"
}

//rerolling
function reRoll(){
    shuffleArray(Total);
    const allboxes = document.querySelectorAll('.box')

    allboxes.forEach((e,i) => {
        e.innerHTML = Total[i]
    })
}

function GoBack() {
    document.querySelector(".header").style.display = "block";
    document.querySelector(".match").style.display = "none";
    document.querySelector(".matchResult").style.display = "none";
    document.querySelector(".normal").style.display = "block";
    renderBoxes(totalRows)
    document.querySelector("#mode").value = "normal"
}