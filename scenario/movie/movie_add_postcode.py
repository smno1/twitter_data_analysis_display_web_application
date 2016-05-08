# This script is to add postcode information in movie dataset.

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
# import geopy
from geopy.geocoders import Nominatim

def getPostcode(latString, lonString):
    geoGoogle = "http://maps.googleapis.com/maps/api/geocode/json?address="
    page = urllib.urlopen(geoGoogle+latString+','+lonString)
    pageString = page.read().decode("utf-8")
    json_data = json.loads(pageString)['results']
    for result in json_data:
        if result['types'] == ["postal_code"]:
            for addr in result["address_components"]:
                if addr['types'] == ["postal_code"]:
                    return addr['long_name']

# def getPostcode(lat, lon):
#     print("good")
#     geocode = str(lat+', '+lon)

#     location = geolocator.reverse(geocode)

#     return location.raw['address']['postcode']
#     # print(location.raw['address']['postcode'])
if __name__ == '__main__':
    geolocator = Nominatim()

    # google map api
    gmaps = googlemaps.Client(key='AIzaSyDgf_SSYfZp31La5k6W0biMcC49TK8yQpU')

    #cloud couchdb
    couchServer = couchdb.Server('http://115.146.89.67:5984')
    cdb = couchServer['melbourne_ccc']
    view = cdb.view('movie/movie_tweet_geocode')
    cdb_movie = couchServer['movie_postcode_ccc']
    print view
    for row in view:
        tweet = row["value"]
        if not 'postcode' in tweet:
            lat = str(tweet['coordinates']['coordinates'][1])
            lon = str(tweet['coordinates']['coordinates'][0])
            postcode = getPostcode(lat, lon)
            if postcode != None:
                tweet['postcode'] = postcode
                cdb_movie.save(tweet)


