class PortalController < ApplicationController
  def general
      @container=["device","sentiment"]
  end

  def polygonmap
      @data_feature={
        "general"=>"General",
        "population"=>"Population", 
        "edu"=>"Tertiery Education Rate", 
        "sentiment_positive"=>"Positive Sentiment Score",
        "sentiment_negative"=>"Negative Sentiment Score",
        "unemployment"=>"Unemployment rate",
        "income"=>"Average weekly income",
        "movie"=>"Mvoie related tweets per ten thousand people",
        "gym"=>"Gym related tweets per ten thousand people",
        "book"=>"Book related tweets per ten thousand people",
        "crime"=>"Crime related tweets per ten thousand people"
      }
  end

  def heatmap
      @data_feature={"movie"=>"Mvoie related tweets","gym"=>"Gym related tweets","book"=>"Book related tweets","crime"=>"Crime related tweets"}
  end

  def trend
      @selection=["Daily","Weekly","Yearly"]
  end

  def top_10
      @container=["user","topic"]
  end

  def scenario
    @selection=["Sentiment","Movie","Gym","Book","Crime"]
  end

end
  