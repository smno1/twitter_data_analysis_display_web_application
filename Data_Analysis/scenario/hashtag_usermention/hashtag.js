// This part of code is to extract all hashtags and store each hashtag as the key, 1 as the value.
// In melbourne_ccc/_design/twitter_analysis/hashtag
function(doc) {
	hashtag_list = doc.entities.hashtags;
	hashtag_length = hashtag_list.length;
	if (hashtag_length > 0) {
    for (i = 0; i < hashtag_length; i++) {
    	emit(hashtag_list[i].text, 1);
    }
  }
}

// This part of code is to extract all hashtags and reduce the hashtag and count the number of each hashtag
// We treat the uppercase and the lowercaser as the same case.
function(doc) {
	hashtag_list = doc.entities.hashtags;
	hashtag_length = hashtag_list.length;
	if (hashtag_length > 0) {
    for (i = 0; i < hashtag_length; i++) {
    	emit(hashtag_list[i].text.toLowercase(), 1);
    }
  }
}

function(keys,values) {
	return sum(values);
}


// This part of code is to extract the all user_mentions and store each user_mention as the key, 1 as the value. 
// In "melbourne_ccc/_design/twitter_analysis/user_mention"
function(doc) {
	user_list = doc.entities.user_mentions;
	user_length = user_list.length;
	if (user_length > 0){
		for (i = 0; i < user_length; i++) {
			emit(user_list[i].screen_name, 1);
		}
	}
}

// This part of code is to reduce the user_mentions and count the number of each user_mention
function(keys,values) {
	return sum(values);
}










