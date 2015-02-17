$(document).ready(function() {
///////
  var geo =  $.ajax({
    // url: 'http://localhost:3000/geodata',
    url: 'http://54.213.76.49/geodata',
    type: 'GET',
    dataType: 'json',
    contentType: "application/json",
    success: function(data){

      var request =  $.ajax({
        // url: 'http://localhost:3000/',
        url: 'http://54.213.76.49/',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
          $( "#panel-home" ).html( "<strong>Number of Incidents: "+ data.length +"</strong>");

          var markers = new L.MarkerClusterGroup({
            maxClusterRadius: 30,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
          });

          $.each(request.responseJSON, function(i, val){
            markers.addLayer(new L.circleMarker( [val.lat, val.lng], {
              radius: 5,
              fillColor: "#f03",
              color: "#000",
              weight: 2,
              opacity: .7,
              fillOpacity: 0.8
            })
            .bindPopup(
              "<img class='pop_image' src="+ val.image + ">"
              +"<p>" + val.victim_name + "</p>"
              +"<div class='pop'>"
              +"<p>City: " + val.city + "</p>"
              +"<p>Race: " + val.race + "</p>"
              +"<p>Date: " + val.date_searched + "</p>"
              +"<p>Gender: " + val.victim_gender + "</p>"
              +"</div>")
            );

          });

          map.addLayer(markers);

          $( "ul.dropdown-menu li" ).click(function(event) {

            map.removeLayer(markers);
            markersTwo.clearLayers();

            plotPoints(request.responseJSON,

            $(event.target).text().split('\n')[0])


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


      L.geoJson(statesData,{style:style}).addTo(map);

      // click to zoom on state
      function zoomToFeature(e){
        map.fitBounds(e.target.getBounds());
      }

      function onEachFeature(feature, layer){
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




  var markersTwo = new L.MarkerClusterGroup({
    maxClusterRadius: 30,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true
  });

  function drawMarkers(val){
    markersTwo.addLayer(new L.circleMarker( [val.lat, val.lng], {
      radius: 5,
      fillColor: "#f03",
      color: "#000",
      weight: 2,
      opacity: .7,
      fillOpacity: 0.8
    })
    .bindPopup(
      "<img class='pop_image' src="+ val.image + ">"
      +"<div class='pop'>"
      +"<p>" + val.victim_name + "</p>"
      +"<p>City: " + val.city + "</p>"
      +"<p>Race: " + val.race + "</p>"
      +"<p>Date: " + val.date_searched + "</p>"
      +"<p>Gender: " + val.victim_gender + "</p>"
      +"</div>")
    );

  }

  function addInfo(info){
    $( "#info" ).html( "<strong>"+ info +"</strong>");
  }

  function resetMarkers(val){
    drawMarkers(val);
    map.addLayer(markersTwo);
  }


  function addPanelInfoLocal(data, input){
    var x = 0
    $.each(data, function(i, val){
      if (val.race_ethnicity === input){
        x++
        $( "#panel-home" ).html("<strong>Number of Incidents: "+ x +"</strong>"
        );
      }
    })
  }


  function addGenderInfoLocal(data, input){
    var totalNum = 0
    $.each(data, function(i, val){
      if (val.victim_gender === input){
        totalNum++
        $( "#panel-home" ).html(
          "<p><strong>Number of Incidents: "+ totalNum +"</strong></p>"
        );
      }
    })
  }


  function plotPoints(data, input) {

    if (input === "Male" || input === "Female")
      {
        addGenderInfoLocal(data, input)
      }
    else
      {
        addPanelInfoLocal(data, input)
      }
    addInfo(input)
    $.each(data,
      function(i, val){
        if (input === val.race_ethnicity)
        {
          resetMarkers(val);
        }
        else if (input === val.victim_gender)
        {
          resetMarkers(val);
        }
      }
    )
  }

});
