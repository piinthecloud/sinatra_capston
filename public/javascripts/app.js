$(document).ready(function() {


        var geo =  $.ajax({
             url: 'http://localhost:3000/geodata',
             type: 'GET',
             dataType: 'json',
             contentType: "application/json",
             success: function(data){

               var request =  $.ajax({
                    url: 'http://localhost:3000/city',
                    type: 'GET',
                    dataType: 'json',
                    contentType: "application/json",
                    success: function(data){


                      $.each(request.responseJSON, function(i, val){
                      // $(request.responseJSON).each(function(index, value){
                        // console.log(val.loc);


                        var circleMarker =
                        L.circleMarker( val.loc , {
                          radius: 10,
                          fillColor: "#f03",
                          color: "#000",
                          weight: 2,
                          opacity: .4,
                          fillOpacity: 0.2
                        })
                        .addTo(map)
                        // .bindPopup("<p>" + value.city + "</p>");
                      });
                    }

                  })

               var statesData = data

                function getColor(d) {
                  return d > 200 ? '#99000d' :
                  d > 100  ? '#cb181d' :
                  d > 60  ? '#ef3b2c' :
                  d > 40  ? '#fb6a4a' :
                  d > 30   ? '#fc9272' :
                  d > 20   ? '#fcbba1' :
                  d > 0   ? '#fee5d9' :
                  '#fff';
                }


                function style(feature) {
                  return {
                    fillColor: getColor(feature.properties.shooting_num),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.6
                  };
                }


                L.geoJson(statesData, {style: style}).addTo(map);

                // click to zoom on state
                function zoomToFeature(e) {
                  map.fitBounds(e.target.getBounds());
                }

                function onEachFeature(feature, layer) {
                  layer.on({

                    click: zoomToFeature
                  });
                }

                geojson = L.geoJson(statesData, {
                  style: style,
                  onEachFeature: onEachFeature
                }).addTo(map);

               }
             })



        var layer = new L.StamenTileLayer("toner");
        var map = L.map('map').setView([37.8, -96], 4);
  map.addLayer(layer);










});
//
