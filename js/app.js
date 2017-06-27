//create hamburger menu
var nav = responsiveNav(".nav-collapse", {
	label: "&#9776;",
	transition: 500
});

// select the checkboxes and select element to enable global access within script
let emailSettingsCheckBox = $( ".email-div [type=checkbox]" );
let profileSettingsCheckBox = $( ".profile-div [type=checkbox]" );
let timeZoneOptions = $('#timezone-options');


//resize event to adjust based on changing viewport width.
$(window).resize(function() {
	if (window.innerWidth >= 768) {
		$('header h2').show();
		$('.members-and-activity .bottom-border').hide();
		$('.message-and-settings .bottom-border').hide();
		$('.social-media .bottom-border').hide();
	} else if (window.innerWidth < 768) {
		$('header h2').hide();
		$('.members-and-activity .bottom-border').show();
		$('.message-and-settings .bottom-border').show();
		$('.social-media .bottom-border').show();
	}
});

//load event to adjust based on starting viewport width.
$(window).load(function() {
	let localStorageSettings = JSON.parse(localStorage.getItem('personalSettings'));
	if (localStorageSettings) {
		emailSettingsCheckBox.prop("checked", localStorageSettings[0]);
		profileSettingsCheckBox .prop("checked", localStorageSettings[1]);
		timeZoneOptions.val(localStorageSettings[2]);
	}
	$('.alert_message').hide().delay(950).slideDown(800);
	if (window.innerWidth >= 768) {
		$('header h2').show();
		$('.members-and-activity .bottom-border').hide();
		$('.message-and-settings .bottom-border').hide();	
		$('.social-media .bottom-border').hide();	
	}	
});

//allow UI to close alert message
$('#x-button').click(function() {
	$(this).parent().parent().slideUp(800);
});

//hide green alert marker after its clicked and show notifications
$('#bell-icon').click(function() {
	$('.marker').hide();
	$('.dropdown-content').toggle();
});

//set date
var todayDate = new Date();
var formattedDate = todayDate.toLocaleDateString();
formattedDate = formattedDate.split(''); 
formattedDate.splice(5,2);
formattedDate = formattedDate.join('');
$('.join-date').text(formattedDate);

//member list
const memberList = [
'Kendra Jenkins', 'Rebecca Wilson', 'Kelly Smith', 'Joan Chambers', 'Dawn Wood', 'Ashley Smith', 'Jenna Davis',
'Kelsey Graham', 'Paul Nixon', 'Brandon Carter', 'Earl Thomas', 'Jacqueline Washington', 'Brenda Edwards',
'Randy Robinson', 'Raymond	Flores', 'Gloria Perez', 'Jonathan Mitchell', 'Aaron Simmons', 'Norma Hughes', 
'Julie Thompson', 'Emily Cox', 'Donna Powell', 'Zoe Rodgers', 'Evelyn Watson', 'Stephen	Coleman', 'Mark	Sanders', 
'Harold	White', 'Timothy Alexander', 'Lillian Morris', 'Richard Morgan', 'John Turner', 'Carolyn Stewart', 
'Matthew Nelson', 'Nicholas Brown', 'Barbara Sanchez', 'Blake Adams', 'Nancy Murphy', 'Paula Gonzalez', 
'Nicole	Washington', 'Judy Brown', 'Patricia Taylor', 'Wayne Allen', 'Alan Gray', 'Chris Evans', 'Isaac Newton', 
'Thomas Edison', 'Nikola Tesla', 'Fred Lopez', 'Oscar Lopez', 'Gerry Simmons', 'Victor Brown', 'Fabiola Gonzalez', 
'Henry Parsons', 'George Bennett', 'Arthur Roberts', 'Wendy Robinson', 'Sally Roberts', 'Leslie Smith', 'Octavio Sousa', 
'Quincey West' ];

//chart settings
Chart.defaults.global.legend.display = false;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.defaultFontColor = '#000';
Chart.defaults.global.defaultFontFamily = "'Ubuntu', sans-serif";
Chart.defaults.global.defaultFontSize = 12;


//switch around between different chart options
$('.chartHeader ul li').click(function() {
	$(this).siblings().removeClass('selected');
	$(this).addClass('selected');
	let dataInfo = $(this).text();
	if (dataInfo) {
		myLineChart.data.datasets[0].data = lineChartData.data[dataInfo];
		myLineChart.data.labels = lineChartData.labels[dataInfo];
		myLineChart.options.scales.yAxes[0].ticks.max = lineChartData.max[dataInfo]; 
		myLineChart.options.scales.yAxes[0].ticks.stepSize = lineChartData.stepSize[dataInfo];
		myLineChart.update();
	}
});

