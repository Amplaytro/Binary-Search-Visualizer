/*
globals
console, document, setTimeout, window
*/
'use strict';
// you can put all that in another function or in a class

var block,
	blocks,
	container,
	output,
	number,
	num,
	start,
	end,
	flag,
	autorun,
	arr,
	id;

function initialise() {
	generateArray();
	document.getElementById("subarray").innerHTML = "";
	document.getElementById("fr").innerHTML = "i=0";
	document.getElementById("sr").innerHTML = "j=19";
	document.getElementById("tr").innerHTML = "FLOOR([0+19]/2)=9";
	document.getElementById("l1").innerHTML = "Array of 20 elements with indices";
	document.getElementById("l2").innerHTML = "Initialize start: i=0 and end: j=19";
	document.getElementById("l3").innerHTML = "Compare i and j ---> i<=j --> 0<=19 TRUE";
	document.getElementById("l4").innerHTML = "Finding middle element";
	document.getElementById("l5").innerHTML = "mid=FLOOR([start+end]/2)=FLOOR([0+19]/2)=9";
	document.getElementById("l6").innerHTML = "";
	blocks = document.querySelectorAll(".block");
	output = document.getElementById("text");

	//Extracting the value of the element to be searched
	number = document.getElementById("fname");
	number.disabled = false;
	number.readOnly = false;
	output.innerText = '';

	//Colouring all the blocks voilet
	for (var i = 0; i < blocks.length; i += 1) {
		blocks[i].style.backgroundColor = "#6b5b95";
	}

	block = null;
	start = 0;
	end = 19;
	flag = 0;
	autorun = false;
}

// Function to generate the array of blocks
function generateArray() {
	
	// Creating an array
	arr = [];

	// Filling array with random values
	for (let i = 0; i < 20; i++) {
		// Return a value from 1 to 100 (both inclusive)
		var val = Math.ceil(Math.random() * 100);
		arr.push(val);
	}

	// Sorting Array in ascending order
	arr.sort(function (a, b) {
		return a - b;
	});

	displayArray("array", 0, 19, 9);
}

function displayArray(id, start, end, mid) {
	var container = document.getElementById(id);
	container.innerHTML = '';
	for (let i = start; i <= end; i++) {
		var value = arr[i];

		// Creating element div
		var array_ele = document.createElement("div");

		// Adding class 'block' to div
		array_ele.classList.add("block");

		// Adding style to div
		array_ele.style.height = `${20}px`;
		array_ele.style.transform = `translate(${i * 30}px)`;

		// Creating array value
		var array_ele_label = document.createElement("label");
		array_ele_label.classList.add("block_id");
		array_ele_label.innerText = value;

		// Creating array index
		var array_index_label = document.createElement("label");
		array_index_label.classList.add("block_number");
		array_index_label.innerText = i;

		var starting_label = document.createElement("label");
	    starting_label.classList.add("starting");
		if ((i==start) && (i!=mid)) {
			starting_label.innerText = "i="+start;
		}

		var ending_label = document.createElement("label");
		ending_label.classList.add("ending");
		if ((i==end) && (i!=mid)) {
			ending_label.innerText = "j="+end;
		}

		var mid_label = document.createElement("label");
		mid_label.classList.add("mid");
		if ((i==mid) && (i!=start)) {
			mid_label.innerHTML = "mid="+mid;
		}

		var lab1 = document.createElement("label");
		lab1.classList.add("starting_mid");
		if ((start==mid) && (i!=end)) {
			lab1.innerText = "i=mid="+mid;
		}

		var lab2 = document.createElement("label");
		lab2.classList.add("starting_mid_ending");
		if (mid==end) {
			lab2.innerText = "i=mid=j="+mid;
		}

		var start_label = document.createElement("label");
		start_label.classList.add("start");
		if (i==start) {
			start_label.innerText = "start";
		}

		var end_label = document.createElement("label");
		end_label.classList.add("end");
		if (i==end) {
			end_label.innerText = "end";
		}

		var arrow_label = document.createElement("label");
		arrow_label.classList.add("arrow");
		if ((i==start) || (i==mid) || (i==end)) {
			arrow_label.innerHTML = '<img src="red_arrow.png" alt="Red arrow" height = "20px">';
		}
	
	    // Appending created elements to index.html
		array_ele.appendChild(array_ele_label);
		array_ele.appendChild(array_index_label);
		array_ele.appendChild(arrow_label);
		array_ele.appendChild(starting_label);
		array_ele.appendChild(ending_label);
		array_ele.appendChild(start_label);
		array_ele.appendChild(end_label);
		array_ele.appendChild(mid_label);
		array_ele.appendChild(lab1);
		array_ele.appendChild(lab2);
		container.appendChild(array_ele);
	}
}

