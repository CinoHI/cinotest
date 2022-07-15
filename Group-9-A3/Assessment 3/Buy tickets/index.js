
let selected = new Image();
let unselected = new Image();
let bought = new Image();
selected.src = "img/selected.png";
unselected.src = "img/unselected1.png";
bought.src = "img/bought.png";
let myCanvas = document.getElementById("myCanvas");
myCanvas.width = 742;
myCanvas.height = 530;
let ctx = myCanvas.getContext("2d");

//  
let selectSeat = new Array(0);

// 
function drawSeat(x, y, isSole, isSelect) {
	// 
	let seatX = (y - 1) * 53;
	let seatY = (x - 1) * 53;
	if (isSelect=="1" && isSole=="0") {
		ctx.drawImage(selected, seatX, seatY, 48, 48);
	} else if(isSole=="1") {
		ctx.drawImage(bought, seatX, seatY, 48, 48);
	} else {
		ctx.drawImage(unselected, seatX, seatY, 48, 48);
	}
}

//
myCanvas.addEventListener("click", myCanvasBindEvent);

// 
function myCanvasBindEvent(event) {
	let price = 36.6;
	let x = event.offsetX;
	let y = event.offsetY;
	let i = Math.floor(x / 53) + 1;
	let j = Math.floor(y / 53) + 1;
	let index = (j - 1) * 14 + i;
	if(seatArry[index - 1].isSelect=="1"){
		seatArry[index - 1].isSelect = "0"
	}else{
		seatArry[index - 1].isSelect = "1"
	}
	$.each(seatArry, function(index, value) {
		// 遍历
		drawSeat(value.x, value.y, value.isSole, value.isSelect);
	});
	// 
	if (seatArry[index - 1].isSole == "0") {
		Seathint(i, j, price);
	}
}

function Seathint(row, col, price) {
	let index = (col - 1) * 14 + row;
	if (seatArry[index - 1].isSelect =="1") {
		selectSeat.push(seatArry[index - 1]);
	} else {
		let number = selectSeat.indexOf(seatArry[index - 1]);
		selectSeat.splice(number, 1);
	}
	seatChangHint(selectSeat, price);
}

function seatChangHint(arry, price) {
	let count = 0;
	$("#hint").children(".hint").remove();
	$.each(selectSeat, function(index, value) {
		let $item = creatHintSeat(value.x, value.y, price);
		$("#hint").append($item);
		count++;
	});
	let sum = count*price;
	sum = sum.toFixed(2);
	let str = "$"+sum +" "+"Confirm seat"
	$("#submit").find("p").text(str)
}


// 
function creatHintSeat(row, col, price) {
	let Coordinate = row + "Row" + col + "Col";
	let Price = "$" + price;
	let $item = $(
		`<div class="hint">
			<p id="info">${Coordinate}</p>
			<p id="price">${Price}</p>
		</div>`
	)
	return $item;
}

function distil() {
	let seatId = [];
	$.each(seatArry, function(index, value) {
		if (value.isSelect=="1") {
			seatId.push(value.data);
		}
	});
	return seatId;
}
function init() {
	$.each(seatArry, function(index, value) {
		drawSeat(value.x, value.y, value.isSole, value.isSelect);
	});
}
init();


$("#submit").bind("click",function(){
		let arr = distil();
		console.log(arr);
})