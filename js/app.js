//initialize hamburger menu slide option
$('.menu-link').bigSlide({
	'menuWidth': '4.5rem'
});


var $viewport_width = $(window).width();

$(window).on('resize', function(event) {
	if ($viewport_width >= 768) {
		//$('.menu-link').bigSlide({
		//'menuWidth': '0rem',
		//'state': 'open'
		console.log($viewport_width);
		}

	
});
