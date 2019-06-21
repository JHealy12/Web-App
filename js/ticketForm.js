var dateField, timeField, departField, arriveField, ticketOption, adultSelect, childSelect;

var addTicket = function(dateField, timeField, depField, arrField, ticketOption, adltSelect, childSelect){
    "use strict";
    var at = new Ticket(dateField.value, timeField.value, depField.value, arrField.value, ticketOption.value, adltSelect.value, childSelect.value);
    tickets.push(at);
};

var clearForm = function(){
    "use strict";
    var white = "#fff";
    dateField.value = "";
    dateField.style.backgroundColor = white;
    timeField.value = "";
    timeField.style.backgroundColor = white;
    departField.value = "";
    departField.style.backgroundColor = white;
    arriveField.value = "";
    arriveField.style.backgroundColor = white;
    ticketOption.value = "";
    ticketOption.style.backgroundColor = white;
    adultSelect.value = "";
    adultSelect.style.backgroundColor = white;
    childSelect.value = "";
    childSelect.style.backgroundColor = white;
};

var addNew = function(){
    "use strict";
    addTicket(dateField, timeField, departField, arriveField, ticketOption, adultSelect, childSelect);
    clearForm();
};

var updateExistingTicket = function(index){
    "use strict";
    tickets[index].journeydate = new Date(dateField.value +" "+ timeField.value);
    tickets[index].depart = departField.value;
    tickets[index].arrive = arriveField.value;
    tickets[index].ticketType = ticketOption.value;
    tickets[index].adult = adultSelect.value;
    tickets[index].child = childSelect.value;
    clearForm();
};

var cancelProcess = function(){
    "use strict";
    open("#tickets");
    window.close();
};

var showTicket = function(index){
    "use strict";
    if (index > -1){
        dateField.value = tickets[index].getFullDate();
        timeField.value = tickets[index].getTime();
		departField.value = tickets[index].depart;
        arriveField.value = tickets[index].arrive;
		ticketOption.value = tickets[index].ticketType;
        adultSelect.value = tickets[index].adult;
		childSelect.value = tickets[index].child;
    }
};

function addOrUpdateTicket(){
    "use strict";
    var current = sessionStorage.current;
    if(current > -1){
        updateExistingTicket(current);
    }else{
        addNew();
    }
    saveTicketList();
    open("#tickets");
    window.close();
}

$(document).ready(function(){
    "use strict";
    loadTicketList();
    dateField = $("#date")[0];
    timeField = $("#time")[0];
    departField = $("#depart")[0];
    arriveField = $("#arrive")[0];
    ticketOption = $("#ticketType")[0];
    adultSelect = $("#adult")[0];
    childSelect = $("#child")[0];
    $("#save").click(addOrUpdateTicket);
    $("#cancel").click(cancelProcess);
    showTicket(sessionStorage.current);
});