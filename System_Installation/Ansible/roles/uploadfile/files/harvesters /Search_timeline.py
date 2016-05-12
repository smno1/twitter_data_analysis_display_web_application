# This program will search the timeline of a twitter user based 
# on the screen name

import sys
import os
import tweepy
import time
import json
import couchdb
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
from textblob import TextBlob
from datetime import datetime

couch = couchdb.Server('http://115.146.89.67:5984')
cdb = couch['melbourne_ccc']

CONSUMER_KEY = 'C1eyBbX61tXfIp1VgyA7efPfK'
CONSUMER_SECRET = 'N4VGkvhZ0tqgPedo6mDWrWzJMyjk7H6Yim2TOcPqffKrfSrdzr'
ACCESS_TOKEN = '2676497778-G5bi5fNYJcPaGjuFjscUjUNhEApLPjPsVXNIQON'
ACCESS_TOKEN_SECRET = '9bFotz6OpR4Hgb2B9C4gSyvgQB3LcBUKUANa1AntKxSmY'

auth = tweepy.OAuthHandler(CONSUMER_KEY,CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN,ACCESS_TOKEN_SECRET)

targetList = []
path_targetList = sys.argv[1]

def getTimeline(screenName):
    timeline_tweets = []
    try:
        new_tweets = api.user_timeline(screen_name=screenName, count=200)
        timeline_tweets.extend(new_tweets)
        oldest_id = timeline_tweets[-1].id - 1
        created_time = timeline_tweets[-1].created_at
        time_limit = datetime(2013, 1, 1, 0, 0, 0)
        while len(new_tweets) > 0:
            new_tweets = api.user_timeline(screen_name=screenName, count=200, max_id=oldest_id)
            timeline_tweets.extend(new_tweets)
            created_time = new_tweets[-1].created_at
            oldest_id = timeline_tweets[-1].id - 1
            print(timeline_tweets[-1])
    except tweepy.TweepError:
        time.sleep(10)
        print("Timeline Limit")
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
  if ((coordinates0 > 144.39) & (coordinates0 < 145.76) & (coordinates1 > -38.26) & (coordinates1 < -37.4)) | (placeFullName == 'Melbourne, Victoria'):
      return True
  else:
      return False

def save_tweet(tweet):
    timeline_tweets = []
    doc = tweet._json
    # check if the user name if list, if not search the timeline
    if check_location(doc) == True:
        doc = add_sentiment_score(tweet._json)
        # store to couchbase
        id = doc['id']
        print(doc)
        try:
            cdb[str(id)] = doc
        except Exception, e:
            pass

def readFile(path_targetList):
    with open(path_targetList,'r') as f:
        for line in f.readlines():
            targetList.append(line.strip('\n'))

if __name__ == '__main__':
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, retry_count=3, retry_delay=5, retry_errors=set([401, 404, 500, 503]))
    readFile(path_targetList)
    print(targetList)
    for username in targetList:
        timeline_tweets = getTimeline(username)
        for t in timeline_tweets:
                save_tweet(t)
                
    end_time = datetime.now()
    print("Finished searching timeline at: ", end_time)



