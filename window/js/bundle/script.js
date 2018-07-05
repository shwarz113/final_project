window.addEventListener("DOMContentLoaded", function() {

	let tabs = require('../parts/2tabs.js');
	let modals = require('../parts/1modals.js');
	let calc = require('../parts/5calc.js');
	let photo = require('../parts/3photo.js');
	let timer = require('../parts/4timer.js');

	tabs();
	modals();
	calc();
	photo();
	timer();

});