var _ = require("underscore");
var request = require("request");
var formdata = require("form-data");
var async = require("async");
function responseHandler(callback) {
    return function handler(err, res, body) {
	if (err) {
	    err.res = res;
	    return callback(err, body);
	} 
	if (res.statusCode >= 400 && res.statusCode <= 599) {
	    
	    err = new Error("HTTP error "+res.statusCode);
//	    err.res = res;
	    return callback(err, body);
	}
	if (body && body.errors) {
	    err = new Error("API Error "+res.statusCode);
//	    err.res = res;
	    return callback(err, body);
	}
//	if (body === undefined) {
//	    console.log(err, res, body);
//	}
	return callback(null, body);
    };
}
	
var Strava = function(config_obj) {
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
    var self = this;
    this.athlete = {
	get: function(params, callback) {
	    if (typeof params == 'function') {
		callback = params;
		params = {};
	    }
	    self._get("/athlete", params, responseHandler(callback));
	},
	update: function(params, callback) {
	    if (typeof params == 'function') {
		callback = params;
		params = {};
	    }
	    throw new Error("not implemented");
	},
	followers: {
	    get: function(params, callback) {
		if (typeof params == 'function') {
		    callback = params;
		    params = {};
		}
		self._get("/athlete/followers", params, responseHandler(callback));
	    }
	},
	friends: {
	    get: function(params, callback) {
		if (typeof params == 'function') {
		    callback = params;
		    params = {};
		}
		self._get("/athlete/friends", params, responseHandler(callback));
	    }
	},
	bothfollowing: {
	    get: function(params, callback) {
		if (typeof params == 'function') {
		    callback = params;
		    params = {};
		}
		self._get("/athlete", params, responseHandler(callback));
	    }
	},
	activities: {
	    get: function(params, callback) {
		if (typeof params == 'function') {
		    callback = params;
		    params = {};
		}
		if (params.paginate) {
		    self._paged_get("/athlete/activities", params, callback);
		} else {
		    self._get("/athlete/activities", params, responseHandler(callback));
		}
	    }
	},
	clubs: {
	    get: function(params, callback) {
		if (typeof params == 'function') {
		    callback = params;
		    params = {};
		}
		self._get("/athlete/clubs", params, responseHandler(callback));
	    }
	}
    };
    this.athletes = {
	get: function(id, params, callback) {
	    if (typeof params == 'function' && arguments.length == 2) {
		callback = params;
		params = {};
	    }
	    if (typeof id == 'function' && arguments.length == 1) {
		callback = id;
		params = {};
		return self.athlete.get(params, callback);
	    }
	    self._get("/athletes/"+id, params, responseHandler(callback));
	},
	update: function(id, params, callback) {
	    if (typeof id == 'function' && arguments.length == 1) {
		callback = id;
		params = {};
		return self.athlete.update(params, callback);
	    }
	    //self.put
	},
	koms: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
		    callback = params;
		    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
		    callback = id;
		    params = {};
		    return self.athlete.koms(params, callback);
		}
		self._get("/athletes/"+id+"/koms", params, responseHandler(callback));
	    }
	},
	friends: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
		    callback = params;
		    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
		    callback = id;
		    params = {};
		    return self.athlete.friends(params, callback);
		}
		self._get("/athletes/"+id+"/friends", params, responseHandler(callback));
	    }
	},
	followers: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
		    callback = params;
		    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
		    callback = id;
		    params = {};
		    return self.athlete.folllowers(params, callback);
		}
		self._get("/athletes/"+id+"/followers", params, responseHandler(callback));
	    }
	},
	bothfollowing: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
		    callback = params;
		    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
		    callback = id;
		    params = {};
		    return self.athlete.bothfolllowing(params, callback);
		}
		self._get("/athletes/"+id+"/both-following", params, responseHandler(callback));
	    }
	}
    };
    this.activities = {
	get:function(id, params, callback) {
	    if (typeof params == 'function' && arguments.length == 2) {
                callback = params;
                params = {};
            }
            if (typeof id == 'function' && arguments.length == 1) {
                throw new Error("Activity ID is required");
		
            }
            self._get("/activities/"+id, params, responseHandler(callback));
	},
	create:function(params, callback) {
	    throw new Error("not implemented");
	},
	update:function(id, params, callback) {
	    throw new Error("not implemented");
	},
	delete:function(id, params, callback) {
	    throw new Error("not implemented");
	},
	comments: {
	    get:function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Activity ID is required");
		    
		}
		self._get("/activities/"+id+"/comments", params, responseHandler(callback));
	    }
	},
	kudos: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Activity ID is required");
		    
		}
		self._get("/activities/"+id+"/kudos", params, responseHandler(callback));
	    }
	},
	photos:{
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Activity ID is required");
		    
		}
		self._get("/activities/"+id+"/photos", params, responseHandler(callback));
	    }
	},
	following: {
	    get: function(params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}

		self._get("/activities/following", params, responseHandler(callback));
	    }
	},
	zones: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Activity ID is required");
		    
		}
		self._get("/activities/"+id+"/zones", params, responseHandler(callback));
	    }
	},
	laps: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Activity ID is required");
		    
		}
		self._get("/activities/"+id+"/laps", params, responseHandler(callback));
	    }
	},
	streams: {
	    get: function(id, types, params, callback) {
		if (typeof params == 'function' && arguments.length == 3) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 2) {
                    throw new Error("Activity ID is required");
		}
		if (arguments.length < 3) {
		    throw new Error("Invalid arguments");
		}
		types = types.join(",");

		types = "time";
		console.log("ST",types, id, params);
		self._get("/activities/"+id+"/streams/"+types, params, responseHandler(callback));
	    }
	}
    };
    this.clubs = {
	get: function(id, params, callback) {
	    if (typeof params == 'function' && arguments.length == 2) {
                callback = params;
                params = {};
            }
            if (typeof id == 'function' && arguments.length == 1) {
                throw new Error("Club ID is required");
		
            }
            self._get("/clubs/"+id, params, responseHandler(callback));
	},
	members: {
	    get:function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                callback = params;
                params = {};
            }
            if (typeof id == 'function' && arguments.length == 1) {
                throw new Error("Club ID is required");
		
            }
            self._get("/clubs/"+id+"/members", params, responseHandler(callback));

	    }
	},
	activities: {
	    get:function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                callback = params;
                params = {};
            }
            if (typeof id == 'function' && arguments.length == 1) {
                throw new Error("Club ID is required");
		
            }
            self._get("/clubs/"+id+"/activities", params, responseHandler(callback));

	    }
	}
    };
    this.gear = {
	get: function(id, params, callback) {
	    if (typeof params == 'function' && arguments.length == 2) {
                callback = params;
                params = {};
            }
            if (typeof id == 'function' && arguments.length == 1) {
                throw new Error("Gear ID is required");
		
            }
            self._get("/gear/"+id, params, responseHandler(callback));

	}
    };
    this.segments = {
    	get: function(id, params, callback) {
	    if (typeof params == 'function' && arguments.length == 2) {
                callback = params;
                params = {};
            }
            if (typeof id == 'function' && arguments.length == 1) {
                throw new Error("Segment ID is required");
		
            }
            self._get("/segments/"+id, params, responseHandler(callback));

	},
	streams: {
	    get: function(id, types, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Segment ID is required");
		    
		}
		self._get("/segments/"+id+"/streams", params, responseHandler(callback));
		
	    }
	},
	starred: {
	    get: function(params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		self._get("/segments/starred", params, responseHandler(callback));
		
	    }
	},
	explore: {
	    get: function(params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		self._get("/segments/explore", params, responseHandler(callback)); 
	    }
	    
	},
	leaderboard: {
	    get: function(id, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Segment ID is required");
		    
		}
		self._get("/segments/"+id+"/leaderboard", params, responseHandler(callback));
	    }
	}


    };
    this.segmentefforts = {
	get: function(id, params, callback) {
	    if (typeof params == 'function' && arguments.length == 2) {
                callback = params;
                params = {};
            }
            if (typeof id == 'function' && arguments.length == 1) {
                throw new Error("Gear ID is required");
		
            }
            self._get("/segment_efforts/"+id, params, responseHandler(callback));
	},
	streams: {
	    get: function(id, types, params, callback) {
		if (typeof params == 'function' && arguments.length == 2) {
                    callback = params;
                    params = {};
		}
		if (typeof id == 'function' && arguments.length == 1) {
                    throw new Error("Segment ID is required");
		    
		}
		self._get("/segment_efforts/"+id+"/streams", params, responseHandler(callback));
	    }
	}
    };
    
};


