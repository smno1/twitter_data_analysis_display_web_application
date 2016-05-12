import tweepy
import time
import couchdb
import os
import json
from tweepy import Stream
import datetime
from datetime import timedelta
import math
from textblob import TextBlob


access_token = "3254357972-gQDabKOQfbZJsSGyUVynYqckImVjizBDydjuxhX"
access_secret = "rrGORFp6LW3MznoFKfCvkjNo3pAfpVPGb75Vv3rzv4xFF"
consumer_key = "WdTNeWnGBzRHfuJGBN0xoCJxp"
consumer_secret = "1BKrrH5eQFrYzzzf6Z5bXYdfVNENtoDpdXWVQw0NDt5TK6Czoe"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
api = tweepy.API(auth)
USERNAME = 'team9'
PASSWORD = '1234'
couch = couchdb.Server('http://115.146.89.154:5984')
couch.resource.credentials = (USERNAME, PASSWORD)

try:
    data_base = couch.create('melbourne_ccc')
except couchdb.http.PreconditionFailed as e:
    data_base = couch['melbourne_ccc']

def getTimeline(screenName):
    timeline_tweets = []
    try:
        new_tweets = api.user_timeline(screen_name=screenName, count=200)
        timeline_tweets.extend(new_tweets)
        oldest_id = timeline_tweets[-1].id - 1
        created_time = timeline_tweets[-1].created_at
        time_limit = datetime(2006, 1, 1, 0, 0, 0)
        while ((len(new_tweets)) > 0 and (created_time > time_limit)):
            new_tweets = api.user_timeline(screen_name=screenName, count=200, max_id=oldest_id)
            timeline_tweets.extend(new_tweets)
            created_time = new_tweets[-1].created_at
            oldest_id = timeline_tweets[-1].id - 1
            # print(timeline_tweets[-1])
    except tweepy.TweepError:
        print("Timeline Limit")
        time.sleep(10)
        pass
    except IndexError:
        return timeline_tweets
    except Exception as e:
        print ("Encountered Exception: ", e)
    return timeline_tweets

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

def check_location(tweet):
    if (tweet['coordinates'] != None):
        coordinates0 = tweet['coordinates']['coordinates'][0]
        coordinates1 = tweet['coordinates']['coordinates'][1]
    else:
        coordinates0 = 0
        coordinates1 = 0

    if tweet['place'] != None:
        placeFullName = tweet['place']['full_name']
    else:
        placeFullName = None
    if (coordinates0 > 144.39) & (coordinates0 < 145.76) & (coordinates1 > -38.26) & (coordinates1 < -37.4) | (placeFullName == 'Melbourne, Victoria'):
        return True
    else:
        return False

def save_tweet(tweet):
    screenName = tweet._json["user"]["screen_name"]
    if check_location(tweet._json) == True:
        tweet._json = add_sentiment_score(tweet._json)
        id = tweet._json['id']
        try:
            data_base[str(id)] = tweet._json
            print(tweet._json)
        except Exception, e:
            pass

if __name__ == '__main__':
    tweets = tweepy.Cursor(api.search,include_entities=True, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, geocode="-37.763479,144.972364,70km").items()
    while True:
        try:
            tweet = tweets.next()
            save_tweet(tweet)
        except StopIteration:
            break