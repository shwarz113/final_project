function modals() {
	//Modal 1
let popup_engineer = document.getElementsByClassName("popup_engineer")[0],
	popup_engineer_btn = document.getElementsByClassName("popup_engineer_btn")[0],
	popup_close1 = document.getElementsByClassName("popup_close")[1];

	popup_engineer_btn.addEventListener('click', () => {
		popup_engineer.style.display = 'block';
		document.documentElement.style.overflow = 'hidden';

	});

	popup_close1.addEventListener('click', () => {
		popup_engineer.style.display = "none";
		document.documentElement.style.overflow = '';
	});

	popup_engineer.addEventListener('click', (event) => {
		let target = event.target;
		if (target.className != "form" && target.className != "" && target.className != "form-control form_input" && target.className != "text-uppercase btn-block button" && target.className != "form_notice") {
			popup_engineer.style.display = "none";
			document.documentElement.style.overflow = '';
		}
	});

//Modal 2

let popup = document.getElementsByClassName("popup")[0],
	phone_link = document.getElementsByClassName("phone_link"),
	popup_close2 = document.getElementsByClassName("popup_close")[0];

	phone_link[0].addEventListener('click', () => {
		popup.style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
	});
	phone_link[1].addEventListener('click', () => {
		document.documentElement.style.overflow = 'hidden';
		popup.style.display = 'block';
	});
	popup_close2.addEventListener('click', () => {
		popup.style.display = "none";
		document.documentElement.style.overflow = '';
	});

	popup.addEventListener('click', (event) => {
		let target = event.target;
		if (target.className != "form" && target.className != "" && target.className != "form-control form_input" && target.className != "text-uppercase btn-block button" && target.className != "form_notice" && target.className != "status") {
			popup.style.display = "none";
			document.documentElement.style.overflow = '';
		}
	});

//Form & AJAX for MODAL-ZAMER
	var message = new Object();
		message.loading = "Загрузка...";
		message.success = "Спасибо! Скоро мы с вами свяжемся";
		message.failure = "Что-то пошло не так...";
	var statusMessage = document.createElement("div");
	statusMessage.classList.add("status");

		let formZamer = document.getElementsByClassName("form")[7],
			formCall = document.getElementsByClassName("form")[6],
			input = formZamer.getElementsByTagName("input");
			

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
					}
					else {
						statusMessage.innerHTML = message.failure;
					}
				}
			}
		});

		let mainForm = document.getElementsByClassName("main_form");


		document.body.addEventListener("click", (event) => {
			let target = event.target;
			if(target.getAttribute("name") == "user_phone") {
				target.addEventListener('keyup', () => {
					target.value = target.value.replace(/[^0-9\s]+/g,'');
				});
			}
			if( target.parentNode.classList.contains("main_form") && target.classList.contains("button")) {
					event.preventDefault();
					target.parentNode.appendChild(statusMessage);

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