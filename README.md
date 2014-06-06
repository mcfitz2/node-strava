## Getting Started
node-strava is in the NPM repository. You can install it by running the command below:
```
npm install strava
```
To get started, first initialize the client with your OAuth credentials:
```
 var strava = new require("./strava")({
        client_id: "<Client ID>",	
        client_secret: "<Client Secret>",
        redirect_uri: "<Redirect URI>",
        access_token: "<Access Token>"
    });
```
Then you can access the API:
```
    strava.athlete.get(function(err, res) {
        console.log(res);
    });
    {
	  "id": 227615,
	  "resource_state": 3,
	  "firstname": "John",
	  "lastname": "Applestrava",
	  "profile_medium": "http://pics.com/227615/medium.jpg",
	  "profile": "http://pics.com/227615/large.jpg",
  	  "city": "San Francisco",
	  "state": "California",
  	  "country": "United States",
	  "sex": "M",
      ...
  }
```

## Conventions 
For all methods, `params` is an object with keys corresponding to the parameters given in the Strava API. Some methods have other special parameters.
## athlete

### get(params, callback)

---------------------------------------

### update(params, callback)

---------------------------------------

### followers.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### friends.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### activities.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### clubs.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

## athletes

### get(id, params, callback)

---------------------------------------

### update(id, params, callback)

---------------------------------------

### koms.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### friends.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### followers.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### bothfollowing.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

## activities

### get(id, params, callback)

---------------------------------------

### create(params, callback)

---------------------------------------

### update(id, params, callback)

---------------------------------------

### delete(id, params, callback)

---------------------------------------

### comments.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### kudos.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### photos.get(id, params, callback)

---------------------------------------

### following.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### zones.get(id, params, callback)

---------------------------------------

### laps.get(id, params, callback)

---------------------------------------

### streams.get(id, params, callback)

__Parameters__
* `types` - List of data types to request. Should be an array.

---------------------------------------

## clubs

### get(id, params, callback)

---------------------------------------

### members.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### activities.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

## gear

### get(id, params, callback)

---------------------------------------

## segments

### get(id, params, callback)

---------------------------------------

### streams.get(id, params, callback)

__Parameters__
* `types` - List of data types to request. Should be an array.

---------------------------------------

### starred.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

### explore.get(params, callback)

---------------------------------------

### leaderboard.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

---------------------------------------

## segmentefforts

### get(id, params, callback)

---------------------------------------

### streams.get(id, params, callback)

__Parameters__
* `types` - List of data types to request. Should be an array.

---------------------------------------

## uploads

### upload(params, callback)

__Parameters__
* `wait` - Poll API for upload status and return only after an error or a successful upload
* `poll_interval` - Amount of time (in milliseconds) to wait between polls
* `poll_callback` - Function that is called after each poll with the arguments `err`, and `res`
* `data` - GPX, FIT, or TCX file as a buffer, string, or stream
* `filename` - Specify filename of GPX, FIT, or TCX file. If `data` is not set, this filename will be used to open the file. Otherwise, it has no real meaning. 

__Examples__

As a stream:
```
strava.uploads.upload({wait:true, data:fs.createReadStream("test.gpx")}, function(err, body) {
    console.log(err, body);
});
```
As a string:
```
fs.readFile("test.gpx", function(err, gpx) {
    strava.uploads.upload({wait:true, data:gpx}, function(err, body) {
	console.log(err, body);
    });
});
```
Using just a filename:
```
strava.uploads.upload({wait:true, filename:"test.gpx"}, function(err, body) {
    console.log(err, body);
});   
```
Uploading a TCX file:
```
strava.uploads.upload({wait:true, filename:"test.tcx", "data_type":"tcx"}, function(err, body) {
    console.log(err, body);
});
```
---------------------------------------

### poll(id, callback)

---------------------------------------
## Contributing
node-strava is the work of a single developer. If you want to contribute, feel free to send a pull request!
