import sys 
import json
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
emojiPostCodeDatabase = couchdbServer["emoji_postcode_ccc"]
suburbDatabase = couchdbServer["suburb_boundaries"]

view = emojiPostCodeDatabase.view("emoji/emoji_postcode_sentiment", group_level = 1)
print view
count = 0
for row in view:
	postcode = row["key"][0]
	emoji = {}
	if postcode in suburbDatabase:
		try:
			data = suburbDatabase[postcode]
			postcode_emoji_sentiment = row["value"][0]
			postcode_emoji_sum = int(row["value"][1])
			print postcode_emoji_sentiment
			print postcode_emoji_sum
			emoji["count"] = postcode_emoji_sum
			emoji["sentiment"] = postcode_emoji_sentiment
			data["emoji"] = emoji
			suburbDatabase.save(data)
			print data["emoji"]
			count += 1
		except Exception as e:
			print("Index error")
print count