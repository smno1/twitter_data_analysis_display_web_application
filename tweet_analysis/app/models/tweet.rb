class Tweet < CouchRest::Model::Base
    use_database 'melbourne_tweets_ccc'
    property :_id,      String
    property :text,    String
end
