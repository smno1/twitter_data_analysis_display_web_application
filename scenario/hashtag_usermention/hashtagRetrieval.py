# This script is to retrieval most popular hashtags in the twitter dataset.

import sys 
import json
import couchdb
import operator

couchServer = couchdb.Server('http://115.146.89.67:5984')
database = couchServer['melbourne_ccc']
view = database.view('twitter_analysis/hashtag', group_level = 1)
# print view

# data_base = couch['movie_postcode']
# view = data_base.view('_design/twitter/hashtag')

hashtag_dictionary = {}
for hashtag in view:
	hashtag_text = hashtag["key"]
	if not hashtag_text in hashtag_dictionary:
		hashtag_dictionary[hashtag_text] = hashtag["value"]
	else:
		hashtag_dictionary[hashtag_text] += hashtag["value"]

hashtag_sorted_dictionary = sorted(hashtag_dictionary.items(), key=operator.itemgetter(1), reverse=True)

print "Top 10 hashtags are: \n"
file_1 = open("hashtag.txt", "a")
for item in hashtag_sorted_dictionary[:10]:
	hashtag = str(item[0].encode('utf-8')) + " : " + str(item[1])
	print hashtag
	file_1.write(hashtag)
	file_1.write("\n")
file_1.close()