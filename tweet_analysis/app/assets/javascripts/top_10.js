
function getTop20() {
  $.ajax({
    url: hostAddr + top_20,
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
     for (var i = data.rows.length - 1; i >= 0; i--) {
       getTop20ByType(data.rows[i].id);
     };
   }
 });
}

function getTop20ByType(address){
  $.ajax({
    url: hostAddr + "/top_20/"+address,
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      var x=[];
      var y=[];
      for (var i = 0; i < data.top_10.length; i++) {
        x.push(data.top_10[i][0]);
        y.push(data.top_10[i][1]);
      };
      drawColumnChart(data.top_type,x,y);
   }
 });
}

function drawColumnChart(type,x,y) {
    $('#'+type+'-container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 10 '+type
        },
        xAxis: {
            categories: x,
            crosshair: true
        },
        yAxis: {
            min: 0,
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
            name: type,
            data: y

        }]
    });
}