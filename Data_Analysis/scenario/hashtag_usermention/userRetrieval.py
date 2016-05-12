# This script is to retrieval most popular user mentions in twitter dataset.

import sys 
import json
import couchdb
import operator

couch = couchdb.Server('http://115.146.89.67:5984')

database = couch['melbourne_ccc']
view = database.view('twitter_analysis/user_mention', group_level=1)
print view
user_dictionary = {}
for user in view:
	user_text = user["key"]
	if not user_text in user_dictionary:
		user_dictionary[user_text] = user["value"]
	else:
		user_dictionary[user_text] += user["value"]

user_sorted_dictionary = sorted(user_dictionary.items(), key=operator.itemgetter(1), reverse=True)

print "Top 10 users are: \n"
file_2 = open("user.txt", "a")
for item in user_sorted_dictionary[:10]:
	user = str(item[0].encode('utf-8')) + " : " + str(item[1])
	print user
	file_2.write(user)
	file_2.write("\n")
file_2.close()