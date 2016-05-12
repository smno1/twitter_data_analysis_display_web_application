function(doc) {
var sentiment = doc.sentiment_score.polarity;
    var created_at = doc.created_at.split(" ")
    var hour = Number(created_at[3].substr(0,2))+10
    if (hour < 0){
        hour = hour + 24
    }
    var rank = 0;
        if (sentiment > 0){
            rank = 1
        }else if (sentiment < 0){
            rank = -1
        }
    emit([hour,rank] , doc.sentiment_score.polarity);
}

function(keys, values, rereduce) {
    if (!rereduce){
        var length = values.length
        return [sum(values) / length, length]
    }else{
        var length = sum(values.map(function(v){return v[1]}))
        var avg = sum(values.map(function(v){
            return v[0] * (v[1] / length)
            }))
        return [avg, length]
    }
}