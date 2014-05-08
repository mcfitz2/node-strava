node-strava
===========

Node.js library for the Strava V3 API

Check out the offical documentation: <http://strava.github.io/api/>

####athlete
+ get(params, callback)
+ update(params, callback) **Not implemented**
+ followers.get(params, callback)
+ friends.get(params, callback)
+ activities.get(params, callback)
+ clubs.get(params, callback)

####athletes
+ get(id, params, callback)
+ update(id, params, callback) **Not implemented**
+ koms.get(id, params, callback)
+ friends.get(id, params, callback)
+ followers.get(id, params, callback)
+ bothfollowing.get(id, params, callback)

####activities
+ get(id, params, callback)
+ create(params, callback)
+ update(id, params, callback)
+ delete(id, params, callback)
+ comments.get(id, params, callback)
+ kudos.get(id, params, callback)
+ photos.get(id, params, callback)
+ following.get(params, callback)
+ zones.get(id, params, callback)
+ laps.get(id, params, callback)

####clubs
+ get(id, params, callback)
+ members.get(id, params, callback)
+ activities.get(id, params, callback)

####gear
+ get(id, params, callback)

####segments
+ get(id, params, callback)
+ starred.get(params, callback)
+ explore.get(params, callback)
+ leaderboard.get(id, params, callback)

####segmentefforts
+ get(id, params, callback)

####streams
+ get(id, params, callback)

####uploads(params, callback)

Accepted file types: GPX, FIT, TCX

Params:
You must provide either `filename` or `data`. Use `filename` to open a file from disk and upload it. Use `data` to provide a stream, buffer, or string to be uploaded. If both are set, the `data` parameter is used. 


  
