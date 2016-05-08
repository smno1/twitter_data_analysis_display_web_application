import sys 
import json
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
moviePostCodeDatabase = couchdbServer["movie_postcode_ccc"]
suburbDatabase = couchdbServer["suburb_boundaries"]

view = moviePostCodeDatabase.view("movie/movie_postcode_sentiment", group_level = 1)
print view
count = 0
for row in view:
	postcode = row["key"][0]
	movie = {}
	if postcode in suburbDatabase:
		try:
			data = suburbDatabase[postcode]
			postcode_movie_sentiment = row["value"][0]
			postcode_movie_sum = int(row["value"][1])
			print postcode_movie_sentiment
			print postcode_movie_sum
			movie["count"] = postcode_movie_sum
			movie["sentiment"] = postcode_movie_sentiment
			data["movie"] = movie
			suburbDatabase.save(data)
			print data["movie"]
			count += 1
		except Exception as e:
			print("Index error")
print count