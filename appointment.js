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
    let title = document.getElementById('customerName').value;
    let haircut = document.getElementById('haircuts').value;
    let dealsOrSpecial = document.getElementById('dealsAndSpecials').value;
    let additionalService = document.getElementById('additionalServices').value;
    let appointmentDuration = this.getHaircutDuration(haircut) + this.getServicesDuration(additionalService);

    $('#popupModal').modal('hide');
    
    //alert(this.getServicesDuration(additionalService));

    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var key = Array.apply(null, Array(15)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');

    document.getElementById("cancelKey").innerHTML = key;

    $('#keyModal').modal('show');

    $('#calendar').fullCalendar('renderEvent', jsEvent);

    let start = moment(date);
    let end = moment(start).add(appointmentDuration, 'hour');
    $('#calendar').fullCalendar('renderEvent', {
      title: title + ": " + haircut + ' & ' + additionalService,
      start: start,
      end: end,
      allDay: false,
    });
    
    document.getElementById('customerName').value = '';
    document.getElementById('haircuts').value = '';
    document.getElementById('dealsAndSpecials').value = '';
    document.getElementById('additionalServices').value = '';
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
      editable: false,
    });
}

function getHaircutDuration(haircut){
    let totalDuration = .5;
    if( haircut == 'Full Haircut and Facial Hair'){
      totalDuration = totalDuration + .25;
    }
    //Could add more slots for varius haircut durations need info..
    return totalDuration;
}

function getServicesDuration(service){
  let totalDuration = 0;
  if (service == "Curl Sponge" ||
      service == "Eyebrows"){
    totalDuration = totalDuration + (5/60); //5 minutes
  }
  
  else if(service == "Shave" ||
            service == "Lineup" ||
            service == "Facial Hair"){
    totalDuration = totalDuration + (10/60); //10 minutes
  }
  
  else if(service == "Fade" ||
           service == "Taper" ||
          service == "Hot Towel"){
    totalDuration = totalDuration + (15/60); //15 minutes
  }
  
  else if(service == "Shampoo" ||
           service == "Hard Part"){
    totalDuration = totalDuration + (20/60); //20 minutes
  }
  
  else if(service == "Color" ||
           service == "Designs" ||
           service == "Facial Mask"){
    totalDuration = totalDuration + (30/60); //30 minutes
  }
  
  else if(service == "Hot Wax"){
    totalDuration = totalDuration + (60/60);//60 minutes
  }

  return totalDuration;
}


/*Notes for next sprint:
edit times for slots, X
doesn't show end time slot for just haircut and also shows empty additional service, --AUSTIN
reset popup modal,X
cancelling still adds a block, --AUSTIN
no allowing users to drag-edit time slots, --AUSTIN
warn users of cancelling appointments, X
fixed cancelled days (Sunday and Monday), --AUSTIN
see about changing color for current day selected, X
(more issues to add?)
?do deals and specials overrride haircuts?
*/