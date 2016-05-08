import sys 
import json
import couchdb


def readFile(filePath):
	name_value_list = []
	# user_list = []
	# number_list = []
	with open(filePath,'r') as file:
		for line in file.readlines():
			line = line.strip()
			line = line.split(" ")
			name_value_list.append([line[0], int(line[2])])
			# user_list.append()
			# number_list.append()
	return name_value_list

if __name__ == '__main__':
	user_value_list = readFile("user.txt")
	hashtag_value_list = readFile("hashtag.txt")
	print user_value_list
	print hashtag_value_list
	couchServer = couchdb.Server('http://115.146.89.67:5984')
	database = couchServer['top_20']

	for id in database:
		data = database[str(id)]
		if data["top_type"] == "topic":
			data["top_10"] = hashtag_value_list
			print data["top_10"]
			database[str(id)] = data
		# if data["top_type"] == "user":
		# 	data["top_10"] = user_value_list
		# 	database[str(id)] = data

