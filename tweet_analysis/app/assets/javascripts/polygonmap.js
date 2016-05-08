var hostAddr = 'http://115.146.89.67:5984'
var suburb= '/suburb_boundaries'
var polyMap 
var mapData={"polygon":[],"data":[]}
var threshold={"population": [1000,2000,5000,10000,20000,40000],
               "movie": [5,10,20,50,100,500],
               "gym": [5,10,20,50,100,500],
               "book": [5,10,20,50,100,500],
               "crime": [10,20,40,100,500,1000],
               "disease": [10,20,40,100,500,1000],
               "unemployment":[3,5,7,9,11,13],
               "sentiment_negative":[-0.6,-0.5,-0.4,-0.3,-0.2,-0.1],
               "sentiment_positive":[0.1,0.2,0.3,0.4,0.5,0.6],
               "income":[400,500,600,700,800,900],
               "edu":[10,15,20,30,45,60]
}
var poly_continue_flag= true;
var current_feature = "general"
var color_threshold=['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177']
// Alternative color choice
// var color_threshold=['rgba(0, 255, 255, 1)', 'rgba(0, 127, 255, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 191, 1)', 'rgba(0, 0, 127, 1)', 'rgba(127, 0, 63, 1)', 'rgba(255, 0, 0, 1)' ]

function initPolyMap() {
  polyMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: melbourne_center_coordinates,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });
  poly_continue_flag= true;
  getPostcodesCall(setPolyToMap);
}

function coordsParser(Coords){
  var listOfCoords = []
  for (var i = 0; i < Coords.length; i++){
    singleSet = Coords[i];
    listOfCoords.push({lat: singleSet[0], lng:singleSet[1]});
  }
  return listOfCoords;
}
function getContent(properties){
  return '<table class="table"><tbody> <tr> <td>Average income</td> <td>'+properties.averageIncome+'</td> </tr><tr> <td>Average age</td> <td>'+properties.averageAge+'</td> </tr><tr> <td>Tertiery Education</td> <td>'+properties.eduTertiery+'</td> </tr> <tr> <td>Negative sentiment </td> <td>'+getFixedNumber(properties.sentiment_negative,3)+'</td> </tr><tr> <td>Positive sentiment </td> <td>'+getFixedNumber(properties.sentiment_positive,3)+'</td> </tr><tr> <td>Population</td> <td>'+properties.population+'</td> </tr><tr> <td>Movie related tweeted</td> <td>'+ properties.movie+'</td> </tr><tr> <td>Gym related tweeted</td> <td>'+ properties.gym+'</td> </tr><tr> <td>Crime related tweeted</td> <td>'+ properties.crime+'</td> </tr><tr> <td>Book related tweeted</td> <td>'+ properties.book+'</td> </tr><tr> <td>Disease related tweeted</td> <td>'+ properties.disease+'</td> </tr> </tbody> </table>';
}
// function getCountData(data,population){
//   return (typeof data == "undefined") ? "undefined" : data["count"]*100000/population;
// }
function getFeatureContent(){
  if(current_feature=="general"){
    return "";
  }
  var current_threshold=threshold[current_feature];
  var content='<table><tbody>';
  for (var i = 0; i < current_threshold.length; i++){
    content+= '<tr> <td style="width:15px; background:'+color_threshold[i]+' "></td> <td> <'+threshold[current_feature][i]+'</td> </tr>'
  }
  return content+='<tr> <td style="background:'+color_threshold[6]+' "></td> <td> >'+threshold[current_feature][5]+'</td> </tr> <tr> <td style="width:15px; background: #000000;"></td> <td> undefined or null </td> </tr></tbody> </table>';
}

function updatePanelData(data){
  var content=getContent(data.properties);
  $("#surburd-name").text(data.properties.name);
  $("#panel-data").html(content);
}
function getCorrespondingColor(data){
  switch(current_feature){
    case "general":
      return '#FFFFF0';
    case "population":
      return getRespond(data.properties.population);
    case "edu":
      return getRespond(data.properties.eduTertiery);
    case "income":
      return getRespond(data.properties.averageIncome);
    case "unemployment":
      return getRespond(data.properties.unemployment);
    case "sentiment_negative":
      return getRespond(data.properties.sentiment_negative);
    case "sentiment_positive":
      return getRespond(data.properties.sentiment_positive);
    case "movie":
      return getRespond(data.properties.movie);
    case "gym":
      return getRespond(data.properties.gym);
    case "crime":
      return getRespond(data.properties.crime);
    case "book":
      return getRespond(data.properties.book);
    case "disease":
      return getRespond(data.properties.disease);
  }
  return "#000000"
}
function getRespond(attribute){
  thresholdLst=threshold[current_feature]
  for (var i = 0; i < thresholdLst.length; i++){
    if (attribute<thresholdLst[i]){
      return color_threshold[i]
    }
  }
  return attribute > thresholdLst[5] ? color_threshold[6] : '#000000'
}
function setPolyToMap(data){
  // Construct the polygon.
  cords=coordsParser(data.geometry.coordinates);
  var marker = new MarkerWithLabel({
        position: new google.maps.LatLng(0,0),
        draggable: false,
        raiseOnDrag: false,
        map: polyMap,
        labelContent: data.properties.name,//getContent(data.properties),
        labelAnchor: new google.maps.Point(30, 40),
        labelClass: "polygonLabel", // the CSS class for the label
        labelStyle: {opacity: 1.0},
        icon: "http://placehold.it/1x1",
        visible: false
     });
  var polygon = new google.maps.Polygon({
    paths: cords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 1,
    fillColor: getCorrespondingColor(data),
    fillOpacity: 0.5,
    map: polyMap
  });
  google.maps.event.addListener(polygon, "mousemove", function(event) {
    polygon.setOptions({strokeColor: "#000000"});
    polygon.setOptions({strokeWeight: 4});
    marker.setPosition(event.latLng);
    marker.setVisible(true);
    updatePanelData(data);
  });
  google.maps.event.addListener(polygon, "mouseout", function(event) {
    polygon.setOptions({strokeColor: "#FF0000"});
    polygon.setOptions({strokeWeight: 1});
    marker.setVisible(false);
  });
  mapData["polygon"].push(polygon);
  mapData["data"].push(data);
}

function setFeatureData(feature){
  current_feature=feature;
  polyLst=mapData["polygon"];
  dataLst=mapData["data"];
  $("#legend-data").html(getFeatureContent());
  for (var i = 0; i < polyLst.length; i++){
    polyLst[i].setOptions({fillColor:getCorrespondingColor(dataLst[i])})
  }
}






