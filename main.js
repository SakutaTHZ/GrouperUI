function start() {
	const variable1 = document.querySelector("#total").value;
	const variable2 = document.querySelector("#group").value;
	
	if(variable1 !== "" && variable2 !== "" && variable1*variable2 > 0) {
		generate(variable1,variable2);
		for (let i = 0; i < document.querySelectorAll(".important").length; i++) {
			document.querySelectorAll(".important")[i].disabled = false
		}
		
	}
}

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

function search() {
	const input = document.querySelector(".input").value
	const allrow = document.querySelectorAll('[data-groupname]');
	console.log("finding")
	allrow.forEach((e) =>{
		let allboxes = e.querySelectorAll(".data-box")
		allboxes.forEach((e) => {
			console.log(e.innerHTML.trim(), input)
			if(e.innerHTML.trim() == input) {
				console.log("found")
				e.classList.add("searched")
				e.scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'});
				setTimeout(() => {
					e.classList.remove("searched")
				}, 2000)
			}
		})
	})
}

function generate(input1=document.querySelector("#total").value, input2=document.querySelector("#group").value) {
	var Total = input1, Amount = input2
	var number = [],index = 0;
	var parent = document.querySelector(".groups-container");
	parent.innerHTML = ""
	var Extras = Total%input2;
	var AmountToAdd = Math.round(Total/input2);
	if((AmountToAdd * Amount)+Extras != Total) {AmountToAdd = AmountToAdd-1}

	for (let i = 1; i <= Total; i++) {
		number.push(i)
	}
	shuffleArray(number)
	
	var divs = [];
	for (let i = 1; i <= Amount; i++) {
		let color = Math.floor(Math.random()*16777215).toString(16)
		let container = document.createElement("div");
		container.classList.add("group-container")
		container.setAttribute('id', "save")
		container.setAttribute("data-groupname", `G${i}`)
		container.style.setProperty('--color', `#${color}`);
		for (let j = 0; j < AmountToAdd; j++) {
			container.innerHTML += `
				<div class="data-box" id="save">
					${number[index]}
				</div>
			`
			index++;
		}
		divs.push(container)
	}
	for (let i = 0; i < Extras; i++) {
		divs[i].innerHTML += `
			<div class="data-box" id="save">
				${number[index]}
			</div>
		`
		index++;
	}
	addToParent(parent,divs,0, 400)
	
}

function addToParent(parent,divs,index,time) {
	if(index >= divs.length) return
	parent.appendChild(divs[index])
	document.querySelector(`[data-groupname="${divs[index].getAttribute("data-groupname")}"]`).scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'})
	
	setTimeout(() => {
		addToParent(parent,divs,index+1,time)
		
	}, time)
}
