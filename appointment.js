 $(document).ready(function() {
  // page is now ready, initialize the calendar...
  var currentDate;
  var date, jsEvent, view;

  $('#calendar').fullCalendar({
    // put your options and callbacks here
    editable: true,
    eventLimit: true,
    weekMode: 'liquid',
    url: '#',
    themeSystem: 'bootstrap4',
    cursor: 'pointer',
    header: {
      left : 'title',
      right : 'today, month, agendaDay, prev, next',
    },
    businessHours: {
      dow: [ 1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
      start: '07:30', // 8am
      end: '18:00' // 6pm
    },

    dayClick: function(date, jsEvent, view) {
      console.log('Enter dayClick');
      if(view.type == 'agendaDay'){
        dayClickIsAgendaDay(date, jsEvent, view);
      } else if(view.type == 'month'){
        dayClickIsMonth(date, jsEvent, view);
      } else{
        console.log('Click from: ' +  view.type);
      }
    },

  });
  // calendar.on('dayClick', function(date, jsEvent, view) {
  //   console.log('clicked on ' + date.format());
  // });

});

function cancelAppt() {
$('#cancelModal').modal('show');
}

function dayClickIsAgendaDay(date, jsEvent, view){
    console.log('Enter dayClickIsAgendaDay');
    //variable read across functions
    this.date = date;
    this.jsEvent = jsEvent;
    this.view = view;
    $('#popupModal').modal('show');
    // change the day's background color just for fun
    //$(this).css('background-color', 'red');
    //selectable: true,
    //events: events_array,
    //$('#calendar').fullCalendar('renderEvent')
    //eventRender: function(event, element) {
    //    element.attr('title', event.tip);
    //}
}

function dayClickIsMonth(date, jsEvent, view){
    console.log('Enter dayClickIsMonth');
    $('#calendar').fullCalendar('changeView', 'agendaDay');
    $('#calendar').fullCalendar('gotoDate', date);
}

function scheduleServiceClicked(){
    console.log('Enter scheduleServiceClicked');
    this.view.title = document.getElementById('customerName').value;
    let haircut = document.getElementById('haircuts').value;
    let dealsOrSpecial = document.getElementById('dealsAndSpecials').value;
    let additionalService = document.getElementById('additionalServices').value;

    this.calculateAppointmentDuration(haircut, dealsOrSpecial, additionalService);

    $('#popupModal').modal('hide');

    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var key = Array.apply(null, Array(6)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');

    document.getElementById("cancelKey").innerHTML = key;

    $('#keyModal').modal('show');

    $('#calendar').fullCalendar('renderEvent', jsEvent);
    //$('#calendar').fullCalendar('renderEvent', {
    //  title: document.getElementById('haircuts').value,
    //  start: currentDate,
    //  allDay: false,
    //});
}

function scheduleServicesCloseClicked(){
  //THIS IS JUST HERE TO EXPERIMENT WITH RENDERING EVENTS :)
    console.log('Enter scheduleServicesCloseClicked');
    let start = moment(date);
    let end = moment(start).add(.08, 'hour');
    $('#calendar').fullCalendar('renderEvent', {
      title: 'test title',
      start: start,
      end: end,
      allDay: false,
    });

}

function calculateAppointmentDuration(haircut, deals, services){
    console.log('Haircut: ' + haircut + ' Deal: ' + deals + ' Service: ' + services);
}

function getHaircutDuration(haircut){
    let totalDuration = .5;
    if( haircut == 'Full Haircut and Facial Hair'){
      totalDuration = totalDuration + .25;
    }
    return totalDuration;
}

function getServicesDuration(service){
  let totalDuration = 0;
  if (service == "Curl Sponge"){
    totalDuration = totalDuration + .08; //5 minutes
  } else if(false) {
    totalDuration = totalDuration + .17; //10 minutes
  }else if(false){
    totalDuration = totalDuration + .25; //15 minutes
  }else if(false){
    totalDuration = totalDuration + .33; //20 minutes
  }else if(false){
    totalDuration = totalDuration + .5; //30 minutes
  }else if(false){
    totalDuration = totalDuration + .1;//60 minutes
  }

  return totalDuration;
}
