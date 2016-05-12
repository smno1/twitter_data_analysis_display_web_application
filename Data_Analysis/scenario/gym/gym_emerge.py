import re
import sys
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
gymDatabase = couchdbServer["gym"]
view = gymDatabase.view("postcode/checkpostcode")
gymPostcodeDatabase = couchdbServer["gym_postcode_ccc"]

print view
count = 0
for row in view:
	# print row["key"]
	# print row["value"]
	id = row["key"]
	tweet = row["value"]
	if not id in gymPostcodeDatabase:
		if "postcode" in tweet:
			gymPostcodeDatabase.save(tweet)
			count += 1

print count
print "Finished"
