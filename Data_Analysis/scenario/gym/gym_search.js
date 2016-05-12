// Map Function
function(doc){
	var twitter_text = doc.text
	gym_list = ["resistance train", "cardio", "strength train", "gym", "fitness", "treadmill","yoga"]
	for (var i = 0; i< gym_list.length; i++){
		gym_regexp = new RegExp(gym_list[i], 'gi')
		result = twitter_text.match(gym_regexp)
		if (result != null){
			if (doc.coordinates != null){
			  emit(doc.id_str, doc);
			}
		}
	}
}