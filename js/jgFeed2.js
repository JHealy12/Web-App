/*Google’s own feed API taken from lab work for use in the geolocation map and custom feeds section of the web application.*/

(function ($) {
    $.extend({
        jGFeed: function (url, fnk, num, key) {
            // Make sure url to get is defined
            if (url == null) return false;
            // Build Google Feed API URL
            var gurl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + url;
            if (num != null) gurl += "&num=" + num;
            if (key != null) gurl += "&key=" + key;
            // AJAX request the API
            $.getJSON(gurl, function (data) {
                if (typeof fnk == 'function')
                    fnk.call(this, data.responseData.feed);
                else
                    return false;
            });
        }
    });
})(jQuery);
