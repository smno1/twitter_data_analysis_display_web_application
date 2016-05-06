class PortalController < ApplicationController
  def general
      @container=["device","sentiment"]
  end

  def polygonmap
      @data_feature={"general"=>"General",
        # "movie"=>"Mvoie related tweets per thousand people",
        "population"=>"Population", 
        "sentiment_positive"=>"Positive Sentiment Score",
        "sentiment_negative"=>"Negative Sentiment Score",
        "unemployment"=>"Unemployment rate",
        "income"=>"Average weekly income"}
  end

  def heatmap
      @data_feature={"movie"=>"Mvoie related tweets","gym"=>"Gym related tweets"}
  end

  def trend
      @selection=["Daily","Weekly","Yearly"]
  end

  def top_10
      @container=["user","topic"]
  end
end
  