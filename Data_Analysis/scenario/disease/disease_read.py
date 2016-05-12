import os
import sys

file  = open("disease.txt", "r")

disease_list = []
for line in file:
	line_list = line.strip().split(' ')
	disease_list.extend(line_list)
disease_list = list(set(disease_list))
print len(disease_list)
disease_list = [item.lower() for item in disease_list]
disease_list.remove('')
print disease_list