// Map function
function(doc){
     var sentiment = doc.sentiment_score.polarity;
     var rank = 0;
        if (sentiment > 0){
            rank = 1
        }else if (sentiment < 0){
            rank = -1
        }
      emit([doc.postcode,rank], doc.sentiment_score.polarity);
}

// Reduce function
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

