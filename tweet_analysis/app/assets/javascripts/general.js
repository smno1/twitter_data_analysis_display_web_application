var pieChartCategory=["device","sentiment"];
var handlerFunction=[handlerDeviceData,handlerSentimentData];

function initGeneralPieChart(){
    for (var i = 0; i < pieChartCategory.length; i++) {
        var address=window[pieChartCategory[i]+"_info"];
        getGeneralData(address,pieChartCategory[i],handlerFunction[i]);
    };
}

function getObjectFromData(row){
    return {name: stripKeyFromLink(row.key), y: row.value[1], sentiment: row.value[0]};
}

function stripKeyFromLink(key){
    return key.replace(/<[^>]*>/g,"");
}
function getSentimentFromData(row){
    return {name: getSentimentName(row.key), y: row.value[1], sentiment: row.value[0]};
}
function getSentimentName(key){
    switch(key){
        case -1: return "negative";
        case 0: return "neutral";
        case 1: return "positive";
    }
}

function getGeneralData(address,category,handler){
    $.ajax({
        url: hostAddr+address,
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
            handler(category,data.rows);
        }
    });
}

function handlerDeviceData(category,rows){
    var others={name:"others",y:0,sentiment:0};
    var pieData=[];
    for (var i = 0; i < rows.length; i++) {
       if(rows[i].value[1]<5000){
            others.y+=rows[i].value[1];
        }else{
            pieData.push(getObjectFromData(rows[i]));
        }
    };
    pieData.push(others);
    drawPieChart(category,pieData);
}
function handlerSentimentData(category,rows){
    pieData=[];
    for (var i = 0; i < rows.length; i++) {
        pieData.push(getSentimentFromData(rows[i]));
    };
    drawPieChart(category,pieData);
}
function drawPieChart(category,data){
    $('#'+category+'-container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: category
        },
        tooltip: {
            pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b><br>Sentiment: <b>{point.sentiment:.2f}</b><br>Number: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend: false
            }
        },
        series: [{
            name: '',
            colorByPoint: true,
            data: data
        }]
    });
}