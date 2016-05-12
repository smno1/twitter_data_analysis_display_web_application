import sys 
import json
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
crimePostCodeDatabase = couchdbServer["crime_postcode_ccc"]
suburbDatabase = couchdbServer["suburb_boundaries"]

view = crimePostCodeDatabase.view("crime/crime_postcode_sentiment", group_level = 1)
print view
count = 0
for row in view:
	postcode = row["key"][0]
	crime = {}
	if postcode in suburbDatabase:
		try:
			data = suburbDatabase[postcode]
			postcode_crime_sentiment = row["value"][0]
			postcode_crime_sum = int(row["value"][1])
			print postcode_crime_sentiment
			print postcode_crime_sum
			crime["count"] = postcode_crime_sum
			crime["sentiment"] = postcode_crime_sentiment
			data["crime"] = crime
			suburbDatabase.save(data)
			print data["crime"]
			count += 1
		except Exception as e:
			print("Index error")
print count