function(doc) {
  var user_name = ["metrotrains","TurnbullMalcolm", "AFL", "theage", "theheraldsun", "Telstra", "YouTube", "abcnews",
  					"EssendonFC", "MCG", "CollingwoodFC", "mmmhotbreakfast", "HawthornFC", "Melair", "GraysonDolan",
  					"Richmond_FC", "evasurga", "Melbourne", "DanielAndrewsMP", "gomvfc"];
  var twitter_user_name = doc.user.screen_name;
  var twitter_datetime = doc.created_at
  var datetime_list = datetime.split(" ")
  var month = datetime_list[1]
  var weekday = datetime_list[0]
  var time = datetime_list[3].split(":")[0]
  for (var i = 0; i < user_name.length; i ++) {
  	if (user_name[i] == twitter_user_name) {
  		emit([user_name[i] ,month], 1);
  		emit([user_name[i], weekday], 1);
  		emit([user_name[i], time], 1);
  	};
  }





      var twitter_user_name = doc.user.screen_name;
  var twitter_datetime = doc.created_at
  var datetime_list = datetime.split(" ")
  var month = datetime_list[1]
  var weekday = datetime_list[0]
  var time = datetime_list[3].split(":")[0]

  , weekday, time