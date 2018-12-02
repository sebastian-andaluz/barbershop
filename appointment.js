var appointments = [];

function getAppointmentsFromBackend(){
  $.get('/api/appointments').then((res) => {
    appointments = res;
    populateCalendarWithAppointments();
  })
}

function populateCalendarWithAppointments() {
  let calendarAppointments = []
  appointments.forEach((e)=>{
    let calendarApt = {
      "title": e.name + " " + e.haircut,
      "start": e.start,
      "end": e.end,
      "duration": e.duration
    }
    calendarAppointments.push(calendarApt);
  })
  $("#calendar").fullCalendar('addEventSource', calendarAppointments);
}

function renderExistingEvents(myEvents){
  $('#calendar').fullCalendar('renderEvents', myEvents);
}

function cancelAppt() {
  $('#cancelModal').modal('show');
}

function getKey() {
  return document.getElementById('cancellationKey').value;
}

function confirmCancel() {
  $.ajax({
    type: 'DELETE',
    url: '/api/appointments',
    data: {"key": getKey()},
    datatype: 'application/json'
  })
  $('#cancelModal').modal('hide');
  location.reload()
}

function dayClickIsAgendaDay(date, jsEvent, view){
  console.log('Enter dayClickIsAgendaDay');
  this.date = date;
  this.jsEvent = jsEvent;
  this.view = view;
  $('#popupModal').modal('show');
}

function dayClickIsMonth(date, jsEvent, view){
  console.log('Enter dayClickIsMonth');
  $('#calendar').fullCalendar('changeView', 'agendaDay');
  $('#calendar').fullCalendar('gotoDate', date);
}

function scheduleServiceClicked(){
  var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  console.log('Enter scheduleServiceClicked');
  let title = document.getElementById('customerName').value;
  let haircut = document.getElementById('haircuts').value;
  let dealsOrSpecial = document.getElementById('dealsAndSpecials').value;
  let additionalService = document.getElementById('additionalServices').value;
  let appointmentDuration = this.getHaircutDuration(haircut) + this.getServicesDuration(additionalService);
  var key = Array.apply(null, Array(15)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');

  //TODO: totalHours

  $('#calendar').fullCalendar('renderEvent', jsEvent);

  let start = moment(date);
  let end = moment(start).add(appointmentDuration, 'hour');

  let startString = JSON.stringify(start);
  let endString = JSON.stringify(end);

  var appointment = {
    "title":title,
    "haircut":haircut,
    "dealsOrSpecial":dealsOrSpecial,
    "additionalService":additionalService,
    "appointmentDuration":appointmentDuration,
    "key":key,
    "start":start.toDate(),
    "end":end.toDate()
  }

  //set appointment

  //get appointment

  $.post("/api/appointments", appointment);

  $('#popupModal').modal('hide');

  //alert(this.getServicesDuration(additionalService));

  document.getElementById("cancelKey").innerHTML = key;

  $('#keyModal').modal('show');


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




$(document).ready(function() {
  // page is now ready, initialize the calendar...
  var currentDate;
  var date, jsEvent, view;
  var dbEvents;

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
      dow: [1, 2, 3, 4, 5, 6], // Mon, Tue, Wed, Thur, Fri, Sat
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
  getAppointmentsFromBackend();
});

//block out day when full
