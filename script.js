

// time and date elements
var time = moment().format("HH:mm A");
$("#time").text(time);

var day = moment().format("dddd");
$("#today").text(day);

var date = moment().format("Do MMMM YYYY");
$(".date").text(date);



//temp cards date
var dayOne = moment().format("ddd");
$('#day1').text(dayOne);

var dayTwo = moment().add(1, 'days').format("ddd");
$('#day2').text(dayTwo);

var dayThree = moment().add(2, 'days').format("ddd");
$('#day3').text(dayThree);

var dayFour = moment().add(3, 'days').format("ddd");
$('#day4').text(dayFour);

var dayFive = moment().add(4, 'days').format("ddd");
$('#day5').text(dayFive);

var daySix = moment().add(5, 'days').format("ddd");
$('#day6').text(daySix);