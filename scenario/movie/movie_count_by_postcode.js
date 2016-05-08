// This part of code is to count "movie" according to the postcode.
// In "movie_postcode_ccc/_design/movie_count_by_postcode"
function(doc) {
	emit(doc.postcode, 1)
} 

// This part of code is as the "reduce" function
function(keys,values) {
   return sum(values);
}

