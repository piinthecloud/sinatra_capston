$(document).ready(function() {


  var geo =  $.ajax({
       url: 'http://localhost:3000/geodata',
       type: 'GET',
       dataType: 'json',
       contentType: "application/json",
       success: function(data){

     var request =  $.ajax({
          url: 'http://localhost:3000/',
          type: 'GET',
          dataType: 'json',
          contentType: "application/json",
          success: function(data){

          var markers = new L.MarkerClusterGroup(
            {maxClusterRadius: 30,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true} );

            $.each(request.responseJSON,
              function(i, val){
              markers.addLayer(new L.circleMarker
                ( [val.lat, val.lng] , {
                  radius: 5,
                  fillColor: "#f03",
                  color: "#000",
                  weight: 2,
                  opacity: .7,
                  fillOpacity: 0.8
              })

              .bindPopup(
              "<p>City: " + val.city + "</p>"
              +"<p>Race: " + val.race + "</p>"
              +"<p>Date: " + val.date_searched + "</p>"
              +"<p>Hit or Killed? " + val["hit_killed?"] + "</p>")
              );
              // var circleMarker =
              // L.circleMarker( [val.lat, val.lng] , {
              //   radius: 10,
              //   fillColor: "#f03",
              //   color: "#000",
              //   weight: 2,
              //   opacity: .4,
              //   fillOpacity: 0.2
              // })
              // .addTo(map)
              //
            });
            map.addLayer(markers);

        }})

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


                L.geoJson(statesData, {style:
                   style}).addTo(map);

                // click to zoom on state
                function zoomToFeature(e) {
                  map.fitBounds(e.target.getBounds());
                }

                function onEachFeature(feature, layer)
                {
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
