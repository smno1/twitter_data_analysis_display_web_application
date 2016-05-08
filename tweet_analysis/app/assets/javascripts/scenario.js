var postData=[]
var sortedSentimentChartedInfo={
    "postcodelst":[],"ageLst":[],"edulst":[],"unemploylst":[],"incomelst":[],"booklst":[],
    "movielst":[],"crimelst":[],"gymlst":[],"sentimentLst":[],
    "title": "Average Sentiment against all the other factors"
};
var sortedCrimeChartedInfo={
    "postcodelst":[],"crimelst":[],"edulst":[],"unemploylst":[],"incomelst":[],
    "title": "Crime related tweets rate against income, tertiery education, and unemployment rate"
};

var sortedBookChartedInfo={
    "postcodelst":[],"booklst":[],"edulst":[],"unemploylst":[],"incomelst":[],
    "title": "Book related tweets rate against income, tertiery education, and unemployment rate"
};
var sortedMovieChartedInfo={
    "postcodelst":[],"movielst":[],"ageLst":[],"incomelst":[],
    "title": "Movie related tweets rate against income, and age"
};
var sortedGymChartedInfo={
    "postcodelst":[],"gymlst":[],"ageLst":[],"incomelst":[],
    "title": "Gym related tweets rate against income, and age"
};

var ajaxCallCount=0;

// $(document).ajaxStop(function() {
//   alert("here")
//   alert(postData[postData.length-1].postcode)
// });

function initScenarioChart(){
    if (postData.length==0) {
        ajaxCallCount=0;
        $("#scenario_sidebar").hide();
        $("#myProgress").show();
        getPostcodesCall(suburbDataHandler);
    }else{
    }
    
}

function suburbDataHandler(data){
    postData.push({
        "postcode": data.properties.postcode,
        "crime": data.properties.crime,
        "book": data.properties.book,
        "emoji": data.properties.emoji,
        "gym": data.properties.gym,
        "movie": data.properties.movie,
        "sentiment_negative": data.properties.sentiment_negative,
        "sentiment_positive": data.properties.sentiment_positive,
        "sentiment_average": Number(data.properties.sentiment_average),
        "unemployment": Number(data.properties.unemployment),
        "eduTertiery": Number(data.properties.eduTertiery),
        "averageIncome": Number(data.properties.averageIncome),
        "averageAge": Number(data.properties.averageAge)
    });
    ajaxCallCount+=1;
    $("#myBar").css("width",(ajaxCallCount/suburb_data_rows)*100 +'%');
    if(ajaxCallCount==suburb_data_rows){
    // if(ajaxCallCount==50){
        $("#myProgress").hide();
        $("#scenario_sidebar").show();

    }
}

function scenerioSentiment(){
    if(sortedSentimentChartedInfo.postcodelst.length>0){sortedSentimentChartedInfo={
    "postcodelst":[],"ageLst":[],"edulst":[],"unemploylst":[],"incomelst":[],"booklst":[],
    "movielst":[],"crimelst":[],"gymlst":[],"sentimentLst":[],
    "title": "Average Sentiment against all the other factors"};}
    postData.sort(function(a,b){return a.sentiment_average - b.sentiment_average;});
    postData.forEach(function(a){
        if(typeof a.sentiment_average !== "undefined" && a.sentiment_average>0&& a.averageIncome>0&& a.eduTertiery>0&&
         a.unemployment>0&&a.gym>0&&a.averageAge>0&&a.movie>0&&a.book>0&&a.crime>0){
            sortedSentimentChartedInfo.postcodelst.push(a.postcode);
            sortedSentimentChartedInfo.incomelst.push(a.averageIncome);
            sortedSentimentChartedInfo.sentimentLst.push(a.sentiment_average);
            sortedSentimentChartedInfo.edulst.push(a.eduTertiery);
            sortedSentimentChartedInfo.unemploylst.push(a.unemployment);
            sortedSentimentChartedInfo.ageLst.push(a.averageAge);
            sortedSentimentChartedInfo.crimelst.push(a.crime);
            sortedSentimentChartedInfo.booklst.push(a.book);
            sortedSentimentChartedInfo.gymlst.push(a.gym);
            sortedSentimentChartedInfo.movielst.push(a.movie);
        }
    });
} 

function scenerioCrime(){
    if(sortedCrimeChartedInfo.postcodelst.length>0){return;}
    postData.sort(function(a,b){return a.crime - b.crime;})
    postData.forEach(function(a){
        if(a.crime>0&& a.averageIncome>0&& a.eduTertiery>0&& a.unemployment>0){
            sortedCrimeChartedInfo.postcodelst.push(a.postcode);
            sortedCrimeChartedInfo.incomelst.push(a.averageIncome);
            sortedCrimeChartedInfo.edulst.push(a.eduTertiery);
            sortedCrimeChartedInfo.crimelst.push(a.crime);
            sortedCrimeChartedInfo.unemploylst.push(a.unemployment);
        }
    });
}
function scenerioMovie(){
    if(sortedMovieChartedInfo.postcodelst.length>0){return;}
    postData.sort(function(a,b){return a.movie - b.movie;})
    postData.forEach(function(a){
        if(a.movie>0&& a.averageIncome>0&& a.averageAge>0){
            sortedMovieChartedInfo.postcodelst.push(a.postcode);
            sortedMovieChartedInfo.movielst.push(a.movie);
            sortedMovieChartedInfo.incomelst.push(a.averageIncome);
            sortedMovieChartedInfo.ageLst.push(a.averageAge);
        }
    });
}
function scenerioGym(){
    if(sortedGymChartedInfo.postcodelst.length>0){return;}
    postData.sort(function(a,b){return a.gym - b.gym;})
    postData.forEach(function(a){
        if(a.gym>0&& a.averageIncome>0&& a.averageAge>0){
            sortedGymChartedInfo.postcodelst.push(a.postcode);
            sortedGymChartedInfo.gymlst.push(a.gym);
            sortedGymChartedInfo.incomelst.push(a.averageIncome);
            sortedGymChartedInfo.ageLst.push(a.averageAge);
        }
    });
}

function scenerioBook(){
    if(sortedBookChartedInfo.postcodelst.length>0){return;}
    postData.sort(function(a,b){return a.book - b.book;})
    postData.forEach(function(a){
        if(a.book>0&& a.averageIncome>0&& a.eduTertiery>0&& a.unemployment>0){
            sortedBookChartedInfo.postcodelst.push(a.postcode);
            sortedBookChartedInfo.incomelst.push(a.averageIncome);
            sortedBookChartedInfo.edulst.push(a.eduTertiery);
            sortedBookChartedInfo.unemploylst.push(a.unemployment);
            sortedBookChartedInfo.booklst.push(a.book);
        }
    });
}

function setComparisonChartData(feature){
    switch(feature){
        case "Crime":
        scenerioCrime();
        drawCrimeComparisonChart();
        break;
        case "Movie":
        scenerioMovie();
        drawMovieComparisonChart();
        break;
        case "Book":
        scenerioBook();
        drawBookComparisonChart();
        break;
        case "Gym":
        scenerioGym();
        drawGymComparisonChart();
        break;
        case "Sentiment":
        scenerioSentiment();
        drawSentimentComparisonChart();
        break;
    }
}
