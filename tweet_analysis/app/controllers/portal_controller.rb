class PortalController < ApplicationController

  def welcome
    @team_member={
      "Yangguang Shi" => "626689",
      "Shengming Yan" => "672435",
      "Runze Li" => "672450",
      "Zheyu Ji" => "738774",
      "Shixun huang" => "732318"
    }
  end

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
      "movie"=>"Mvoie related tweets per one hundred thousand people",
      "gym"=>"Gym related tweets per one hundred thousand people",
      "book"=>"Book related tweets per one hundred thousand people",
      "crime"=>"Crime related tweets per one hundred thousand people",
      "disease"=>"Disease related tweets per one hundred thousand people"
    }
  end

  def heatmap
    @data_feature={"movie"=>"Mvoie related tweets","gym"=>"Gym related tweets","book"=>"Book related tweets",
      "crime"=>"Crime related tweets","disease"=>"Disease related tweets"}
    end

    def trend
      @selection=["Daily","Weekly","Yearly"]
    end

    def top_10
      @container=["user","topic"]
    end

    def scenario
      @selection=["Sentiment","Movie","Gym","Book","Crime","Disease","Emoji"]
    end

    def realtime
    end

  end
  