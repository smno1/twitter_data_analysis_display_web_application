# This code is to search timeline of each user and store it tweets in the database.
# encoding=utf8
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
from socket import error as socket_error

couch = couchdb.Server('http://115.146.89.67:5984')
cdb = couch['user_timeline_ccc']



CONSUMER_KEY = 'C1eyBbX61tXfIp1VgyA7efPfK'
CONSUMER_SECRET = 'N4VGkvhZ0tqgPedo6mDWrWzJMyjk7H6Yim2TOcPqffKrfSrdzr'
ACCESS_TOKEN = '2676497778-G5bi5fNYJcPaGjuFjscUjUNhEApLPjPsVXNIQON'
ACCESS_TOKEN_SECRET = '9bFotz6OpR4Hgb2B9C4gSyvgQB3LcBUKUANa1AntKxSmY'

auth = tweepy.OAuthHandler(CONSUMER_KEY,CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN,ACCESS_TOKEN_SECRET)


targetList = []

path_targetList = 'user.txt'


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

def save_tweet(tweet):
    doc = tweet._json
    # check if the user name if list, if not search the timeline
    doc = add_sentiment_score(tweet._json)
    # store to couchbase
    id = doc['id']
    # print(doc)
    try:
        cdb[str(id)] = doc
    except socket_error as serr:
        time.sleep(60)
        pass
        # continue
    except Exception, e:
        print e
        pass

def readFile(path_targetList):
    with open(path_targetList,'r') as f:
        for line in f.readlines():
            targetList.append(line.split(" ")[0])

if __name__ == '__main__':
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, retry_count=3, retry_delay=5, retry_errors=set([401, 404, 500, 503]))
    readFile(path_targetList)
    print(targetList)
    for username in targetList:
        timeline_tweets = getTimeline(username)
        print "***************" + username + "***************"
        print len(timeline_tweets)
        for tweet in timeline_tweets:
            save_tweet(tweet)

    end_time = datetime.now()
    print("Finished searching timeline at: ", end_time)