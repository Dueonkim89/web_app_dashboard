//create hamburger menu
var nav = responsiveNav(".nav-collapse", {
	label: "&#9776;",
	transition: 500
});

//resize event to adjust based on changing viewport width.
$(window).resize(function() {
	if (window.innerWidth >= 768) {
		$('header h2').show();
		$('.members-and-activity #bottom-border').hide();
		$('.message-and-settings #bottom-border').hide();
		$('.social-media #bottom-border').hide();
	} else if (window.innerWidth < 768) {
		$('header h2').hide();
		$('.members-and-activity #bottom-border').show();
		$('.message-and-settings #bottom-border').show();
		$('.social-media #bottom-border').show();
	}
});

//load event to adjust based on starting viewport width.
$(window).load(function() {
	$('.alert_message').hide().delay(1250).slideDown(800);
	if (window.innerWidth >= 768) {
		$('header h2').show();
		$('.members-and-activity #bottom-border').hide();
		$('.message-and-settings #bottom-border').hide();	
		$('.social-media #bottom-border').hide();	
	}	
});

//allow UI to close alert message-and-settings
$('#x-button').click(function() {
	$(this).parent().parent().slideUp(800);
});

//chart settings
Chart.defaults.global.legend.display = false;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.defaultFontColor = '#000';
Chart.defaults.global.defaultFontFamily = "'Ubuntu', sans-serif";
Chart.defaults.global.defaultFontSize = 12;


//intialize the 3 default charts

//line chart
var ctx = document.getElementById("lineChart");
var myLineChart = new Chart (ctx, {
	type: 'line',
	data: {
		labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
		datasets: [{
			data: [500, 1000, 750, 1250, 1750, 1250, 1000, 1500, 2000, 1500, 2000],
			lineTension: 0.2,
			backgroundColor: 'rgba(128, 0, 128, 0.2)',	
			borderWidth: 1,
			borderColor: '#4B0082',
			pointBorderWidth: 2,
			pointRadius: 4,
			pointBackgroundColor: '#f5f5f5',
			pointHoverRadius: 6,
			pointHoverBackgroundColor: '#8EA9B9',
		}]				
	},
    options: {
		responsive: true,
		scales: {
		yAxes: [{
			ticks: {
			autoSkip: false,
			autoSkipPadding: 0,
			max: 2500,
			stepSize: 500,
			min: 0
			}
		  }]
		}
	}
});

//bar chart
var barChart = document.getElementById("barChart");
var myBarChart = new Chart (barChart, {
	type: 'bar',
	data: {
		labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
		datasets: [{
			data: [50, 75, 150, 100, 200, 180, 80],
			backgroundColor: '#7851A9',
			
		}]
	},
	options: {
		responsive: true,
		scales: {
		yAxes: [{
			ticks: {
				max: 250,
				stepSize: 50
				}
			}]
		}	
	}				
});

//donut chart
var donutChart = document.getElementById("donutChart");
var myDonutChart = new Chart (donutChart, {
	type: 'doughnut',
	data: {
		labels: ['Phones', 'Tablets', 'Desktops'],
		datasets: [{
			data: [920, 975, 4250],
			backgroundColor: ['#94bbde' ,'#32db43', '#7851A9' ],
			borderColor: '#BCC6CC'
		}]
	},
	options: {
		responsive: true,
		    legend: {
				display: true,
				position: 'right',
				labels: {
					boxWidth: 25,
					fontSize: 14,
					padding: 30
				}
			}		
	}
});

