//initialize hamburger menu slide option
$('.menu-link').bigSlide({
	'menuWidth': '8rem'
});


var $viewport_width = $(window).width();

if ($viewport_width >= 768) {
	$('.menu-link').bigSlide({
	'menuWidth': '0rem',
	'state': 'open'
	});

}

