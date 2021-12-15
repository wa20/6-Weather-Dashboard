$(document).ready(function () {
    
// $('.currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'))
$('.trigger.example .accordion')
  .accordion({
    selector: {
      trigger: '.title .icon'
    }
  })
;

$('#currentDay').text(moment().format('ddd MMM Do: h:mm a'));
})