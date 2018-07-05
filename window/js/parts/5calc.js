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

	var balkon = new Object();

	tab_container.addEventListener('click', (event) => {
		event.preventDefault();
		let target = event.target;
		if(target.classList.contains('popup_calc_btn')) {
			popup_calc.style.display = 'block';
		}
	});

	popup_calc_close.addEventListener('click', ()=>{
		popup_calc.style.display = 'none';
		delete balkon;
	});

	popup_calc.addEventListener('click', (event) => {
		let target = event.target;
		if (target.className != "popup_calc_content text-center" && target.className != "" && target.className != "form-control" && target.className != "button popup_calc_button" && !target.classList.contains("type") && !target.classList.contains("type_img")) {
			popup_calc.style.display = "none";
			document.documentElement.style.overflow = '';
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

	balcon_icons.addEventListener('click', (event) => {
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
	popup_calc_content.addEventListener('click', (event) => {
		let target = event.target;
		if(target.classList.contains("form-control")) {
				target.addEventListener('keyup', () => {
					target.value = target.value.replace(/[^0-9\s]+/g,'');
				});
			}
	});

	popup_calc_button.addEventListener('click', () => {
		balkon.width = popup_calc_content.querySelector("#width").value;
		balkon.height = popup_calc_content.querySelector("#height").value;
		popup_calc.style.display = 'none';
		popup_calc_profile.style.display = 'block';
	});
	
	popup_calc_profile_close.addEventListener('click', () => {
		popup_calc_profile.style.display = 'none';
		delete balkon;
	});

	popup_calc_profile.addEventListener('click', (event) => {
		let target = event.target;
		if (target.className != "popup_calc_profile_content text-center" && target.className != "" && target.className != "form-control" && target.className != "button popup_calc_profile_button" && target.className != "checkbox" && target.className != "label" && target.className != "checkbox-custom") {
			popup_calc_profile.style.display = "none";
			document.documentElement.style.overflow = '';
			delete balkon;
		}
	});
	
	popup_calc_profile_button.addEventListener('click', () => {
		balkon.view = view_type.options.selectedIndex;
		if(checkbox_calc[0].checked && checkbox_calc[1].checked) {
			alert('Выберите только 1 вариант!');
		} else if(!checkbox_calc[0].checked && !checkbox_calc[1].checked) {
			alert('Выберите 1 вариант!');
		} else 
		{
			(checkbox_calc[0].checked) ? balkon.profil = "Холодный" : balkon.profil = "Теплый";
			popup_calc_profile.style.display = 'none';
			popup_calc_end.style.display = 'block';
		}
	});

	popup_calc_end_close.addEventListener('click', () => {
		popup_calc_end.style.display = 'none';
		delete balkon;
	});
	popup_calc_end.addEventListener('click', (event) => {
		let target = event.target;
		if (target.className != "form" && target.className != "" && target.className != "form-control form_input" && target.className != "text-uppercase btn-block button" && target.className != "form_notice" && target.className != "status") {
			popup_calc_end.style.display = "none";
			document.documentElement.style.overflow = '';
		}
	});
	popup_calc_end_btn.addEventListener('click', (event) => {
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
				}
				else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}

	});
}

module.exports = calc;