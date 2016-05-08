// Map function
function(doc) {
  emit(doc.id, [doc.geo.coordinates, doc.sentiment_score.polarity]);
}