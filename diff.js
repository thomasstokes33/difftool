const COPY = "copy";
const DELETE = "delete";
const ADD = "add";


const TEST_DATA = [{
	'left':["a", "b", "c", "123"],
	'right':["a", "b", "c", "123"],
	'out': [COPY, COPY, COPY, COPY]
	},{
	'left':["a", "b", "c", "123"],
	'right':["", "", "", ""],
	'out': [DELETE, DELETE, DELETE, DELETE, ADD, ADD, ADD, ADD]
	},{
	'left':["", "", "", ""],
	'right':["a", "b", "c", "123"],
	'out': [DELETE, DELETE, DELETE, DELETE, ADD, ADD, ADD, ADD]
	},{
	'left':["", "", "", ""],
	'right':[],
	'out': [DELETE, DELETE, DELETE, DELETE]
	},{
	'left':["a", "b"],
	'right':["b", "a"],
	'out': [ADD, COPY, DELETE]
}];

function runTests() {
	for (var i = 0; i < TEST_DATA.length; i++) {
		runTest(TEST_DATA[i].left, TEST_DATA[i].right, TEST_DATA[i].out, i);
	}
}

function runTest(left, right, out, idx) {
	var d = diff(left, right);

	if (!d || d.length !== out.length) {
		console.log("Failed " + idx);
		console.log("d: " + d + " out: " + out);
		return;
	} else {
		for (var i = 0; i < out.length; i++) {
			if (d[i] !== out[i]) {
				console.log("Failed " + idx);
				console.log("d: " + d + " out: " + out);
				return;
			}
		}
	}
	console.log("Passed " + idx);
}


function diff(left, right) {
	// REMOVE FROM LEFT, ADD TO RIGHT, COPY

	var out  = [];
	var r_pointer = 0;
	// for each line1 in left
	for (var l=0; l<left.length; l++) {
		var line1 = left[l];
		var found = false;

		//	for each line2 in right beyond r_pointer
		for (var r=r_pointer; r<right.length; r++) {
			var line2 = right[r];

			if (line2 === line1) {
				for (var i=0; i<r-r_pointer; i++) {
					out.push(ADD);
				}
				out.push(COPY);
			    r_pointer = r + 1;
			    found = true;
				break;
			}
		}
		if (!found) {
			out.push(DELETE);
		}
	}
	for (var r = r_pointer; r < right.length; r++){
		out.push(ADD);
	}

	return out;
}

runTests();
