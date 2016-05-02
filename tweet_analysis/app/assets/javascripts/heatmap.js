var map, heatmap;
// var markers=[];
function initHeatMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: melbourne_center_coordinates,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });
  getPoints();
}

function getPoints() {
    var coordinates=[];
    var sentiments=[];
    $.ajax({
        url: hostAddr + movie_id_coordinates_address,
        type: 'get',
        dataType: 'jsonp',
        success: function(data) {
          for(var i = 0; i < data.rows.length; i++){
            coordinates.push(new google.maps.LatLng(data.rows[i].value[0][0], data.rows[i].value[0][1]));
            sentiments.push(data.rows[i].value[1]);
          }
          setMarkerToPoint(coordinates,sentiments);
          heatmap = new google.maps.visualization.HeatmapLayer({
          data: coordinates,
          map: map
        });
        }
    });
}

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
      visible: true
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
  if(sentiment>0.2){
    return '<i class="fa fa-smile-o fa-fw"></i>';
  }else if(sentiment>-0.2){
    return '<i class="fa fa-meh-o fa-fw"></i>';
  }else{
    return '<i class="fa fa-frown-o fa-fw"></i>';
  }
}