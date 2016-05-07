var postData=[]
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
        "sentiment_average": data.properties.sentiment_average,
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

function scenerioCrime(){
    if(sortedCrimeChartedInfo.postcodelst.length>0){return;}
    postData.sort(function(a,b){return a.crime - b.crime;})
    postData.forEach(function(a){
        if(typeof a.crime !== "undefined" && a.crime>0&& a.averageIncome>0&& a.eduTertiery>0&& a.unemployment>0){
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
        if(typeof a.movie !== "undefined" && a.movie>0&& a.averageIncome>0&& a.averageAge>0){
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
        if(typeof a.gym !== "undefined" && a.gym>0&& a.averageIncome>0&& a.averageAge>0){
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
        if(typeof a.book !== "undefined" && a.book>0&& a.averageIncome>0&& a.eduTertiery>0&& a.unemployment>0){
        //     break;
        // }else{
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
    }
}

function drawCrimeComparisonChart(){
    $('#comparison-chart-container').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: sortedCrimeChartedInfo.title
        },
        xAxis: [{
            categories: sortedCrimeChartedInfo.postcodelst,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            title: {
                text: 'Crime Tweets Rate Benchmarked by population',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Tertiary Education Rate',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Unemployment Rate',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Average Income',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true
        }

        ],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Tertiary Education',
            type: 'spline',
            yAxis: 1,
            data: sortedCrimeChartedInfo.edulst,
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: 'Unemployment Rate',
            type: 'spline',
            yAxis: 2,
            data: sortedCrimeChartedInfo.unemploylst,
            tooltip: {
                valueSuffix: ' %'
            }

        },{
            name: 'Average Income',
            type: 'spline',
            yAxis: 3,
            data: sortedCrimeChartedInfo.incomelst,
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: 'Crime Benchmarked Rate',
            type: 'spline',
            data: sortedCrimeChartedInfo.crimelst,
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }
        }]
    });
}
function drawBookComparisonChart(){
    $('#comparison-chart-container').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: sortedBookChartedInfo.title
        },
        xAxis: [{
            categories: sortedBookChartedInfo.postcodelst,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            title: {
                text: 'Book Tweets Rate Benchmarked by population',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Tertiary Education Rate',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Unemployment Rate',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Average Income',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true
        }

        ],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Tertiary Education',
            type: 'spline',
            yAxis: 1,
            data: sortedBookChartedInfo.edulst,
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: 'Unemployment Rate',
            type: 'spline',
            yAxis: 2,
            data: sortedBookChartedInfo.unemploylst,
            tooltip: {
                valueSuffix: ' %'
            }

        },{
            name: 'Average Income',
            type: 'spline',
            yAxis: 3,
            data: sortedBookChartedInfo.incomelst,
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: 'Book Benchmarked Rate',
            type: 'spline',
            data: sortedBookChartedInfo.booklst,
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }
        }]
    });
}

function drawMovieComparisonChart(){
    $('#comparison-chart-container').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: sortedMovieChartedInfo.title
        },
        xAxis: [{
            categories: sortedMovieChartedInfo.postcodelst,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: 'Movie Tweets Rate Benchmarked by population',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Average Age',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Average Income',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true
        }

        ],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Average Age',
            type: 'spline',
            yAxis: 1,
            data: sortedMovieChartedInfo.ageLst,
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: 'Average Income',
            type: 'spline',
            yAxis: 2,
            data: sortedMovieChartedInfo.incomelst,
            tooltip: {
                valueSuffix: ' %'
            }

        },{
            name: 'Movie Benchmarked Rate',
            type: 'spline',
            data: sortedMovieChartedInfo.movielst,
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }
        }]
    });
}
function drawGymComparisonChart(){
    $('#comparison-chart-container').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: sortedGymChartedInfo.title
        },
        xAxis: [{
            categories: sortedGymChartedInfo.postcodelst,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: 'Gym Tweets Rate Benchmarked by population',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Average Age',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Average Income',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true
        }

        ],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Average Age',
            type: 'spline',
            yAxis: 1,
            data: sortedGymChartedInfo.ageLst,
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: 'Average Income',
            type: 'spline',
            yAxis: 2,
            data: sortedGymChartedInfo.incomelst,
            tooltip: {
                valueSuffix: ' %'
            }

        },{
            name: 'Gym Benchmarked Rate',
            type: 'spline',
            data: sortedGymChartedInfo.gymlst,
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }
        }]
    });
}

