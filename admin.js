$.get("/api/appointments").then(res => displayAppointments(res));

function deleteAppointment(k) {
    $.ajax({
        type: 'DELETE',
        url: '/api/appointments',
        data: { "key": k },
        datatype: 'application/json'
    })
    location.reload();
}

function displayAppointments(appointmentsArray) {
    appointmentsArray.forEach((appointment) => {
        let appmt = {
            date: moment(appointment["start"]).format('LL'),
            name: appointment["name"],
            startTime: moment(appointment["start"]).format('LL'),
            endTime: moment(appointment["end"]).format('LT'),
            haircut: appointment["haircut"],
            additionalService: appointment["addOns"],
            appointmentDuration: appointment["duration"],
            dealsOrSpecial: appointment["deals"],
            key: appointment["key"]
        }

        let divCard = generateCard(appmt);

        // linebreak
        var br = document.createElement("BR");

        // Add card and spacing to DOM
        var appointmentContainer = document.getElementById("prime");
        appointmentContainer.appendChild(divCard);
        appointmentContainer.appendChild(br);
    })
}

function generateCard(appmt) {
    // Create div element, class card.
    var divCard = document.createElement("div");
    divCard.setAttribute("class", "card");

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
    pKey.setAttribute("class", "card-text");
    pKey.setAttribute("id", "cancellationKey");
    pKey.setAttribute("value", appmt.key);
    var txtKey = document.createTextNode("Appointment Key: " + appmt.key);
    pKey.appendChild(txtKey);

    // Create delete button
    var btnDelete = document.createElement("BUTTON");
    var txtLabel = document.createTextNode("Delete Appointment");
    btnDelete.setAttribute("class", "btn btn-primary")
    btnDelete.setAttribute("type", "button")
    btnDelete.setAttribute("onclick", "deleteAppointment('" + appmt.key + "')")
    btnDelete.appendChild(txtLabel);

    // Compose card
    divBody.appendChild(pName);
    divBody.appendChild(pTime);
    divBody.appendChild(pService);
    divBody.appendChild(pDealsOrSpecials);
    divBody.appendChild(pKey);
    divBody.appendChild(btnDelete);
    divCard.appendChild(h5);
    divCard.appendChild(divBody);
    return divCard;
}