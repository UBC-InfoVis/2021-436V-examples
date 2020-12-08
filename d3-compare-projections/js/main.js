/**
 * Load geo data
 */
d3.json('data/canada_provinces.topo.json')
  .then(data => {
    /*
    const geoMap1 = new GeoMap({
      parentElement: '#albersUsa',
      projection: 'albersUsa'
    }, data);
    */
    const geoMap2 = new GeoMap({ 
      parentElement: '#mercator',
      projection: 'mercator'
    }, data);
  })
  .catch(error => console.error(error));