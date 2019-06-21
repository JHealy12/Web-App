var Ticket = function(date, time, depart, arrive, ticketType, adult, child){
    "use strict";
    this.journeydate = new Date(date +" "+ time);
    this.depart = depart;
    this.arrive = arrive;
	this.ticketType = ticketType;
	this.adult = adult;
	this.child = child;
    this.expired = false;
};

var tickets = [];

Ticket.prototype.toString = function(){
    "use strict";
    var ts = this.depart + '\n' + this.arrive + '\n' + this.ticketType + '\n' + this.adult + '\n' + this.child + '\n';
        this.journeydate.toString() + '\n';
    if (this.expired) {
        ts += "Expired\n\n";
    } else {
        ts += "Not Expired\n\n";
    }
    return ts;
};

Ticket.prototype.getDate = function(){
    "use strict";
    return this.journeydate.toDateString();
};

Ticket.prototype.getFullDate = function(){
    "use strict";
    var fd = this.journeydate.getDate() +"-"+ this.journeydate.getMonth() +"-"+ this.journeydate.getFullYear();
    return fd;
};

//Ticket.prototype.getTime = function () {
//    "use strict";
//    return this.journeydate.getHours() +":"+ this.journeydate.getMinutes();
//}; //Time didn't work

var twoDigit = function(t){
    "use strict";
    var str = t.toString();
    if (str.length < 2) {
        return '0' + str;
    }
    return str;
};


Ticket.prototype.getTime = function(){
    "use strict";
    return twoDigit(this.journeydate.getHours()) +":"+ twoDigit(this.journeydate.getMinutes());
};

var addTicket = function(dateField, timeField, depField, arrField, ticketOption, adltSelect, childSelect){
    "use strict";
    var tckt = new Ticket(dateField.value, timeField.value, depField.value, arrField.value, ticketOption.value, adltSelect.value, childSelect.value);
    tickets.push(tckt);
};

function tableData(content){
    "use strict";
    return "<td>"+ content +"</td>";
}

function ticketTable(clickhandler, index, tdElements){
    "use strict";
    var element, tt = "<tr onclick='"+ clickhandler +"(" + index + ")'>";
    for (element in tdElements){
        tt += tdElements[element];
    }
    tt += "</tr>";
    return tt;
}

function checkBox(index, clickhandler){
    "use strict";
    return "<input type='checkbox' onclick='" + clickhandler + "(" + index + ")'>";
}

Ticket.prototype.ticketTable = function(index){
    "use strict";
    var tt, me;
    me = this;

    tt = ticketTable("selectTicket", index, [tableData(this.getFullDate()),
                                               tableData(this.getTime()),
                                               tableData(this.depart),
											   tableData(this.arrive),
                                               tableData(this.ticketType),
											   tableData(this.adult),
                                               tableData(this.child),
                                               tableData(checkBox(index, "updateStatus"))]);
    return tt;
};

var saveTicketList = function(){
    "use strict";
    var tckts = JSON.stringify(tickets);
    if (tckts !== ""){
        localStorage.tickets = tckts;
    }else{
        window.alert("Could not save tickets at this time");
    }
};

var loadTicketList = function(){
    "use strict";
    var tckts = "", i, tckt, proto;
    if (localStorage.tickets !== undefined){
        tckts = localStorage.tickets;
        tickets = JSON.parse(tckts);
        proto = new Ticket();
        for (i = 0; i < tickets.length; i += 1){
            tckt = tickets[i];
            tckt.__proto__ = proto;
            tckt.journeydate = new Date(tckt.journeydate);
        }
    }
};