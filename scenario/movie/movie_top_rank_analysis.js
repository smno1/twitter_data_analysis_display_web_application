function(doc) {
  var movie_keyword = ["Shawshank", "Godfather", "Dark Knight", "Schindler", "Pulp Fiction",
  "Lord Ring", "Fight Club", "Star War", "Forrest Gump", "Inception", "Goodfella", "Matrix", "Seven Samurai"]
  for (var i = 0;i < movie_keyword.length; i++) {
    var twitter_text = doc.text
    twitter_text = twitter_text.replace(/\s/g, '')
    var movie_text = movie_keyword[i].toLowerCase()
    movie_text = movie_text.replace(/\s/g, '')
    var re = new RegExp(movie_text, 'gi')
    results = twitter_text.match(re)
    if (results != null) {
      emit(movie_keyword[i], 1)
    }
  }
}