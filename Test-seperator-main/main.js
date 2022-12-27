// main controllers 

var Total = [];
var totalRows = [];
var TotalRow

function start() {
    const inputfield = document.querySelector("#input1").value;
    var mainPage = document.querySelector(".firstPhase")
    var secPage = document.querySelector(".secondPhase")
    if(inputfield !== ""){
        changePage(mainPage, secPage)
        for (let i = 0; i < +inputfield; i++) {
            Total.push(i+1)
        }
        shuffleArray(Total)
    }else{
        alert("Add Something")
    }
}

//generation
function Generate() {
    const inputfield = document.querySelector("#input2").value;
    totalRows = []
    if(inputfield !== "") {
        var Extras = (Total.length)%inputfield;
        var AmountToAdd = Math.round((Total.length)/inputfield);
        TotalRow = +inputfield;
        
        var index = 0;
        (() => {
            if((AmountToAdd * TotalRow)+Extras !== Total.length) {AmountToAdd = AmountToAdd-1}
        })();
        console.log(totalRows)

        for (let i = 1; i <= TotalRow; i++) {
            let rowSample = document.createElement("div")
            rowSample.classList.add("row");
            rowSample.style.border = `3px solid #${Math.floor(Math.random()*16777215).toString(16)}`
            for (let k = 1; k <= AmountToAdd; k++) {
                rowSample.innerHTML += `
                    <div class="box">${Total[index]}</div>
                `
                index++
            }
            totalRows.push(rowSample)
        }
        for (let i = 0; i <= Extras-1; i++) {
            totalRows[i].innerHTML += `
                <div class="box">${Total[index]}</div>
            `
            index++
        }
        renderBoxes(totalRows)
        document.querySelector(".utils").style.left = "-10%"
        document.querySelector(".utils").onmouseover = (e) => {e.composedPath()[0].style.left = "1%"}
        document.querySelector(".utils").onmouseleave = (e) => {e.composedPath()[0].style.left = "-10%"}
        document.querySelector("#mode").disabled = false;
        document.querySelector("#mode").title = "";
    }
}

//search
function search(button){
    const input = +document.querySelector('#searchInput').value;
    if(input == "" || input > Total.length) {
        return
    }
    button.disabled = true;
    const allboxes = document.querySelectorAll('.box')
    allboxes.forEach((e,i) => {
        if(+e.innerHTML == input) {
            e.style.background = "orange"
            e.scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'});
            setTimeout(() => {
                allboxes.forEach(ele => {
                    ele.style.background = "none"
                });
                button.disabled = false
            }, 1000)
        }
    });
}

//mode handler
function modeHandler(self) {
    var value = self.options[self.selectedIndex].value;
    if(value == "normal") {
        document.querySelector(".match").style.display = "none"
        document.querySelector(".matchResult").style.display = "none"
        document.querySelector(".normal").style.display = "block"
        renderBoxes(totalRows)
    }else{

        document.querySelector(".match").style.display = "block"
        document.querySelector(".matchResult").style.display = "block"
        document.querySelector(".normal").style.display = "none"
        renderMatchBoxes()
    }
}

function Match(match) {
    var matched = match || [];
    if(Math.round(Total.length/2) == matched.length) {
        alert("done")
        return
    }
    const allleftRows = document.querySelector(".leftBox").querySelectorAll(".row")
    const allrightRows = document.querySelector(".rightBox").querySelectorAll(".row")

    var firstRrow = allleftRows[Math.floor(Math.random() * allleftRows.length)];
    var firstChosen = firstRrow.querySelectorAll(".box")[Math.floor(Math.random()* firstRrow.querySelectorAll(".box").length)];
    if(matched.length > 0) {
        for (let i = 0; i < matched.length; i++) {
            if(matched[i].first == firstChosen || matched[i].second == firstChosen) {
                Match(matched)
                return
            }
        }
        
    }
    firstChosen.scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'})
    firstChosen.style.background = "orange"
    
    setTimeout(() => {
        var secRrow = allrightRows[Math.floor(Math.random() * allrightRows.length)];
        var secChosen = secRrow.querySelectorAll(".box")[Math.floor(Math.random()* secRrow.querySelectorAll(".box").length)];
        secChosen.scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'})
        secChosen.style.background = "orange"

        setTimeout(() => {
            firstChosen.style.background = "none"
            secChosen.style.background = "none"
            matched.push({first: firstChosen,sec: secChosen})
            let res = ""
            for (let i = 0; i < matched.length; i++) {
                res += `
                    <p onclick=matchSearch([${matched[i].first.innerHTML},${matched[i].sec.innerHTML}])>${matched[i].first.innerHTML} and ${matched[i].sec.innerHTML}</p>
                `
            }
            
            document.querySelector(".result").innerHTML = res
            document.querySelector(".result").querySelectorAll("p")[document.querySelector(".result").querySelectorAll("p").length-1].scrollIntoView()
            Match(matched)
        }, 300)
    }, 500) // can be adjusted
}

function matchSearch(arr) {
    const allleftboxes = document.querySelector('.leftBox').querySelectorAll(".box")
    const allrightboxes = document.querySelector('.rightBox').querySelectorAll(".box")
    var array = arr;
    console.log(array)
    allleftboxes.forEach((e) => {
        if(array[0].toString() == e.innerHTML){
            e.style.background = "orange"
            e.scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'});
            setTimeout(() => {
                e.style.background = "none"
            }, 1000)
        }
    })
    allrightboxes.forEach((e) => {
        if(array[1].toString() == e.innerHTML){
            e.style.background = "orange"
            setTimeout(() => {
                e.scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'});
            }, 500)
            
            setTimeout(() => {
                e.style.background = "none"
            }, 1000)
        }
    })
}
