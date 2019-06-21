function getListViewItems() {
    var index, list = "";
    for (station in stations)
        list += "<li id='" + stations[station] + "'>" +
            station + "</div></li>";
      return list;

}

function showDepartures(list) {

    var dep_list = " ", index;
    console.dir(list);
    for(index = 0; index < list.length; index +=1) {
        dep_list += li(list[index]);
    }
    $("#listTime").html(dep_list).listview('refresh')
    $("controls").collapsible("collapse");
}

function li(item) {

     var html = "<li><h3>";
    html += item.aimed_departure_time + ": Calling at Platform " + item.platform + "</h3><p>" + item.origin_name + " - " + item.destination_name + "</p><p>Book Tickets</p>";
    return html + "</li>";

}

var feedURL = "http://rss.journeycheck.com/firstscotrail/route?action=search&from=GLC&to=PYG&period=today&formTubeUpdateLocation=&formTubeUpdatePeriod=&savedRoute="

function getFeed(url, success){
    if(window.navigator.onLine) {
        $.jGFeed(url, function(feeds) {
            if(!feeds){
                return;
            } else {
                localStorage.setItem(url, JSON.stringify(feeds));
                success(feeds.title, feeds.entries);
            }
        });
    } else {
        var feed = JSON.parse(localStorage.getItem(url));
        if(feed && feed.length > 0) {
            success(feed.title, feed.entries);
        }
    }
}

    $(document).on("pagebeforeshow", function() {
        getFeed( feedURL, function(title, items) {
            $("#title").text(title);
            for(var index=0; index<items.length; index+=1){
                $("#list").append(formatItem(items[index]));
            }
              $("#list").listview("refresh");
        });

    function formatItem(item) {
        var li = document.createElement('li'),
            a = document.createElement('a'),
            p = document.createElement('p');
        a.setAttribute("href", item.link);
        a.setAttribute("style","white-space:normal;");
        a.innerText = item.title;
        p.innerText = item.contentSnippet;
        p.setAttribute("style", "white-space:normal;");
        a.appendChild(p);
        li.appendChild(a);
        return li;
    }
});
	
var CORE_URL="http://transportapi.com/v3/uk/",
		KEYS="api_key=93d360346b3b9dab36aa8e3841af97db&app_id=d4f2cad4",
		URL=CORE_URL+"train/station/$$FROM$$/$$DATE$$/$$TIME$$/timetable.json?"+KEYS+"&calling_at=$$TO$$";

$(document).ready(function() {

       $("#timetable").on('click',function ()  {
            var from = stations[$("#from-box").val()],
                to = stations[$("#to-box").val()],
                date = $("#date").val(),
                time = $("#time").val(),
          query_url = URL.replace("$$FROM$$", from)
                .replace("$$TO$$", to)
                .replace("$$DATE$$", date)
                .replace("$$TIME$$", time);
            console.log(query_url);
            $("#journey").text("journey-to" + $("#to-box").val()),
            $.ajax({
                url: query_url,
                type: 'GET',
                async: true,
              async:!0,
                contentType: "application/javascript",
                dataType: "jsonp",
                success: function (data) {
                    showDepartures(data.departures.all)

                },
                error: function (err) {
                    console.dir(err);
                }
            });
        });
		
    var lvList = getListViewItems();
    $("#from-list").html(lvList);
    $("#from-list").trigger('listview');
    $("#from-list").hide();
    $("#from-box").on("keypress", function () {
        if ($(this).val().length > 2) {
            $("#from-list").show();
        }
    });

    var lvList = getListViewItems();
    $('#to-list').html(lvList);
    $('#to-list').trigger('listview');
    $('#to-list').hide();
    $('#to-box').on("keypress", function () {
        if ($(this).val().length > 2) {
            $('#to-list').show();
        }
    });

    $("#from-list li").on("click", function () {
        var selectedItem = this;
        $("#from-box").val(selectedItem.textContent);
        $("#from-list").hide();
    });

    $("#to-list li").on("click", function () {
        var selectedItem = this;
        $("#to-box").val(selectedItem.textContent);
        $("#to-list").hide();
    });
    }).on("pageshow", "#findStation", function() {

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), "map");
        });
    }

}).ready(function() {

    google.maps.event.addDomListener(window, 'load', function() {
        initializeMap("map");
    });
    });

function fitCanvas() {
    var h = $.mobile.getScreenHeight() - 4,
        w = $(window).width() - 4;
    screenDims.x = w;
    screenDims.y = h;
    $("#c").attr("width", w);
    $("#c").attr("height", h);
}

$(document).on( "pagecontainershow", "#canvaspage", function(){
    fitCanvas();
});

$(window).on("resize orientationchange", "#canvaspage", function(){
    fitCanvas();
});








