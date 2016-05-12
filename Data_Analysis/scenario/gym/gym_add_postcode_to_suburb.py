import sys 
import json
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
gymPostCodeDatabase = couchdbServer["gym_postcode_ccc"]
suburbDatabase = couchdbServer["suburb_boundaries"]

view = gymPostCodeDatabase.view("gym/gym_postcode_sentiment", group_level = 1)
print view
count = 0
for row in view:
	postcode = row["key"][0]
	# emoji = {}
	if postcode in suburbDatabase:
		try:
			data = suburbDatabase[postcode]
			if not 'gym' in data:
				gym = {}
			else:
				gym = data['gym']
			postcode_gym_sentiment = row["value"][0]
			postcode_gym_sum = int(row["value"][1])
			# print postcode_emoji_sentiment
			# print postcode_emoji_sum
			gym["count"] = postcode_gym_sum
			gym["sentiment"] = postcode_gym_sentiment
			data["gym"] = gym
			suburbDatabase.save(data)
			print data["gym"]
			count += 1
		except Exception as e:
			print("Index error")
print count