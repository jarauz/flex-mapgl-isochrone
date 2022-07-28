const colors=[
  'LightCoral',
  'DarkOrange',
  'Magenta',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'Magenta',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'Magenta',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'Magenta',
  'SteelBlue'
];

function addMapElements(){
  for (let j=0; j<isolines.length; j++){
    for (let i=0; i<stations.station.length; i++){
        // Add sources and layers to the map
        id = stations.station[i].id
        
        map.addSource(id+i+j, {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'geometry': {
        'type': 'Polygon',
        // These coordinates outline Maine.
        'coordinates': getCoordinates(i,j)
          }
        }
        });
      
        map.addLayer({
          'id': id+i+j,
          'type': 'fill',
          'source': id+i+j, // reference the data source
          'layout': {},
          'paint': {
          'fill-color': colors[i], // blue color fill
          'fill-opacity': isoOpacities[j]
        }
        });
        // Add a black outline around the polygon.
        map.addLayer({
          'id': 'outlineLyr'+i+j,
          'type': 'line',
          'source': id+i+j,
          'layout': {},
          'paint': {
          'line-color': colors[i],
          'line-width': 2,
          'line-opacity': 0.4
        }
        });
          
    } // end for i
  } // end for j

  for(let i=0; i<stations.station.length; i++){

    // Add circle at each station
    map.addSource('point'+i, {
      'type': 'geojson',
      'data': {
        'type': 'Point',
        'coordinates': stations.station[i].coord
      }
    });
        
      
    map.addLayer({
    'id': 'pointLyr'+i,
    'type': 'circle',
    'source': 'point'+i,
    'paint': 
      {
        'circle-radius': stationCircleSize,
        'circle-color': 'grey'
      }
    });
  
    
  } // end for i

  

}

function removeLayer(lyr){
  let j=lyr;
    for (let i=0; i<stations.station.length; i++){
        // Add sources and layers to the map
        id = stations.station[i].id
        
      
        map.removeLayer(id+i+j);
        map.removeLayer('outlineLyr'+i+j)        
    } // end for i
}

function showLayer(lyr){
  let j=lyr;
    for (let i=0; i<stations.station.length; i++){
        // Add sources and layers to the map
        id = stations.station[i].id
      
        map.addLayer({
          'id': id+i+j,
          'type': 'fill',
          'source': id+i+j, // reference the data source
          'layout': {},
          'paint': {
          'fill-color': colors[i], // blue color fill
          'fill-opacity': isoOpacities[j]
        }
        });
        // Add a black outline around the polygon.
        map.addLayer({
          'id': 'outlineLyr'+i+j,
          'type': 'line',
          'source': id+i+j,
          'layout': {},
          'paint': {
          'line-color': colors[i],
          'line-width': 2,
          'line-opacity': 0.4
        }
        });  
      
    } // end for i
}

