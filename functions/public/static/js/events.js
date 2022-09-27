function createEventElement(event) {
    let date = event.startDate.toDate().toDateString();
    var _string =
        `<div class="card" id="events-card" style="width: 15rem;">
                <img class="card-img-top"
                    src="${event.coverURL}"
                    alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${event.eventTitle}</h5>
                    <p class="card-text"><i class='fas fa-calendar-alt' id="date"></i>${date}</p>
                    <p class="card-text"><i class='fas fa-map-marker-alt' id="location"></i>${event.location}</p>
                    <a href="${event.compuTicket}" class="btn btn-primary" id="ticket">Buy Ticket</a>
                </div>
            </div>  `;


    $('#eventsrow').append(_string);
}

firebase.firestore().collection("events").orderBy("startDate").limit(4)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.exists) {
                // Convert to City object
                var city = doc.data();
                $("#spinnerEvents").hide();
                createEventElement(city);
            } else {
                console.log("No such document!")
            }

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });