
window.addEventListener('scroll', function(){
	var scrollTop = window.scrollY;
	var ele = document.getElementsByTagName('img')[0];
	var elem = document.getElementsByClassName('story3')[0];

	if(scrollTop && scrollTop > window.innerHeight && scrollTop < window.innerHeight * 2){
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


$(document).ready(function () {
    $(".tempgauge").tempGauge({
        borderColor: "#adadad",
        borderWidth: 4,
        defaultTemp: 33,
        fillColor: "#dca943",
        labelSize: 12,
        labelColor: "black",
        maxTemp: 60,
        minTemp: -20,
        showLabel: true,
		showScale: true,
        width: 200
    });
	$('#magazine').turn({gradients: true, acceleration: true});

	$('.notes-left .title').click(function(){
		if($('.left').width() < $('body').width() * 0.2){
			$('.right').css({width : '80%'});
			$('.left').animate({width : '20%'}, 100);
		} else {
			$('.left').animate({width : '4%'}, 300);
			$('.right').animate({width : '96%'}, 300);
		}

	});

	//平滑跳转到锚点
	$('a[href*=#],area[href*=#]').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target && $target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
						scrollTop: targetOffset
					},
					500);
				return false;
			}
		}
	});

	$('.btn-panel').click(function(){
		$(this).dzPanel.togglePanel();
	});
//滚动监听
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var winHeight = $(window).innerHeight();
		var idx = parseInt((scrollTop + 2)/winHeight);
		if( !$($('li').get(idx)).hasClass('active') ){
			$('li').removeClass('active');
			$('li').get(idx).classList += 'active';
		}


	})

});