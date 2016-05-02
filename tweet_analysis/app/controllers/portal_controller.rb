class PortalController < ApplicationController
  def welcome
  end

  def polygonmap
      @data_feature={"general"=>"General","movie"=>"Mvoie related tweets per thousand people","population"=>"Population", "unemployment"=>"Unemployment rate","income"=>"Average weekly income"}
  end

  def heatmap
      @data_feature={"movie"=>"Mvoie related tweets","gym"=>"Gym related tweets"}
  end

  def trend
      @selection=["Daily","Weekly","Yearly"]
  end
end
  