 $(document).ready(function() {
  // page is now ready, initialize the calendar...

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
        $('#calendar').fullCalendar('renderEvent', {
           title: 'Promo Haircut',
           start: '2018-10-23',
           allDay: true
        });
    }
  
  // calendar.on('dayClick', function(date, jsEvent, view) {
  //   console.log('clicked on ' + date.format());
  // });
});