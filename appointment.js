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
  
  //var calendar = $('#calendar').fullCalendar('getCalendar');
  
    this.clicked = function(){
      // alert(document.getElementById('timeSlot').value+':00');
        //this sets the time
        //TODO: separate between AM and PM
        currentDate.time(document.getElementById('timeSlot').value);
        
        $('#calendar').fullCalendar('renderEvent', {
          title: document.getElementById('haircuts').value,
          start: currentDate,
          allDay: false,
        });
        
        //alert(document.getElementById('dealsAndSpecials').value);
    }
  
  // calendar.on('dayClick', function(date, jsEvent, view) {
  //   console.log('clicked on ' + date.format());
  // });
});