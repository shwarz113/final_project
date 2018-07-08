(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"../parts/1modals.js":2,"../parts/2tabs.js":3,"../parts/3photo.js":4,"../parts/4timer.js":5,"../parts/5calc.js":6}],2:[function(require,module,exports){
function modals() {
	//Modal 1
let popup_engineer = document.getElementsByClassName("popup_engineer")[0],
	popup_engineer_btn = document.getElementsByClassName("popup_engineer_btn")[0],
	popup_close1 = document.getElementsByClassName("popup_close")[1];

	popup_engineer_btn.addEventListener('click', function() {
		popup_engineer.style.display = 'block';
		document.documentElement.style.overflow = 'hidden';

	});

	popup_close1.addEventListener('click', function() {
		popup_engineer.style.display = "none";
		document.documentElement.style.overflow = '';
	});

	popup_engineer.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className != "form" && target.className != "" && target.className != "form-control form_input" && target.className != "text-uppercase btn-block button" && target.className != "form_notice" && target.className != "status") {
			popup_engineer.style.display = "none";
			document.documentElement.style.overflow = '';
		}
	});

//Modal 2

let popup = document.getElementsByClassName("popup")[0],
	phone_link = document.getElementsByClassName("phone_link"),
	popup_close2 = document.getElementsByClassName("popup_close")[0];

	phone_link[0].addEventListener('click', function() {
		popup.style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
	});
	phone_link[1].addEventListener('click', function() {
		document.documentElement.style.overflow = 'hidden';
		popup.style.display = 'block';
	});
	popup_close2.addEventListener('click', function() {
		popup.style.display = "none";
		document.documentElement.style.overflow = '';
	});

	popup.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className != "form" && target.className != "" && target.className != "form-control form_input" && target.className != "text-uppercase btn-block button" && target.className != "form_notice" && target.className != "status") {
			popup.style.display = "none";
			document.documentElement.style.overflow = '';
		}
	});

	//open popup in 60 seconds
	let openPopup = setTimeout(function() {
		popup.style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
	}, 60000);

//Form & AJAX for MODAL-ZAMER
	let message = new Object();
		message.loading = "Загрузка...";
		message.success = "Мы свяжемся с Вами в ближайшее время!";
		message.failure = "Возникла ошибка...";
	let statusMessage = document.createElement("div");
	statusMessage.classList.add("status");

		let formZamer = document.getElementsByClassName("form")[7],
			formCall = document.getElementsByClassName("form")[6],
			input = formZamer.getElementsByTagName("input"),
			input_call = formCall.querySelectorAll('input');
			

		formZamer.addEventListener("submit", function(event) {
			event.preventDefault();
			formZamer.appendChild(statusMessage);

			//AJAX
			let request = new XMLHttpRequest();
			request.open("POST", "server.php");

			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

			let formData = new FormData(formZamer);

			request.send(formData);

			request.onreadystatechange = function() {
				if (request.readyState < 4) {
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState == 4) {
					if (request.status == 200 && request.status < 300) {
						statusMessage.innerHTML = message.success;
						input[0].value = "";
						input[1].value = "";
					}
					else {
						statusMessage.innerHTML = message.failure;
					}
				}
			}
		});	

		//Form & AJAX for MODAL-CALL
		formCall.addEventListener("submit", function(event) {
			event.preventDefault();
			formCall.appendChild(statusMessage);

			//AJAX
			let request = new XMLHttpRequest();
			request.open("POST", "server.php");

			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

			let formData = new FormData(formCall);

			request.send(formData);

			request.onreadystatechange = function() {
				if (request.readyState < 4) {
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState == 4) {
					if (request.status == 200 && request.status < 300) {
						statusMessage.innerHTML = message.success;
						input_call[0].value = "";
						input_call[1].value = "";
					}
					else {
						statusMessage.innerHTML = message.failure;
					}
				}
			}
		});

		let mainForm = document.getElementsByClassName("main_form");

		document.body.addEventListener("click", function(event) {
			let target = event.target;
			if(target.getAttribute("name") == "user_phone") {
				target.addEventListener('keyup', function() {
					target.value = target.value.replace(/[^0-9\s]+/g,'');
				});
			}
			if( target.parentNode.classList.contains("main_form") && target.classList.contains("button")) {
					event.preventDefault();
					target.parentNode.appendChild(statusMessage);
					let input_mf = target.parentNode.querySelectorAll('input');

					let request = new XMLHttpRequest();
					request.open("POST", "server.php");
					request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					
					let mainFormData = new FormData(target.parentNode);

					request.send(mainFormData);

					request.onreadystatechange = function() {
						if (request.readyState < 4) {
							statusMessage.innerHTML = message.loading;
						} else if (request.readyState == 4) {
							if (request.status == 200 && request.status < 300) {
								statusMessage.innerHTML = message.success;
								input_mf[0].value = "";
								input_mf[1].value = "";
							}
							else {
								statusMessage.innerHTML = message.failure;
							}
						}
					}
				
			}
		});
}