//autocomplete jquery UI search input finder
$('#user_searcher').autocomplete({
		source: memberList,
		autoFocus: true,
		delay: 0,
		minLength: 0
});

//warning messages & success message
$('#send_button').click(function(event) {
	let $user_searcher = $('.message-section input');
	let $user_message = $('.message-section textarea');
	let userSearchError = $(`<p class="error_messages">Please enter a user.</p>`);
	let messageError = $(`<p class="error_messages">Please enter a message.</p>`);
	let successMessage = $(`<p class="success_message">Your message has been sent.</p>`);
	event.preventDefault();
	//refresh error message function
	let messageReferesher = function() {
		$('.error_messages').remove();
	};
	if ($user_searcher.val() === '' && $user_message.val() === '') {
		messageReferesher();
		$( $user_searcher ).removeAttr( "id" ).attr("id", "noUserFound");
		$( $user_message ).removeAttr( "id" ).attr("id", "noMessageFound");
		//inject error message
		$(userSearchError).insertAfter( $('#noUserFound') );
		//inject error message
		$(messageError).insertAfter( $('#noMessageFound') );
	} else if ($user_searcher.val() === '') {
		messageReferesher();
		$( $user_searcher ).removeAttr( "id" ).attr("id", "noUserFound");
		$(userSearchError).insertAfter( $('#noUserFound') );
		$( $user_message ).removeAttr( "id" ).attr("id", "user_message");
	} else if ($user_message.val() === '') {
		messageReferesher();
		$( $user_searcher ).removeAttr( "id" ).attr("id", "user_searcher");
		$( $user_message ).removeAttr( "id" ).attr("id", "noMessageFound");
		$(messageError).insertAfter( $('#noMessageFound') );
	} else {
		messageReferesher();
		$( $user_message ).removeAttr( "id" ).attr("id", "user_message").val('');
		$( $user_searcher ).removeAttr( "id" ).attr("id", "user_searcher").val('');
		$(successMessage).insertAfter( $($user_message) ).delay(1850).slideUp(700);
	}
});

//local storage to save settings
function saveLocalStorage(email, profile, timeZone) {
	let settingsArray = [];
	settingsArray.push(email, profile, timeZone);
	localStorage.setItem('personalSettings', JSON.stringify(settingsArray));
}

function emptyLocalStorage() {
	localStorage.removeItem('personalSettings');
}

$('#save_button').click(function(event) {
	event.preventDefault();
	emptyLocalStorage();
	let emailSettings = emailSettingsCheckBox.prop("checked");
	let profileSettings = profileSettingsCheckBox .prop("checked");
	let timeZoneSettings = timeZoneOptions.val();
	saveLocalStorage(emailSettings, profileSettings, timeZoneSettings);
});

$('#cancel_button').click(function(event) {
	event.preventDefault();
	emptyLocalStorage();
	timeZoneOptions.val('');
	emailSettingsCheckBox.prop("checked", false);
	profileSettingsCheckBox .prop("checked", false);
});


//alternative chart settings
const lineChartData = {
	labels: { Monthly: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
				Weekly: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"], 
				Daily: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun", "Mon", "Tues", "Wed"], 
				Hourly:["7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM"]
			},
	data: 	{ Weekly: [500, 1000, 750, 1250, 1750, 1250, 1000, 1500, 2000, 1500, 2000],
				Monthly: [8750, 5000, 6200, 7200, 4500, 3300, 5250, 6750, 8500, 6225, 4100, 6350],
				Hourly: [10, 5, 15, 30, 40, 45, 40, 50, 55, 45, 30, 15],
				Daily: [150, 285, 375, 315, 425, 475, 350, 175, 250, 325, 475]
			},
	max: { Weekly: 2500,
			Monthly: 9000,
			Hourly: 60,
			Daily: 500
		},
	stepSize: { Weekly: 500,
				Monthly: 1500,
				Hourly: 10,
				Daily: 100
			}			
};

//intialize the 3 default charts

//line chart
var ctx = document.getElementById("lineChart");
var myLineChart = new Chart (ctx, {
	type: 'line',
	data: {
		labels: lineChartData.labels.Weekly,
		datasets: [{
			data: lineChartData.data.Weekly,
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
			max: lineChartData.max.Weekly,
			stepSize: lineChartData.stepSize.Weekly,
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