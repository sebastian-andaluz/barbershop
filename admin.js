$.get("/api/appointments").then(res => displayAppointments(res));

function deleteAppointment(k) {
  if(confirm("Are you sure you want to delete this appointment?")) {
    // Remove card from DOM
    let divCard = document.querySelector(".cancel-key[value='" + k + "']").parentNode.parentNode
    var appointmentContainer = document.getElementById("prime");
    appointmentContainer.removeChild(divCard);

    $.ajax({
      type: 'DELETE',
      url: '/api/appointments',
      data: { "key": k },
      datatype: 'application/json'
    })
  }
}

function editAppointment(a) {
  console.log(a);
  $("#name").val(a.name)
  $("#haircut").val(a.haircut)
  $("#addOns").val(a.addOns)
  $("#deals").val(a.deals)
  $("#duration").val(a.duration)
  $("#start").val(a.start)
  $("#end").val(a.end)
  $("#key").val(a.key)
  $("#editModal").modal('show');
}

function cancelEdit() {
  $("#editModal").modal('hide');
}

function acceptEdit() {
  let apt = {
    key: $("#key").val(),
    name: $("#name").val(),
    haircut: $("#haircut").val(),
    addOns: $("#addOns").val(),
    deals: $("#deals").val(),
    duration: $("#duration").val(),
    start: $("#start").val(),
    end: $("#end").val(),
  }
  $.ajax({
    type: 'PUT',
    url: '/api/appointments',
    data: apt,
    datatype: 'application/json'
  })
  $("#editModal").modal('hide');
}

function displayAppointments(appointmentsArray) {
  appointmentsArray.forEach((appointment) => {

    let divCard = generateCard(appointment);

    // Add card and spacing to DOM
    var appointmentContainer = document.getElementById("prime");
    appointmentContainer.appendChild(divCard);
    //appointmentContainer.appendChild(br);
  })
}

function generateCard(appointment) {
  let appmt = {
    date: moment(appointment["start"]).format('LL'),
    name: appointment["name"],
    startTime: moment(appointment["start"]).format('LT'),
    endTime: moment(appointment["end"]).format('LT'),
    haircut: appointment["haircut"],
    additionalService: appointment["addOns"],
    appointmentDuration: appointment["duration"],
    dealsOrSpecial: appointment["deals"],
    key: appointment["key"]
  }

  // Create div element, class card.
  var divCard = document.createElement("div");
  divCard.setAttribute("class", "card d-inline-flex bg-dark text-white ml-2 mr-2 mt-2 mb-2");

  // Create h5 element of class card-header.
  var h5 = document.createElement("h5");
  h5.setAttribute("class", "card-header");
  var txtH5 = document.createTextNode(appmt.date);
  h5.appendChild(txtH5);

  // Create div element of class card-body.
  var divBody = document.createElement("div");
  divBody.setAttribute("class", "card-body");

  // Create p elements of class card-text.
  // name
  var pName = document.createElement("P");
  pName.setAttribute("class", "card-text");
  var txtName = document.createTextNode("Name: " + appmt.name);
  pName.appendChild(txtName);

  // appointment time
  var pTime = document.createElement("P");
  pTime.setAttribute("class", "card-text");
  var txtTime = document.createTextNode("Appointment: " + appmt.startTime + " - " + appmt.endTime);
  pTime.appendChild(txtTime);

  // haircut and additional services
  var pService = document.createElement("P");
  pService.setAttribute("class", "card-text");
  var txtService = document.createTextNode("Service: " + appmt.haircut + " and " + appmt.additionalService);
  pService.appendChild(txtService);

  // dealsOrSpecials
  var pDealsOrSpecials = document.createElement("P");
  pDealsOrSpecials.setAttribute("class", "card-text");
  var txtDealsOrSpecials = document.createTextNode("Deal / Special: " + appmt.dealsOrSpecial);
  pDealsOrSpecials.appendChild(txtDealsOrSpecials);

  // key
  var pKey = document.createElement("P");
  pKey.setAttribute("class", "card-text cancel-key");
  pKey.setAttribute("value", appmt.key);
  var txtKey = document.createTextNode("Appointment Key: " + appmt.key);
  pKey.appendChild(txtKey);

  // Create delete button
  var btnDelete = document.createElement("BUTTON");
  var txtLabel = document.createTextNode("Delete");
  btnDelete.setAttribute("class", "btn btn-danger mr-3")
  btnDelete.setAttribute("type", "button")
  btnDelete.setAttribute("onclick", "deleteAppointment('" + appmt.key + "')")
  btnDelete.appendChild(txtLabel);

  // Create delete button
  var btnEdit = document.createElement("BUTTON");
  var txtLabel = document.createTextNode("Edit");
  btnEdit.setAttribute("class", "btn btn-warning ml-3")
  btnEdit.setAttribute("type", "button")
  btnEdit.setAttribute("onclick", "editAppointment(" + JSON.stringify(appointment) + ")")
  btnEdit.appendChild(txtLabel);

  // Compose card
  divBody.appendChild(pName);
  divBody.appendChild(pTime);
  divBody.appendChild(pService);
  divBody.appendChild(pDealsOrSpecials);
  divBody.appendChild(pKey);
  divBody.appendChild(btnDelete);
  divBody.appendChild(btnEdit);
  divCard.appendChild(h5);
  divCard.appendChild(divBody);
  return divCard;
}