module.exports = modals;
},{}],3:[function(require,module,exports){
function tabs() {
	//TABS 1
		let tabs = document.querySelector(".glazing_slider"),
			tab_item = document.querySelectorAll(".glazing_block"),
			tab_content = document.querySelectorAll(".glazing .row"),
			a_item = document.querySelectorAll('.glazing_slider a');

		function hideTabContent(a) {
		for (let i = a; i < tab_content.length; i++) {
			tab_content[i].classList.remove('show');
			tab_content[i].classList.add('hide');
			}
		}

		hideTabContent(1);

		function showTabContent(b) {
			if (tab_content[b].classList.contains('hide')) {
				hideTabContent(0);
				tab_content[b].classList.remove('hide');
				tab_content[b].classList.add('show');
			}
			for (let i = 0; i < a_item.length; ++i){
				a_item[i].classList.remove('active');
			}
		}

		tabs.addEventListener('click', function(event) {
			let target = event.target;
			if (target.tagName == "A") {
				for (let i = 0; i < tab_item.length; i++) {
					if (target.parentNode == tab_item[i]) {
						showTabContent(i);
						target.classList.add('active');
						break;
					}
				}
			}
		});

		//TABS 2
		function tabsDecoration() {

			let tabs = document.querySelector(".decoration_slider"),
			tab_item = document.querySelectorAll(".decoration_item"),
			tab_content = document.querySelectorAll(".decoration_content .row .tab_content"),
			a_item = document.querySelectorAll('.decoration_slider a');;

			function hideTabContent(a) {
			for (let i = a; i < tab_content.length; i++) {
				tab_content[i].classList.remove('show');
				tab_content[i].classList.add('hide');
				}
			}

			hideTabContent(1);

			function showTabContent(b) {
				if (tab_content[b].classList.contains('hide')) {
					hideTabContent(0);
					tab_content[b].classList.remove('hide');
					tab_content[b].classList.add('show');
				}
				for (let i = 0; i < a_item.length; ++i){
					a_item[i].parentNode.classList.remove('after_click');
				}
			}

			tabs.addEventListener('click', function(event) {
				let target = event.target;
				if (target.tagName == "A") {
					for (let i = 0; i < tab_item.length; i++) {
						if (target.parentNode.parentNode == tab_item[i]) {
							showTabContent(i);
							target.parentNode.classList.add('after_click');
							break;
						}
					}
				}
			});
	};
	tabsDecoration();
}

module.exports = tabs;
},{}],4:[function(require,module,exports){
function photo() {

	//photo
	let elem = document.querySelector(".works .container .row"),
		popup_img = document.querySelector(".popup_img"),
		img_center = document.querySelector(".img_center");
	let img = document.createElement("img");
	elem.addEventListener('click', function(event) {
		event.preventDefault();
		let target = event.target;
		if(!target.classList.contains("lupa") && target.tagName == "IMG") {
			popup_img.style.display = 'block';
			document.documentElement.style.overflow = "hidden";
			img.src = "";
			img.src = target.parentNode.href; 
			img_center.appendChild(img);
		}
	});
	popup_img.addEventListener('click', function(e) {
		let target = e.target;
		if(target.tagName != "IMG"){
			popup_img.style.display = 'none';
			document.documentElement.style.overflow = "";
		}
	});
}

module.exports = photo;
},{}],5:[function(require,module,exports){
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
}

module.exports = timer;
},{}],6:[function(require,module,exports){
function calc() {
	//calcPopup
	let popup_calc = document.querySelector(".popup_calc"),//modalCalc
		tab_container = document.querySelector(".glazing .container"),
		popup_calc_content = document.querySelector(".popup_calc_content"),//form1
		popup_calc_close = document.querySelector(".popup_calc_close"),//close1
		balcon_icons = document.querySelector(".balcon_icons"),//icons
		type_img = balcon_icons.querySelectorAll(".type_img"),//icon
		type_content = popup_calc_content.querySelectorAll(".type"),//big
		popup_calc_button = popup_calc_content.querySelector(".popup_calc_button"),//button
		input_c = popup_calc_content.querySelectorAll("input"),
		
		popup_calc_profile = document.querySelector(".popup_calc_profile"),//form2
		popup_calc_profile_close = popup_calc_profile.querySelector(".popup_calc_profile_close"),//close2
		popup_calc_profile_content = popup_calc_profile.querySelector(".popup_calc_profile_content"),
		view_type = popup_calc_profile.querySelector("#view_type"),
		popup_calc_profile_button = popup_calc_profile.querySelector(".popup_calc_profile_button"),
		checkbox_calc = popup_calc_profile.querySelectorAll(".checkbox"),

		popup_calc_end = document.querySelector('.popup_calc_end'),
		popup_calc_end_close = popup_calc_end.querySelector(".popup_calc_end_close"),
		popup_calc_end_inputs = popup_calc_end.querySelectorAll(".form_input"),
		popup_calc_end_btn = popup_calc_end.querySelector(".btn-block"),
		popup_calc_end_form = popup_calc_end.querySelector("form");

	let message = new Object();
		message.loading = "Загрузка...";
		message.success = "Мы свяжемся с Вами в ближайшее время!";
		message.failure = "Возникла ошибка...";
	let statusMessage = document.createElement("div");

	var balkon = new Object();

	tab_container.addEventListener('click', function(event) {
		event.preventDefault();
		let target = event.target;
		if(target.classList.contains('popup_calc_btn')) {
			popup_calc.style.display = 'block';
				showTypeContent(0);
				type_img[0].style.height = 55 + "px";
		}
	});

	popup_calc_close.addEventListener('click', function() {
		popup_calc.style.display = 'none';
		delete balkon;
		input_c[0].value = '';
		input_c[1].value = '';

	});

	popup_calc.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className != "popup_calc_content text-center" && target.className != "" && target.className != "form-control" && target.className != "button popup_calc_button" && !target.classList.contains("type") && !target.classList.contains("type_img")) {
			popup_calc.style.display = "none";
			document.documentElement.style.overflow = '';
			input_c[0].value = '';
			input_c[1].value = '';
			delete balkon;
		}
	});

	function hideTypeContent(a) {
			for (let i = a; i < type_content.length; i++) {
				type_content[i].classList.remove('show');
				type_content[i].classList.add('hide');
				}
			}

			hideTypeContent(1);

	function showTypeContent(b) {
				if (type_content[b].classList.contains('hide')) {
					hideTypeContent(0);
					type_content[b].classList.remove('hide');
					type_content[b].classList.add('show');
				}
				for (let i = 0; i < type_img.length; ++i) {
					type_img[i].style.height = 36 + "px";
				}
			}
	balcon_icons.addEventListener('click', function(event) {
		let target = event.target;
		event.preventDefault();
		if(target.classList.contains('type_img')) {
			for (let i = 0; i < type_img.length; ++i) {
				if(target == type_img[i]) {
					showTypeContent(i);
					type_img[i].style.height = 55 + "px";
					break;
				}
			}
		}
	});
	popup_calc_content.addEventListener('click', function(event) {
		let target = event.target;
		if(target.classList.contains("form-control")) {
				target.addEventListener('keyup', function() {
					target.value = target.value.replace(/[^0-9\s]+/g,'');
				});
			}
	});

	popup_calc_button.addEventListener('click', function() {
		balkon.width = popup_calc_content.querySelector("#width").value;
		balkon.height = popup_calc_content.querySelector("#height").value;
		popup_calc.style.display = 'none';
		popup_calc_profile.style.display = 'block';
		input_c[0].value = '';
		input_c[1].value = '';
		checkbox_calc[0].checked = false; 
		checkbox_calc[1].checked = false;
		view_type.options.selectedIndex = 0;

	});
	
	popup_calc_profile_close.addEventListener('click', function() {
		popup_calc_profile.style.display = 'none';
		delete balkon;
		checkbox_calc[0].checked = false; 
		checkbox_calc[1].checked = false;
		view_type.options.selectedIndex = 0;
	});

	popup_calc_profile.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className != "popup_calc_profile_content text-center" && target.className != "" && target.className != "form-control" && target.className != "button popup_calc_profile_button" && target.className != "checkbox" && target.className != "label" && target.className != "checkbox-custom") {
			popup_calc_profile.style.display = "none";
			document.documentElement.style.overflow = '';
			delete balkon;
			checkbox_calc[0].checked = false; 
			checkbox_calc[1].checked = false;
			view_type.options.selectedIndex = 0;
		}
	});
	
	popup_calc_profile_button.addEventListener('click', function() {
		balkon.view = view_type.options.selectedIndex;
		if(checkbox_calc[0].checked && checkbox_calc[1].checked) {
			alert('Выберите только 1 вариант!');
		} else if(!checkbox_calc[0].checked && !checkbox_calc[1].checked) {
			alert('Выберите 1 вариант!');
		} else 
		{
			(checkbox_calc[0].checked) ? balkon.profil = "Холодное" : balkon.profil = "Теплое";
			popup_calc_profile.style.display = 'none';
			popup_calc_end.style.display = 'block';
			popup_calc_end_inputs[0].value = "";
			popup_calc_end_inputs[1].value = "";
		}
	});

	popup_calc_end_close.addEventListener('click', function() {
		popup_calc_end.style.display = 'none';
		delete balkon;
		popup_calc_end_inputs[0].value = "";
		popup_calc_end_inputs[1].value = "";
		statusMessage.remove();
	});
	popup_calc_end.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className != "form" && target.className != "" && target.className != "form-control form_input" && target.className != "text-uppercase btn-block button" && target.className != "form_notice" && target.className != "status") {
			popup_calc_end.style.display = "none";
			document.documentElement.style.overflow = '';
			popup_calc_end_inputs[0].value = "";
			popup_calc_end_inputs[1].value = "";
			statusMessage.remove();
		}
	});
	popup_calc_end_btn.addEventListener('click', function(event) {
		event.preventDefault();
		balkon.user_name = popup_calc_end_inputs[0].value;
		balkon.user_phone = popup_calc_end_inputs[1].value;
		popup_calc_end_form.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open("POST", "server.php");
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send(JSON.stringify(balkon));
		request.onreadystatechange = function() {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState == 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
					delete balkon;
					popup_calc_end_inputs[0].value = "";
					popup_calc_end_inputs[1].value = "";
				}
				else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}

	});
}

module.exports = calc;
},{}]},{},[1]);
