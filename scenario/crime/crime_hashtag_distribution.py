import sys 
import json
import couchdb
import operator

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
crimePostCodeDatabase = couchdbServer["crime_postcode_ccc"]

view = crimePostCodeDatabase.view("crime/hashtag", group_level = 1)

print view
hashtag_dict = {}
for row in view:
	hashtag_dict[row["key"]] = row["value"]

hashtag_dict_sorted_all = sorted(hashtag_dict.items(), key=operator.itemgetter(1), reverse=True)
hashtag_dict_sorted = hashtag_dict_sorted_all[:10]
hashtag_dict_sorted_dict = {}
for i in xrange(len(hashtag_dict_sorted)):
	d = [hashtag_dict_sorted[i][0],hashtag_dict_sorted[i][1]]
	hashtag_dict_sorted_dict[i] = d
# print hashtag_dict_sorted_dict

database = couchdbServer["distribution_ccc"]
database_dict = {}
database_dict["crime_ccc_distribution"] = hashtag_dict_sorted_dict
database.save(database_dict)

for item in hashtag_dict_sorted[:10]:
	print item