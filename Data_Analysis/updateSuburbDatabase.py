import sys
import re
import tweepy
import couchdb
import json
import string
import nltk
from nltk.corpus import wordnet as wn
from nltk.stem.lancaster import LancasterStemmer
from nltk.corpus import stopwords
import urllib
import googlemaps

#cloud couchdb
couch = couchdb.Server('http://115.146.89.67:5984')
cdb = couch['suburb_boundaries']

for id in cdb:
    tweet = cdb[str(id)]
    book = ''
    crime = ''
    emoji = ''
    gym = ''
    movie = ''
    population = ''
    population = tweet['properties']['population']

    if population == 'null':
        population = 10000
    else:
        population = float(population)

    if 'book' in tweet:
        book = round(float(tweet['book']['count'])*100000/population, 2)
    if 'crime' in tweet:
        crime = round(float(tweet['crime']['count'])*100000/population, 2)
    if 'emoji' in tweet:    
        emoji = round(float(tweet['emoji']['count'])*100000/population, 2)
    if 'gym' in tweet:    
        gym = round(float(tweet['gym']['count'])*100000/population, 2)
    if 'movie' in tweet:    
        movie = round(float(tweet['movie']['count'])*100000/population, 2)
    if 'disease' in tweet:
        disease = round(float(tweet['disease']['count'])*100000/population, 2)

    tweet['properties']['book'] = book
    tweet['properties']['crime'] = crime
    tweet['properties']['emoji'] = emoji
    tweet['properties']['gym'] = gym
    tweet['properties']['movie'] = movie
    tweet['properties']['disease'] = disease

    try:
        cdb[str(id)] = tweet
    except Exception, e:
        pass
print('Finished update')



