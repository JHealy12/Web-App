/**
 * Created by b00279427 on 21/04/2016.
 */
var geocoder;

// This is needed to initialize the google library functions...
window.onload = function() {
    //google.maps.event.addDomListener(window, 'load', initialize);
    geocoder = new google.maps.Geocoder();
}

// This function converts from a LatLng value (a format defined by Google) to a PostCode.
// It will work for postcodes in most countries.  It will not give useful results for
// areas of ocean or sea.
function getPostcodeFromLocation(latlng) {
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                postcode = results[1].address_components[0].short_name;
                document.getElementById("postcode").innerText = postcode;
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status + "\nYou did not enter valid location data.  For a UK postcode," +
            " try longitudes in the range 0 to -6, and latitudes in the range 51 to 58.");
        }
    });
}