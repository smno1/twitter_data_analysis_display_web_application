function(doc) { 
var sentiment = doc.sentiment_score.polarity
created_at = doc.created_at.split(" ");
    month = created_at[1];
    if (month == 'Jan'){
    month = 1;
    }else if (month == 'Feb'){
    month = 2;
    }else if (month == 'Mar'){
    month = 3;
    }else if (month == 'Apr'){
    month = 4;
    }else if (month == 'May'){
    month = 5;
    }else if (month == 'Jun'){
    month = 6;
    }else if (month == 'Jul'){
    month = 7;
    }else if (month == 'Aug'){
    month = 8;
    }else if (month == 'Sep'){
    month = 9;
    }else if (month == 'Oct'){
    month = 10;
    }else if (month == 'Nov'){
    month = 11;
    }else if (month == 'Dec'){
    month = 12;
    }
    var rank = 0;
        if (sentiment > 0){
            rank = 1
        }else if (sentiment < 0){
            rank = -1
        }
    emit([month, rank], doc.sentiment_score.polarity);
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