Strava.prototype._get = function(call, params, callback) {
    if(!call) {
	throw new Error('call is required');
    }
    if(!this.config.access_token) {
	throw new Error('Valid access token is required');
    }

    var url = this.config.api_base+call;

    params.access_token = this.config.access_token;
    
    this.http.get({url:url, json:true, qs:params}, callback);
};
Strava.prototype._paged_get = function(call, params, callback) {
    var per_page = 100;
    var pages = [];
    var page = [];
    var self = this;
    var pagenum = 1;
    async.doWhilst(function(callback) {
	self._get(call, {per_page:per_page, page:pagenum}, responseHandler(function(err, res) {
	    if (err) {
		callback(err, res);
	    } else {
		page = res;
		page.forEach(function(item) {
		    pages.push(item);
		});
		pagenum++;
		callback();
	    }
	}));
    }, function() {
	return page.length == per_page;
    }, function(err) {
	callback(err, pages);
    });
};
		 
Strava.prototype.uploads = function(params, gpx, callback) {
    var self = this;
    if (! gpx instanceof String) { 
	throw new Error("Sorry, only string uploads are implemented");
    }
    var form = new formdata();

    form.append("file", new Buffer(gpx), {
	filename: params.filename || "strava.gpx",
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
	}, responseHandler(function(err, body) {
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
	}))._form = form;
    });
};
module.exports = Strava;