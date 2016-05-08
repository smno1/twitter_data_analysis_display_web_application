import os
import sys
import couchdb

couchdbServer = couchdb.Server('http://115.146.89.67:5984')
movie_database = couchdbServer['movie']
movie_view = movie_database.view('movie/movie_coordinate')

movie_postcode_database = couchdbServer['movie_postcode_ccc']

count = 0
for doc in movie_view:
	if (doc["value"]["postcode"]):
		if (doc["value"]["postcode"] != "0000"):
			id = doc["value"]["_id"]
			tweet = doc["value"]
			if not id in movie_postcode_database:
				movie_postcode_database.save(tweet)
				count += 1

print count