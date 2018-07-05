function timer() {
	//TIMER
	let deadline = '2018-07-04';

	function getTimeRemaining (endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()) - 10800000,
			seconds = Math.floor( (t/1000) % 60 ),
			minutes = Math.floor( (t/1000/60) %60 ),
			hours = Math.floor( t/(1000*60*60) % 24 ),
			days = Math.floor( t/(1000*60*60*24) );
		return {
			"total": t,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds,
			"days": days
		};
	};

	function setClock(endtime) {
		let timer_item = document.querySelectorAll('.timer_item');

		function updateClock() {
			let t = getTimeRemaining(endtime);
			timer_item[0].innerHTML = Math.floor(t.days / 10);
			timer_item[1].innerHTML = (t.days % 10);
			timer_item[2].innerHTML = Math.floor(t.hours / 10);
			timer_item[3].innerHTML = (t.hours % 10);
			timer_item[4].innerHTML = Math.floor(t.minutes / 10);
			timer_item[5].innerHTML = (t.minutes % 10);
			timer_item[6].innerHTML = Math.floor(t.seconds / 10);
			timer_item[7].innerHTML = (t.seconds % 10);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				for (let i = 0; i < timer_item.length; ++i) {
					timer_item[i].innerHTML = "0";
				}
			}
		};

		updateClock();
		var timeInterval = setInterval(updateClock, 1000);
	};
	setClock(deadline);


	//open popup in 60 seconds
	let openPopup = setTimeout(() => {
		popup.style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
	}, 60000);
}

module.exports = timer;