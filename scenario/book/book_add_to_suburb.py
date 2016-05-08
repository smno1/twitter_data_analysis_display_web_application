import sys 
import json
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
bookPostCodeDatabase = couchdbServer["book_postcode_ccc"]
suburbDatabase = couchdbServer["suburb_boundaries"]

view = bookPostCodeDatabase.view("book/book_postcode_sentiment", group_level = 1)
print view
count = 0
for row in view:
	postcode = row["key"][0]
	book = {}
	if postcode in suburbDatabase:
		try:
			data = suburbDatabase[postcode]
			postcode_book_sentiment = row["value"][0]
			postcode_book_sum = int(row["value"][1])
			print postcode_book_sentiment
			print postcode_book_sum
			book["count"] = postcode_book_sum
			book["sentiment"] = postcode_book_sentiment
			data["book"] = book
			suburbDatabase.save(data)
			print data["book"]
			count += 1
		except Exception as e:
			print("Index error")
print count