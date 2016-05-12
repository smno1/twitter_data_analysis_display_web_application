function(doc) { 
    created_at = doc.created_at.split(" ");
    var sentiment = doc.sentiment_score.polarity;
    day = created_at[0];
    if(day == 'Mon'){
       day = 'Sun'
    }else if (day == 'Tue'){
       day = 'Mon'
    }else if (day == 'Wed'){
       day = 'Tue'
    }else if (day == 'Thu'){
       day = 'Wed'
    }else if (day == 'Fri'){
       day = 'Thu'
    }else if (day == 'Sat'){
       day = 'Fri'
    }else if (day == 'Sun'){
       day = 'Sat'
    }

    var rank = 0;
        if (sentiment > 0){
            rank = 1
        }else if (sentiment < 0){
            rank = -1
        }
    emit([day,rank] , doc.sentiment_score.polarity);
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