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
	popup_img.addEventListener('click', (e) => {
		let target = e.target;
		if(target.tagName != "IMG"){
			popup_img.style.display = 'none';
			document.documentElement.style.overflow = "";
		}
	});
}

module.exports = photo;