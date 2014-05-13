## Getting Started
node-strava is not yet in the NPM repository. You can install it by running the command below:
```
npm install git+https://github.com/mcfitz2/node-strava.git
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

__Examples__
```
```
---------------------------------------

### update(params, callback)

__Examples__
```
```
---------------------------------------

### followers.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

__Examples__
```
```
---------------------------------------

### friends.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

__Examples__
```
```
---------------------------------------

### activities.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

__Examples__
```
```
---------------------------------------

### clubs.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages

__Examples__
```
```
---------------------------------------

## athletes

### get(id, params, callback)




__Examples__
```
```
---------------------------------------

### update(id, params, callback)




__Examples__
```
```
---------------------------------------

### koms.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### friends.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### followers.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### bothfollowing.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

## activities

### get(id, params, callback)




__Examples__
```
```
---------------------------------------

### create(params, callback)




__Examples__
```
```
---------------------------------------

### update(id, params, callback)




__Examples__
```
```
---------------------------------------

### delete(id, params, callback)




__Examples__
```
```
---------------------------------------

### comments.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### kudos.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### photos.get(id, params, callback)




__Examples__
```
```
---------------------------------------

### following.get(params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### zones.get(id, params, callback)




__Examples__
```
```
---------------------------------------

### laps.get(id, params, callback)




__Examples__
```
```
---------------------------------------

### streams.get(id, params, callback)




__Examples__
```
```
---------------------------------------

## clubs

### get(id, params, callback)




__Examples__
```
```
---------------------------------------

### members.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### activities.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

## gear

### get(id, params, callback)




__Examples__
```
```
---------------------------------------

## segments

### get(id, params, callback)




__Examples__
```
```
---------------------------------------

### streams.get(id, params, callback)




__Examples__
```
```
---------------------------------------

### starred.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

### explore.get(id, params, callback)




__Examples__
```
```
---------------------------------------

### leaderboard.get(id, params, callback)

__Parameters__
* `paginate` - Automatically fetch all results. Currently cannot restrict number of pages


__Examples__
```
```
---------------------------------------

## segmentefforts

### get(id, params, callback)


__Examples__
```
```
---------------------------------------

### streams.get(id, params, callback)

__Examples__
```
```
---------------------------------------

## uploads(id, params, callback)
__Parameters__
* `wait` - Poll API for upload status and return only after an error or a successful upload
* `poll_interval` - Amount of time (in milliseconds) to wait between polls
* `poll_callback` - Function that is called after each poll with the arguments `err`, and `res`
* `data` - GPX, FIT, or TCX file as a buffer, string, or stream
* `filename` - Specify filename of GPX, FIT, or TCX file. If `data` is not set, this filename will be used to open the file. Otherwise, it has no real meaning. 

__Examples__
```
```
---------------------------------------

## Contributing
node-strava is the work of a single developer. If you want to contribute, feel free to send a pull request!
