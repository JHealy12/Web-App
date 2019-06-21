var dateField, timeField, departField, arriveField, ticketOption, adultSelect, childSelect;

function updateStatus(index){
    "use strict";
    tickets[index].expired = !tickets[index].expired;
    event.stopPropagation();
}

function selectTicket(index){
    "use strict";
    sessionStorage.current = index;
    open("#journeyplan");
    window.close();
}

var updateTicketList = function(collection){
    "use strict";
    var table = "<table id='tbl' border='2'><thead><th>Date</th><th>Time</th><th>Depart</th><th>Arrive</th><th>Ticket</th><th>Adult</th><th>Child</th><th>Expired</th></thead>",
        i, tckt;
    for (i = 0; i < collection.length; i += 1){
        tckt = collection[i];
        table += tckt.ticketTable(i);
    }

    table += "</table>";
    $("#ticketTable").html(table); // Calls the ticket table 
};

var addNew = function(){
    "use strict";
    selectTicket(-1);
};

var removeExpiredTickets = function(){
    "use strict";
    var i, killList = [];
    for (i = 0; i < tickets.length; i += 1){
        if (tickets[i].expired){
            killList.push(i);
        }
    }
    for (i = killList.length - 1; i >= 0; i -= 1){
        tickets.splice(killList[i], 1);
    }
    updateTicketList(tickets);
    saveTicketList();
};

$(document).ready(function(){
    "use strict";
    loadTicketList(); // Load Ticket List
    $("#addNewTicket").click(addNew); // Add New Ticket
    $("#removeExpired").click(removeExpiredTickets); // Remove Ticket
    updateTicketList(tickets);
});