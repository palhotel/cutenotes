
window.addEventListener('scroll', function(){
	var scrollTop = window.scrollY;
	var ele = document.getElementsByTagName('img')[0];
	var elem = document.getElementsByClassName('story3')[0];

	if(scrollTop && scrollTop > 500 && scrollTop < 1200){


		ele.classList.add('trans-animate');
		ele.style.left = '80%';
		ele.style.top = '60%';
		ele.style.opacity = 1.0;
		setTimeout(function(){
			ele.classList.remove('trans-animate');
		}, 1000);

	} else if(scrollTop && scrollTop > 1200){

		elem.style.background = 'url("image/pop01.png") no-repeat fixed top';
		elem.style.backgroundSize = '100% 100%';
	} else{
		ele.style.left = '0';
		ele.style.top = '0';
		ele.style.opacity = 0.0;
		elem.style.background = 'url("image/pop01-blur.png") no-repeat fixed top';
		elem.style.backgroundSize = '100% 100%';
	}
}, true);
