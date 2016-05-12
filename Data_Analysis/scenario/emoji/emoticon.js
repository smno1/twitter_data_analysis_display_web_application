// This part of code is to search the emoticons using "indexOf".
function(doc) {
  var happy = [":\-\)", ":\)", ":D", ":o)", ":\]", ":3", ":c)", ":\> =\]", "8\)", "=\)", ":\}", ":\^\)", ":っ\)", ":\‑D", "8\-D", "x\-D", "xD", "X\‑D", "XD", "=\-D", "=D", "=\-3", "=3", "B\^D", ":'\-\)", ":'\)"];
  var sad = ["\>:\[", ":\-\(", ":\(", ":\-c", ":c", ":\-\<", ":っC", ":\<", ":\-\[", ":\[", ":\{", ";\(", ":\-\|\|", ":@", "\>:\(", ":'\-\(:", ":'\("];
  var twitter_text = unescape(encodeURIComponent(doc.text));
  var happy_flag = 0;
  var sad_flag = 0 ;
  for (var i = 0; i < happy.length; i++) {
    happy_result = twitter_text.indexOf(happy[i]);
    if (happy_result != -1) {
      happy_flag = 1;
      break;
    }
  }
  for (var j = 0; j < sad.length; j++) {
    sad_result = twitter_text.indexOf(sad[j]);
    if (sad_result != -1) {
      sad_flag = 1;
      break;
    }
  }
  if ((happy_flag > 0) || (sad_flag > 0)) {
    emit(doc.id, doc);
  } 
}

// This part of code is to search the emoticons using "match".
function(doc){
  twitter_text = unescape(encodeURIComponent(doc.text));
  emoticon_results = twitter_text.match(/(:\-\))|(:\))|(\s:D\s)|(\s:o\s)|(:\])|(\s:3\s)|(\s:c\)\s)|(:\> =\])|(\s8\))|(=\))|(:\})|(:\^\))|(:\-D)|(\s8\-D\s)|(\sx\-D)|(\sxD\s)|(\sXD\s)|(\sX\-D)|(=\-D)|(\s=D\s)|(=\-3)|(\s=3\s)|(\sB\^D\s)|(:'\-\))|(:'\))|(\>:\[)|(:\-\())|(:\()|(:\-c)|(\s:c\s)|(:\-\<)|(:\<)|(:\-\[)|(:\[)|(:\{)|(:\()|(;\()|(:\-\|\|)|(\s:@\s)|(\>:\()|(:'\-\(:)|(:'\()/);
  if (emoticon_results.length > 0) {
    emit(doc.id, doc);
  }
} 

// This script is to filter documents which has not geo information
function(doc) {
  if (doc.geo != null) {
    emit(doc.id, doc)
  } 
}

// emoticon_results = twitter_text.match(/(:\-\))|(:D)|(:\))|(\s:D\s)|(\s:o\s)|(:\])|(\s:3\s)|(\s:c\)\s)|(:\> =\])|(\s8\)\s)|(=\))|(:\})|(:\^\))|(:\-D)|(\s8\-D\s)|(\sx\-D)|(\sxD\s)|(\sXD\s)|(\sX\-D)|(=\-D)|(\s=D\s)|(=\-\3)|(\s=3\s)|(\sB\^D\s)|(\>:\[)|(:\-\()|(:\()|(:\-c)|(\s:c\s)|(:\-\<)|(:\<)|(:\-\[)|(:\[)|(:\{)|(:\()|(;\()|(:\-\|\|)|(\s:@\s)|(\>:\()/g);
function(doc){
  twitter_text = unescape(encodeURIComponent(doc.text);
  happy_result = twitter_text.match(/(:\-\))|(:D)|(:\))|(\s:D\s)|(\s:o\s)|(:\])|(\s:3\s)|(\s:c\)\s)|(:\> =\])|(\s8\)\s)|(=\))|(:\})|(:\^\))|(:\-D)|(\s8\-D\s)|(\sx\-D)|(\sxD\s)|(\sXD\s)|(\sX\-D)|(=\-D)|(\s=D\s)|(=\-\3)|(\s=3\s)|(\sB\^D\s)/g);
  sad_result = twitter_text.match(/(\>:\[)|(:\-\()|(:\()|(:\-c)|(\s:c\s)|(:\-\<)|(:\<)|(:\-\[)|(:\[)|(:\{)|(:\()|(;\()|(:\-\|\|)|(\s:@\s)|(\>:\()/g);
  neutral_result = twitter_text.match(/(:\|)|(:\-\|)/g);
  var created_at = doc.created_at.split(" ")
  var hour = Number(created_at[3].substr(0,2))-11
  if (hour < 0){
    hour = hour + 24
  }
  var sent = 0;
  if (neutral_result != null){
    sent = 0;
  }else if (sad_result != null) {
    sent = -1;
  }else if (happy_result != null) {
    sent = 1;
  }
  emit([hour,sent],doc.sentiment_score.polarity;)
}



 happy_result = twitter_text.match(/(:\-\))|(:D)|(:\))|(\s:D\s)|(\s:o\s)|(:\])|(\s:3\s)|(\s:c\)\s)|(:\> =\])|(\s8\)\s)|(=\))|(:\})|(:\^\))|(:\-D)|(\s8\-D\s)|(\sx\-D)|(\sxD\s)|(\sXD\s)|(\sX\-D)|(=\-D)|(\s=D\s)|(=\-\3)|(\s=3\s)|(\sB\^D\s)/g);
  sad_result = twitter_text.match(/(\>:\[)|(:\-\()|(:\()|(:\-c)|(\s:c\s)|(:\-\<)|(:\<)|(:\-\[)|(:\[)|(:\{)|(:\()|(;\()|(:\-\|\|)|(\s:@\s)|(\>:\()/g);
  neutral_result = twitter_text.match(/(:\|)|(:\-\|)/g);
  var created_at = doc.created_at.split(" ");
  var hour = Number(created_at[3].substr(0,2))-11;
  if (hour < 0){
    hour = hour + 24;
  }
  var sent = 0;
  emit([hour,sent],doc.sentiment_score.polarity);

  if (neutral_result != null){
    sent = 0;
  }else if (sad_result != null) {
    sent = -1;
  }else if (happy_result != null) {
    sent = 1;
  }

 if (neutral_result != null){
    sent = 0;
  }else if (sad_result != null) {
    sent = -1;
  }else if (happy_result != null) {
    sent = 1;
  }else {
  }






