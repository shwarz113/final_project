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