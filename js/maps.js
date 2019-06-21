var map;

function drawMap(latlng, screenElement){
    var mapOptions = {
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    request = {
     location: latlng,
    radius: '500',
    types: ['station']
 };
    var map = new google.maps.Map(document.getElementById(screenElement), mapOptions);
    var marker = new google.maps.Marker({radius: '500',

        position: latlng,
        map: map,
        title: "You are here!"
    });
     var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });
}

function initializeMap(maparea) {
    var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight()  - 1 : $(".ui-header").outerHeight(),
        footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight(),
        w = window.innerWidth * 0.9,
        h = window.innerHeight - header - footer - 20;
    $("#" + maparea).width(w).height(h);
}