function binaryStep(manual) {

	if (manual)
		autorun = false;
	if (block)
		block.style.backgroundColor = "#FF4979";

	//Midddle index
	let mid = Math.floor((start + end) / 2);
	block = blocks[mid];
	if (!block)
		return true;

	num = number.value;
	number.disabled = true;
	number.readOnly = true;

	//Value at mid index
	var value = Number(block.childNodes[0].innerHTML);
	console.log(`${num} : ${value} : [${start}, ${end}]`);

	//Current element is equal to the element
	//entered by the user
	if (value == num) {
		output.innerText = "Element Found";
		block.style.backgroundColor = "#13CE66";
		document.getElementById("fr").innerHTML = "i="+start;
		document.getElementById("sr").innerHTML = "j="+end;
		document.getElementById("tr").innerHTML = mid;
		displayArray("subarray", mid, mid, mid);
		document.getElementById("l1").innerHTML = "The desired element to search for in the array is "+num;
		document.getElementById("l2").innerHTML = num+" is compared with the element at mid ---> "+num+" = "+value;
		document.getElementById("l3").innerHTML = "Therefore the search for element "+num+" is done";
		document.getElementById("l4").innerHTML = "Element found at location "+mid;
		document.getElementById("l5").innerHTML = "";
		document.getElementById("l6").innerHTML = "";
		return true;
	}
	//Current mid is greater than the element enter by the user
	if (value > num) {
		end = mid - 1;
		mid = Math.floor((start + end) / 2);
		document.getElementById("fr").innerHTML = "i="+start;
		document.getElementById("sr").innerHTML = "j=mid-1="+mid+"-1="+end;
		document.getElementById("l1").innerHTML = "The desired element to search for in the array is "+num;
		document.getElementById("l2").innerHTML = num+" is compared with the element at mid ---> "+num+" != "+value+" and "+num+" < "+value;
		document.getElementById("l3").innerHTML = "Therefore the search for element "+num+" is done only in the first half"
		document.getElementById("l4").innerHTML = "Compare i and j ---> i<=j --> "+start+" <= "+end+" TRUE";
		document.getElementById("l5").innerHTML = "Finding middle element";
		document.getElementById("l6").innerHTML = "mid=FLOOR([start+end]/2)=FLOOR(["+start+"+"+end+"]/2)="+mid;
		}	
	else {
		start = mid + 1;
		mid = Math.floor((start + end) / 2);
		document.getElementById("fr").innerHTML = "i=mid+1="+mid+"+1="+start;
		document.getElementById("sr").innerHTML = "j="+end;
		document.getElementById("l1").innerHTML = "The desired element to search for in the array is "+num;
		document.getElementById("l2").innerHTML = num+" is compared with the element at mid ---> "+num+" != "+value+" and "+num+" > "+value;
		document.getElementById("l3").innerHTML = "Therefore the search for element "+num+" is done only in the second half"
		document.getElementById("l4").innerHTML = "Compare i and j ---> i<=j --> "+start+" <= "+end+" TRUE";
		document.getElementById("l5").innerHTML = "Finding middle element";
		document.getElementById("l6").innerHTML = "mid=FLOOR([start+end]/2)=FLOOR(["+start+"+"+end+"]/2)="+mid;
	}
	displayArray("subarray", start, end, mid);
	document.getElementById("tr").innerHTML = "FLOOR(["+start+"+"+end+"]/2)="+mid;
	block.style.backgroundColor = "#fbb500";

	if (start > end) {
		output.innerText = "Element Not Found";
		document.getElementById("l1").innerHTML = "The desired element to search for in the array is "+num;
		document.getElementById("l4").innerHTML = "Compare i and j ---> i<=j --> "+start+" <= "+end+" FALSE";
		document.getElementById("l5").innerHTML = "This implies array is completed";
		document.getElementById("l6").innerHTML = "Element not found in the array";
		return true;
	}

	return false;
}

// Asynchronous BinarySearch function
async function BinarySearch(delay = 1000) {
	if (autorun)
		return;

	autorun = true;
	while (autorun) {
		if (binaryStep())
			break;

		// To wait for .1 sec
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, delay)
		);
	}
	console.log('done');
}

window.onload = () => {
	initialise();
};
