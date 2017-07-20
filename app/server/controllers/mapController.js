/**
 * Google Maps controller
 * @type {GoogleMapsClient}
 */

var googleMapsClient = require('@google/maps').createClient({
    language:'ru',
    key: 'AIzaSyAYRuCVSVWJegYLyDtHQiT9PqHjF0e2kjY'
});

module.exports = {
    /**
     * Get results from Google Maps API by address
     * @param req
     * @param res
     */
    map: function (req, res) {
        var start = new Date().getTime();
        googleMapsClient.geocode({
            address: req.body.address
        },function (err, response) {
            var result = {
                time: (new Date().getTime()) - start,
                response: response.json.results
            };
            if (!err) {
                res.json(200,result);
            } else {
                res.json(400,null);
            }
        });
    }
};