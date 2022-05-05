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

	//r_pointer = 0
	//for each line in left
	//	for each line in right beyond r_pointer
	return [COPY, COPY, COPY, COPY];
}

runTests();
