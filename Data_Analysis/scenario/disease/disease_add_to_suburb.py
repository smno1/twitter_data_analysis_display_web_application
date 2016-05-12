import sys 
import json
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
diseasePostCodeDatabase = couchdbServer["disease_postcode_ccc"]
suburbDatabase = couchdbServer["suburb_boundaries"]

view = diseasePostCodeDatabase.view("disease/disease_postcode_sentiment", group_level = 1)
print view
count = 0
for row in view:
	if row["key"][0] != None:
		postcode = row["key"][0]
		disease = {}
		if postcode in suburbDatabase:
			try:
				data = suburbDatabase[postcode]
				postcode_disease_sentiment = row["value"][0]
				postcode_disease_sum = int(row["value"][1])
				print postcode_disease_sentiment
				print postcode_disease_sum
				disease["count"] = postcode_disease_sum
				disease["sentiment"] = postcode_disease_sentiment
				data["disease"] = disease
				suburbDatabase.save(data)
				print data["disease"]
				count += 1
			except Exception as e:
				print("Index error")
print count