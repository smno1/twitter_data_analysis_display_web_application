var hostAddr = 'http://115.146.89.67:5984'
var suburb= '/suburb_boundaries'
var movie_id_coordinates_address='/movie_postcode/_design/movie/_view/id_coordinates'
var gym_id_coordinates_address='/gym/_design/general/_view/id_coordinates'
var melbourne_center_coordinates={lat: -37.8602828, lng: 144.979616}
var daily_average_mood='/melbourne_tweets_ccc/_design/general/_view/hoursTrend?group_level=1'
var daily_mood='/melbourne_tweets_ccc/_design/general/_view/hoursTrend?group_level=2'
var weekly_average_mood='/melbourne_tweets_ccc/_design/general/_view/dayTrend?group_level=1'
var weekly_mood='/melbourne_tweets_ccc/_design/general/_view/dayTrend?group_level=2'
var yearly_average_mood='/melbourne_tweets_ccc/_design/general/_view/monthTrend?group_level=1'
var yearly_mood='/melbourne_tweets_ccc/_design/general/_view/monthTrend?group_level=2'
var top_20='/top_20/_all_docs'
var fresh_flag=false;

function getFixedNumber(number, fixedpoint){
    if(isNaN(number)){return number;}
    return Number((number).toFixed(fixedpoint));
}

// window.onload=function(){
//     if(fresh_flag){
//         fresh_flag=false;
//         window.location.reload();
//     }
// }