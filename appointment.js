 $(document).ready(function() {
  // page is now ready, initialize the calendar...
  var currentDate;

  $('#calendar').fullCalendar({
    // put your options and callbacks here
    editable: true,
    eventLimit: true,
    weekMode: 'liquid',
    url: '#',
    themeSystem: 'bootstrap4',
    cursor: 'pointer',

    dayClick: function(date, jsEvent, view) {
      $('#popupModal').modal('show');
      //variable read across functions
      currentDate = date;
      // change the day's background color just for fun
      //$(this).css('background-color', 'red');

    },

      selectable: true,
      //events: events_array,
      eventRender: function(event, element) {
          element.attr('title', event.tip);
      }
  });

    this.clicked = function(){
      // alert(document.getElementById('timeSlot').value+':00');
        //this sets the time
        //TODO: separate between AM and PM
        currentDate.time(document.getElementById('timeSlot').value);
        $('#popupModal').modal('hide');

        var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var key = Array.apply(null, Array(6)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');

        document.getElementById("cancelKey").innerHTML = key;

        $('#keyModal').modal('show');

        $('#calendar').fullCalendar('renderEvent', {
          title: document.getElementById('haircuts').value,
          start: currentDate,
          allDay: false,
        });

    }

  // calendar.on('dayClick', function(date, jsEvent, view) {
  //   console.log('clicked on ' + date.format());
  // });

});

function cancelAppt() {
$('#cancelModal').modal('show');
}
