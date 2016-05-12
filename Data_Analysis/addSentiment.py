# This program will add sentiment polarity and subjectivity to the corresponding tweet
# based on the tweet text.
import sys
import re
import tweepy
import couchdb
import json
import string
import urllib
from textblob import TextBlob

#cloud couchdb
couch = couchdb.Server('http://115.146.89.67:5984')
cdb = couch['melbourne_ccc']    

def add_sentiment_score(tweet):
    # add sentiment value to the tweet
    blob = TextBlob(tweet['text'])
    sentiment_polarity = blob.sentiment.polarity
    sentiment_subjectivity = blob.sentiment.subjectivity

    # create a nested json for sentiment score for the tweet
    sentiment_score = {}
    sentiment_score['polarity'] = sentiment_polarity
    sentiment_score['subjectivity'] = sentiment_subjectivity
    tweet['sentiment_score'] = sentiment_score
    return tweet

for id in cdb:
    tweet = cdb[str(id)]
    if 'sentiment_score' not in tweet:
        if 'text' in tweet:
            tweet = add_sentiment_score(tweet)
            cdb[str(id)] = tweet
        else:
            sentiment_score = {}
            sentiment_score['polarity'] = 0
            sentiment_score['subjectivity'] = 0
            tweet['sentiment_score'] = sentiment_score
            cdb[str(id)] = tweet

print("Finished adding sentiment score.")
