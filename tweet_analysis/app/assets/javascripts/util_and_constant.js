var hostAddr = 'http://115.146.89.67:5984';
var suburb= '/suburb_boundaries';
var movie_id_coordinates_address='/movie_postcode_ccc/_design/movie/_view/id_coordinates';
// var gym_id_coordinates_address='/melbourne_ccc/_design/gym/_view/id_coordinates';
var gym_id_coordinates_address='/gym_postcode_ccc/_design/gym/_view/id_coordinates';
var book_id_coordinates_address='/book_postcode_ccc/_design/book/_view/id_coordinates';
var crime_id_coordinates_address='/crime_postcode_ccc/_design/crime/_view/id_coordinates';
var melbourne_center_coordinates={lat: -37.8602828, lng: 144.979616};
var daily_average_mood='/melbourne_tweets_ccc/_design/general/_view/hoursTrend?group_level=1';
var daily_mood='/melbourne_tweets_ccc/_design/general/_view/hoursTrend?group_level=2';
var weekly_average_mood='/melbourne_tweets_ccc/_design/general/_view/dayTrend?group_level=1';
var weekly_mood='/melbourne_tweets_ccc/_design/general/_view/dayTrend?group_level=2';
var yearly_average_mood='/melbourne_tweets_ccc/_design/general/_view/monthTrend?group_level=1';
var yearly_mood='/melbourne_tweets_ccc/_design/general/_view/monthTrend?group_level=2';
var top_20='/top_20/_all_docs';
var device_info='/melbourne_ccc/_design/general/_view/device?group_level=1';
var sentiment_info='/melbourne_ccc/_design/general/_view/overall?group_level=1';
var fresh_flag=false;
var suburb_data_rows=0;

function getFixedNumber(number, fixedpoint){
    if(isNaN(number)){return number;}
    return Number((number).toFixed(fixedpoint));
}

function isUndefined(data,request_data){
    return (typeof data == "undefined") ? "undefined" : data[request_data];
}

function getPostcodesCall(rowHandler){
  $.ajax({
    url: hostAddr + suburb+'/_all_docs',
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      suburb_data_rows=data.rows.length;
      // suburb_data_rows=300;
      for(var i = 0; i < suburb_data_rows; i++){
        var pCodeUrl = hostAddr + suburb + '/' + data.rows[i].id;
        getPcodeData(pCodeUrl,rowHandler);
      }
    }
  });
}

function getPcodeData(pCodeUrl,rowHandler){
  $.ajax({
    url: pCodeUrl,
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      rowHandler(data);
    }
  });
}
// window.onload=function(){
//     if(fresh_flag){
//         fresh_flag=false;
//         window.location.reload();
//     }
// }