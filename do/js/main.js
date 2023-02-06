$(function() {

	new WOW().init();

	$('.navbar-tog').click(function() {
		$(this).toggleClass('navbar-on');
		$('.header__menu').toggleClass('active');
	});

	$(document).mouseup(function (e){
		var div = $(".header__menu, .navbar-tog");
		if (!div.is(e.target) 
		    && div.has(e.target).length === 0) { 
			$('.header__menu').removeClass('active');
			$('.navbar-tog').removeClass('navbar-on');
		}
	});

	$('.modal__close').click(function() {
		$(this).parent().parent().parent().parent().fadeOut(300);
		return false;
	});
	$('.modal__blackout').click(function() {
		$(this).parent().parent().fadeOut(300);
	});
});