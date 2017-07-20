/**
 * Integrate Google Maps API
 * @type {{init: mapGUI.init, show: mapGUI.show}}
 */
var mapGUI = {
    /**
     * Init google maps
     * @param box
     */
    init: function (box) {
        this.map = new google.maps.Map(box, {
            zoom: 16,
            center: {lat: -34.397, lng: 150.644}
        });
        this.geocoder = new google.maps.Geocoder();

    },
    /**
     * Show location
     * @param location
     */
    show: function (location) {
        var c = this;
        c.map.setCenter(location);
        new google.maps.Marker({
            map: c.map,
            position: location
        });
    }
};

$(function() {
    mapGUI.init(document.getElementById('map'));
});