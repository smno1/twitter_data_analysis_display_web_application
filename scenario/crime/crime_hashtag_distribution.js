function(doc) {
    hashtag_list = doc.entities.hashtags;
    hashtag_length = hashtag_list.length;
    if (hashtag_length > 0) {
    for (i = 0; i < hashtag_length; i++) {
        hashtag_text = hashtag_list[i].text;
        hashtag_text_lower = hashtag_text.toLowerCase();
    	emit(hashtag_text_lower, 1);
    }
  }
}
