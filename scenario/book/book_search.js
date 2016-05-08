function(doc){
	var twitter_text = doc.text
	book_list = ["book","magazine","kindle","reading","writing","literature","fiction","novel","author","poem","poetry","prose","biography","fable","letter","literary"]
	for (var i = 0; i< book_list.length; i++){
		book_regexp = new RegExp(book_list[i], 'gi')
		result = twitter_text.match(book_regexp)
		if (result != null){
			if (doc.coordinates != null){
			  emit(doc.id_str, doc);
			}
		}
	}
}
