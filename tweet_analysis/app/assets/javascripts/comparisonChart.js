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
                format: '{value}',
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
                valueSuffix: ''
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
                format: '{value}',
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
                valueSuffix: ''
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
                format: '{value}',
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
                format: '{value}',
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
            name: 'Movie Benchmarked Rate',
            type: 'spline',
            data: sortedMovieChartedInfo.movielst,
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }
        },{
            name: 'Average Age',
            type: 'spline',
            yAxis: 1,
            data: sortedMovieChartedInfo.ageLst,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Average Income',
            type: 'spline',
            yAxis: 2,
            data: sortedMovieChartedInfo.incomelst,
            tooltip: {
                valueSuffix: ''
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
                format: '{value}',
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
                format: '{value}',
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
            name: 'Gym Benchmarked Rate',
            type: 'spline',
            data: sortedGymChartedInfo.gymlst,
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }
        },{
            name: 'Average Age',
            type: 'spline',
            yAxis: 1,
            data: sortedGymChartedInfo.ageLst,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Average Income',
            type: 'spline',
            yAxis: 2,
            data: sortedGymChartedInfo.incomelst,
            tooltip: {
                valueSuffix: ''
            }

        }]
    });
}


function drawSentimentComparisonChart(){
    $('#comparison-chart-container').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: sortedSentimentChartedInfo.title
        },
        xAxis: [{
            categories: sortedSentimentChartedInfo.postcodelst,
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
                text: 'Average sentiment score generate by tweets',
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
                format: '{value}',
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
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true
        }, { 
            gridLineWidth: 0,
            title: {
                text: 'Unemployment Rate',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            opposite: true
        }, { 
            gridLineWidth: 0,
            title: {
                text: 'Tertiary Education Rate',
                style: {
                    color: Highcharts.getOptions().colors[4]
                }
            },
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[4]
                }
            },
            opposite: true
        }, { 
            gridLineWidth: 0,
            title: {
                text: 'Crime related tweets Benchmarked by Population',
                style: {
                    color: Highcharts.getOptions().colors[5]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[5]
                }
            },
            opposite: true
        }, { 
            gridLineWidth: 0,
            title: {
                text: 'Movie related tweets Benchmarked by Population',
                style: {
                    color: Highcharts.getOptions().colors[6]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[6]
                }
            },
            opposite: true
        }, { 
            gridLineWidth: 0,
            title: {
                text: 'Gym related tweets Benchmarked by Population',
                style: {
                    color: Highcharts.getOptions().colors[7]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[7]
                }
            },
            opposite: true
        }, { 
            gridLineWidth: 0,
            title: {
                text: 'Book related tweets Benchmarked by Population',
                style: {
                    color: Highcharts.getOptions().colors[8]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[8]
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
            name: 'Average sentiment score generate by tweets',
            type: 'spline',
            data: sortedSentimentChartedInfo.sentimentLst,
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }
        },{
            name: 'Average Age',
            type: 'spline',
            yAxis: 1,
            data: sortedSentimentChartedInfo.ageLst,
            visible: false,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Average Income',
            type: 'spline',
            yAxis: 2,
            data: sortedSentimentChartedInfo.incomelst,
            visible: false,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Unemployment Rate',
            type: 'spline',
            yAxis: 3,
            data: sortedSentimentChartedInfo.unemploylst,
            visible: false,
            tooltip: {
                valueSuffix: '%'
            }

        }, {
            name: 'Tertiary Education Rate',
            type: 'spline',
            yAxis: 4,
            data: sortedSentimentChartedInfo.edulst,
            visible: false,
            tooltip: {
                valueSuffix: '%'
            }

        }, {
            name: 'Crime Related Tweets',
            type: 'spline',
            yAxis: 5,
            data: sortedSentimentChartedInfo.crimelst,
            visible: false,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Movie Related Tweets',
            type: 'spline',
            yAxis: 6,
            data: sortedSentimentChartedInfo.movielst,
            visible: false,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Gym Related Tweets',
            type: 'spline',
            yAxis: 7,
            data: sortedSentimentChartedInfo.gymlst,
            visible: false,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Book Related Tweets',
            type: 'spline',
            yAxis: 8,
            data: sortedSentimentChartedInfo.booklst,
            visible: false,
            tooltip: {
                valueSuffix: ''
            }

        }]
    });
}

