

// time and date elements
var time = moment().format("HH:mm A");
$(".time").text(time);

var day = moment().format("dddd");
$(".today").text(day);

var date = moment().format("Do MMMM YYYY");
$(".date").text(date);