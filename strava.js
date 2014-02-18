var _ = require("underscore");
var request = require("request");
var formdata = require("form-data");
var async = require("async");
var Strava = module.exports = function(config_obj) {
    if (!(this instanceof Strava)) {
	return new Strava(config_obj);
    }

    var config = {
        oauth_base: 'https://www.strava.com/oauth/authorize'
	, api_base: 'https://www.strava.com/api/v3'
	, authorize_url: '/authorize'
    };
    
    this.config = _.extend(config, config_obj);
    
    this.http = request;

    if (!this.config.client_id) { 
	throw new Error('Missing Client ID');
    }
}

Strava.prototype.get = function(call, params, callback) {
    if(!call) throw new Error('call is required')
    if(!this.config.access_token) throw new Error('Valid access token is required')

    var url = this.config.api_base+call;

    params.access_token = this.config.access_token;
    
    this.http.get({url:url, json:true, qs:params}, callback);
}
Strava.prototype.uploads = function(params, gpx, callback) {
    var self = this;
    if (! gpx instanceof String) { 
	throw new Error("Sorry, only string uploads are implemented");
    }
    var form = new formdata()

    form.append("file", new Buffer(gpx), {
	filename: 'strava.gpx' || params.filename,
	contentType: 'application/xml',
	knownLength: gpx.length}); 
    form.append("activity_type", params.activity_type || "ride");
    form.append("data_type", params.data_type || "gpx");
    form.getLength(function(err, length) {
	request.post({
	    json:true,
	    url:self.config.api_base+"/uploads", 
	    headers:{
		"Authorization":"Bearer "+self.config.access_token,
		'Content-Length': length
	    },
	}, function(err, res, body) {
	    if (err) return callback(err, body);
	    if (body.error) {
		console.log(body);
		return callback(true, body);
	    }
	    var upload_id = body.id;
	    var activity_id = null;
	    async.doWhilst(function(callback) {
		setTimeout(function() {
		    request.get({
			json:true,
			url:self.config.api_base+"/uploads/"+upload_id, 
			headers:{
			    "Authorization":"Bearer "+self.config.access_token
			}
		    }, function(err, res, body) {
			if (err) {
			    console.log(err, body);
			    return callback(err, body);
			}
			activity_id = body.activity_id;
			console.log("Polling for upload status", body.status);
			callback(err, body);
		    });
		}, 1000);
	    }, function() {
		return (activity_id === null);
	    }, function(err) {
		callback(err,activity_id);
	    });
	})._form = form;
    })
};
