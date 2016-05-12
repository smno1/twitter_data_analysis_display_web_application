import os
import sys

file  = open("crime.txt", "r")

crime_list = []
for line in file:
	line_list = line.split(',')
	crime_list.extend(line_list)

print crime_list