import sys 
import json
import operator
import couchdb

couchdbServer = couchdb.Server("http://115.146.89.67:5984")
# database = couchdbServer["melbourne_ccc"]

# view = database.view("emoticon/emoticon_distribution", group_level = 1)
# print view

# emoji_dict = {}
# file = open('emoji.txt', 'w')
# for row in view:
# 	emoji = str(row["key"].strip().encode('utf-8'))
# 	count = str(row["value"])
# 	if not emoji in emoji_dict:
# 		emoji_dict[emoji] = count
# for key in emoji_dict:
# 	# print key + "---->" + emoji_dict[key]
# 	data = key + "----" + emoji_dict[key]
# 	file.write(data)
# 	file.write('\n')
# file.close()

database = couchdbServer["distribution_ccc"]
emoji_dict = {}
file = open('emoji.txt', 'r')
lines = file.readlines()
for line in lines:
	data = line.strip().split("----")
	# print data
	emoji_dict[data[0]] = int(data[1])
# print emoji_dict

emoji_dict_sorted = sorted(emoji_dict.items(), key=operator.itemgetter(1), reverse=True)
emoji_dict_sorted_dict = {}
for i in xrange(len(emoji_dict_sorted)):
	d = [emoji_dict_sorted[i][0],emoji_dict_sorted[i][1]]
	emoji_dict_sorted_dict[i] = d
print emoji_dict_sorted_dict


database_dict = {}
database_dict["emoticon_distribution"] = emoji_dict_sorted_dict
database.save(database_dict)



