// Map function
function(doc){
  twitter_text = unescape(encodeURIComponent(doc.text));
  emoticon_results = twitter_text.match(/(:\-\))|(:D)|(:\))|(\s:D\s)|(\s:o\s)|(:\])|(\s:3\s)|(\s:c\)\s)|(:\> =\])|(\s8\)\s)|(=\))|(:\})|(:\^\))|(:\-D)|(\s8\-D\s)|(\sx\-D)|(\sxD\s)|(\sXD\s)|(\sX\-D)|(=\-D)|(\s=D\s)|(=\-\3)|(\s=3\s)|(\sB\^D\s)|(\>:\[)|(:\-\()|(:\()|(:\-c)|(\s:c\s)|(:\-\<)|(:\<)|(:\-\[)|(:\[)|(:\{)|(:\()|(;\()|(:\-\|\|)|(\s:@\s)|(\>:\()/g);
  for(var i=0; i<emoticon_results.length; i++) {
    emit(emoticon_results[i], 1)
  }
}

// Reduce function 

function(keys,values) {
	return sum(values);
}