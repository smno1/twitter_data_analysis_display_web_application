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

from geopy.geocoders import Nominatim
geolocator = Nominatim()

# def getPostcode(latString, lonString):
#     geoGoogle = "http://maps.googleapis.com/maps/api/geocode/json?address="
#     page = urllib.urlopen(geoGoogle+latString+','+lonString)
#     pageString = page.read().decode("utf-8")
#     json_data = json.loads(pageString)['results']
#     for result in json_data:
#         if result['types'] == ["postal_code"]:
#             for addr in result["address_components"]:
#                 if addr['types'] == ["postal_code"]:
#                     return addr['long_name']

def getPostcode(lat, lon):
    postcode = None
    gmap_result = gmaps.reverse_geocode((lat,lon))
    for result in gmap_result:
        for address in result['address_components']:
            if address['types'] == ['postal_code']:
                postcode = address['long_name']
    return postcode

if __name__ == '__main__':
    # google map api
    gmaps = googlemaps.Client(key='AIzaSyBsh01qEVtWp7ZUoWISnsx9ZJcxheEf21I')
    #cloud couchdb
    couch = couchdb.Server('http://115.146.89.67:5984')
    cdb = couch['melbourne_ccc']
    view = cdb.view("book/book_tweet_geocode")
    book_cdb = couch['book_postcode_ccc']
    print view
    for row in view:
        id = row["key"]
        tweet = row["value"]
        if not id in book_cdb:
            # print id
            lat = str(tweet['coordinates']['coordinates'][1])
            lon = str(tweet['coordinates']['coordinates'][0])
            postcode = getPostcode(lat, lon)
            if not postcode is None:
                print postcode
                tweet['postcode'] = postcode
                book_cdb.save(tweet)
