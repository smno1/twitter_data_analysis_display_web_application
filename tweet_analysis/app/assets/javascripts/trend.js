var average_sentiment_score=[]
var good_sentiment_score=[]
var bad_sentiment_score=[]
var netural_sentiment_score=[]
var x=[]
var charts_title="Daily Average Sentiment"

function initCharts(){
    getDailyX();
    drawSentimentData(daily_average_mood,daily_mood);
}
function getDailyX(){
  x=[];
  for(var i = 0; i < 24; i++){
    x.push(i.toString()+"~"+(i+1).toString())
}
}

function getYearlyX(){
  x=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
}

function getWeeklyX(){
  x=["Mon","Tue","Wen","Thu","Fri","Sat","Sun"];
}

function setChartData(peroid){
    charts_title=peroid+" Average Sentiment";
    switch(peroid){
      case "Daily":
      getDailyX();
      drawSentimentData(daily_average_mood,daily_mood);
      break;
      case "Weekly":
      getWeeklyX();
      drawSentimentData(weekly_average_mood,weekly_mood);
      break;
      case "Yearly":
      getYearlyX();
      drawSentimentData(yearly_average_mood,yearly_mood);
  }
}

function drawSentimentData(average_sentiment_address,sentiment_address) {
    $.ajax({
        url: hostAddr + average_sentiment_address,
        type: 'get',
        dataType: 'jsonp',
        success: function(data) {
          average_sentiment_score=[];
          for(var i = 0; i < data.rows.length; i++){
            average_sentiment_score.push(constructData(data.rows[i].value[0],data.rows[i].value[1]));
        }
        getSentimentData(sentiment_address);
    }
});
}

function getSentimentData(sentiment_address) {
    $.ajax({
        url: hostAddr + sentiment_address,
        type: 'get',
        dataType: 'jsonp',
        success: function(data) {
          good_sentiment_score=[];
          bad_sentiment_score=[];
          netural_sentiment_score=[];
          for(var i = 0; i < data.rows.length; i++){
            if(data.rows[i].key[1]==1){
                good_sentiment_score.push(constructData(data.rows[i].value[0],data.rows[i].value[1]));
            }else if(data.rows[i].key[1]==-1){
                bad_sentiment_score.push(constructData(data.rows[i].value[0],data.rows[i].value[1]));
            }else{
                netural_sentiment_score.push(constructData(data.rows[i].value[0],data.rows[i].value[1]));
            }
        }
        drawCharts();
    }
  });
}

function constructData(score,num_post){
    return {'y': score, 'number_of_post': num_post.toString() + " tweets"}
}

function drawCharts(){
    $('#mood-charts').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: charts_title
        },
        xAxis: {
            categories: x
        },
        yAxis: {
            title: {
                text: 'sentiment score'
            },
            plotBands: [{ 
                from: 0,
                to: 1,
                color: 'rgba(256, 131, 0, 0.1)',
                label: {
                    text: 'Happy',
                    style: {
                        color: '#606060'
                    }
                }
            }, { 
                from: -1,
                to: 0,
                color: 'rgba(208, 208, 208, 0.5)',
                label: {
                    text: 'Sad',
                    style: {
                        color: '#606060'
                    }
                }
            }]
        },
        tooltip: {
            formatter: function(){
                return "sentiment score : "+this.y+"<br>#tweets: "+ this.point.number_of_post;
            },
            crosshairs: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'average sentiment',
            marker: {
                symbol: 'square'
            },
            data: average_sentiment_score
        },
        {
            name: 'bad sentiment',
            marker: {
                symbol: 'triangle-down'
            },
            data: bad_sentiment_score,
            visible: false
        },
        {
            name: 'good sentiment',
            marker: {
                symbol: 'triangle'
            },
            data: good_sentiment_score,
            visible: false
        }
        ]
    });
}