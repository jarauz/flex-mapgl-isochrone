colors=[
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue'
];

function addMapElements(){
  for (let i=0; i<stations.station.length; i++){
  // Add sources and layers to the map
  id = stations.station[i].id
  
  map.addSource(id, {
  'type': 'geojson',
  'data': {
  'type': 'Feature',
  'geometry': {
  'type': 'Polygon',
  // These coordinates outline Maine.
  'coordinates': getCoordinates(i)
    }
  }
  });

  map.addLayer({
    'id': id,
    'type': 'fill',
    'source': id, // reference the data source
    'layout': {},
    'paint': {
    'fill-color': colors[i], // blue color fill
    'fill-opacity': 0.3
  }
  });
// Add a black outline around the polygon.
  map.addLayer({
    'id': 'outlineLyr'+i,
    'type': 'line',
    'source': id,
    'layout': {},
    'paint': {
    'line-color': colors[i],
    'line-width': 3,
    'line-opacity': 0.8
  }
  });

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
      'circle-color': colors[i]
    }
  });
  
  
  } // end for i
}

colors=[
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue',
  'LightCoral',
  'DarkOrange',
  'LimeGreen',
  'SteelBlue'
]
