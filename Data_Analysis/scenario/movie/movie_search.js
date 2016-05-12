// This script is to search keyword "movie" in the database, and store the document.
function(doc) {
  twitter_text = doc.text;
  movie_list = twitter_text.match(/movie/gi)
  if (movie_list.length > 0) {
    emit(doc.id, doc);
  }
}

// This script is to filter documents which has not geo information
function(doc) {
	if (doc.geo != null) {
		emit(doc.id, doc)
	} 
}
