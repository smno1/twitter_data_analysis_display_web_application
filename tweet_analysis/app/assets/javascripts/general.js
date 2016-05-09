var pieChartCategory=["device","sentiment"];
var handlerFunction=[handlerDeviceData,handlerSentimentData];

function initGeneralPieChart(){
    for (var i = 0; i < pieChartCategory.length; i++) {
        var address=window[pieChartCategory[i]+"_info"];
        getGeneralData(address,pieChartCategory[i],handlerFunction[i]);
    };
    getEmojiDistribution();
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

function getEmojiDistribution(){
    $.ajax({
        url: hostAddr+emoji_distribution_address,
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
            var emojiDistributionData=[];
            x=[];
            for (var key in data.emoticon_distribution) {
                if (data.emoticon_distribution.hasOwnProperty(key)) {
                    x.push(data.emoticon_distribution[key][0]);
                    emojiDistributionData.push(data.emoticon_distribution[key][1]);
                }
            }
            drawEmojiDistribution(x,emojiDistributionData);
        }
    });

}
function drawEmojiDistribution(x,emojiDistributionData){
    $('#emoji-distribution-container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Emoji Distribution overview'
        },
        xAxis: {
            categories: x,
            crosshair: true
        },
        yAxis: {
            type: 'logarithmic',
            minorTickInterval: 0,
            title: {
                text: 'number of related tweets'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: "emoji",
            data: emojiDistributionData,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }

        }]
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