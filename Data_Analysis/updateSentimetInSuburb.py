# After the Map/Reduce of a view, transfer the sentiment score (positive, negative, neutral) to 
# another database which gather all the information

import sys 
import json
import couchdb

couch = couchdb.Server('http://115.146.89.154:5984')
cdb = couch['all_postcode']

couch_t = couchdb.Server('http://115.146.89.67:5984')
cdb_t = couch_t['suburb_boundaries']

for doc in cdb.view('general/sentiment', group_level=2):
	key = doc.key
	postcode = key[0]
	sentiment = key[1]
	sentiment_score = doc.value
	if sentiment ==1:
		try:
			dbData = cdb_t[postcode]
			dbData['properties']['sentiment_positive'] = doc.value[0]
			cdb_t.save(dbData)
		except Exception as e:
			print("Index error")
	if sentiment ==-1:
		try:
			dbData = cdb_t[postcode]
			dbData['properties']['sentiment_negative'] = doc.value[0]
			cdb_t.save(dbData)
		except Exception as e:
			print("Index error")

print('Finished positive and nagative sentiment and starting average.')

for doc in cdb.view('general/sentiment', group_level=1):
	postcode = doc.key[0]

	print(postcode)
	try:
		dbData = cdb_t[postcode]
		dbData['properties']['sentiment_average'] = doc.value[0]
		cdb_t.save(dbData)
	except Exception as e:
		print("Index error")

print("Finished transfer.")



