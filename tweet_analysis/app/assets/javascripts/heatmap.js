var map, heatmap;
var current_topic="movie"
// var markers=[];
function initHeatMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: melbourne_center_coordinates,
    mapTypeId: google.maps.MapTypeId.SATELLITE//TERRAIN//HYBRID
  });
  getPoints(movie_id_coordinates_address);
}

function getPoints(address) {
    var coordinates=[];
    var sentiments=[];
    $.ajax({
        url: hostAddr + address,
        type: 'get',
        dataType: 'jsonp',
        success: function(data) {
          good_sen=0;
          bad_sen=0;
          netural_sen=0;
          for(var i = 0; i < data.rows.length; i++){
            coordinates.push(new google.maps.LatLng(data.rows[i].value[0][0], data.rows[i].value[0][1]));
            sentiments.push(data.rows[i].value[1]);
            if (data.rows[i].value[1]>0) {
              good_sen+=1;
            }else if(data.rows[i].value[1]<0){
              bad_sen+=1;
            }else{
              netural_sen+=1
            };
          }
          // setMarkerToPoint(coordinates,sentiments);
          drawSentimentFanChart(good_sen,bad_sen,netural_sen);
          heatmap = new google.maps.visualization.HeatmapLayer({
          data: coordinates,
          map: map
        });
        }
    });
}

function drawSentimentFanChart(good_sen,bad_sen,netural_sen){
    $('#sentiment_fan').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b><br>Number: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'share',
            innerSize: '50%',
            data: [
                {name: 'pos', y: good_sen, color: "#99F53C"},
                {name: 'netural', y: netural_sen, color: "#6EFBFB"},
                {name: 'neg', y: bad_sen, color: "#CACAD2"}
            ]
        }]
    });
}

// too slow to add all markers.
function setMarkerToPoint(coordinates,sentiments){
  for(var i = 0; i < sentiments.length; i++){
    var marker = new MarkerWithLabel({
      position: coordinates[i],
      draggable: false,
      raiseOnDrag: false,
      map: map,
      labelContent: getLabelContent(sentiments[i]),//getContent(data.properties),
      labelAnchor: new google.maps.Point(30, 40),
      labelClass: "heatmapLabel", // the CSS class for the label
      labelStyle: {opacity: 1.0},
      icon: "http://placehold.it/1x1",
      visible: false
    });
    // markers.push(marker);
    google.maps.event.addListener(marker, "mousemove", function(event) {
      marker.setVisible(true);
    });
    google.maps.event.addListener(marker, "mouseout", function(event) {
      marker.setVisible(false);
    });
  }
}

function getLabelContent(sentiment){
  if(sentiment>0){
    return '<i class="fa fa-smile-o fa-fw"></i>';
  }else if(sentiment==0){
    return '<i class="fa fa-meh-o fa-fw"></i>';
  }else{
    return '<i class="fa fa-frown-o fa-fw"></i>';
  }
}

function setHeatMapFeatureData(feature){
  current_topic=feature;
  heatmap.setMap(null);
  getPoints(window[feature+"_id_coordinates_address"]);
}