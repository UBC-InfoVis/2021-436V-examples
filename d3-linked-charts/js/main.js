/**
 * Load data from CSV file asynchronously and render scatter plot
 */
let data, scatterplot, barchart;

d3.csv('data/vancouver_trails.csv')
  .then(_data => {
    data = _data;
    data.forEach(d => {
      d.time = +d.time;
      d.distance = +d.distance;
    });

    // Initialize scales
    const colorScale = d3.scaleOrdinal()
        .range(['#d3eecd', '#7bc77e', '#2a8d46']) // light green to dark green
        .domain(['Easy','Intermediate','Difficult']);
    
    scatterplot = new Scatterplot({ 
      parentElement: '#scatterplot',
      colorScale: colorScale
    }, data);
    scatterplot.updateVis();

    barchart = new Barchart({
      parentElement: '#barchart',
      colorScale: colorScale
    }, data);
    barchart.updateVis();
  })
  .catch(error => console.error(error));


/**
 * Event listener: use color legend as filter
 */
d3.selectAll('.legend-btn').on('click', function() {
  // Toggle 'inactive' class
  d3.select(this).classed('inactive', !d3.select(this).classed('inactive'));
  
  // Check which categories are active
  let selectedDifficulty = [];
  d3.selectAll('.legend-btn:not(.inactive)').each(function() {
    selectedDifficulty.push(d3.select(this).attr('data-difficulty'));
  });

  // Filter data accordingly and update vis
  scatterplot.data = data.filter(d => selectedDifficulty.includes(d.difficulty));
  scatterplot.updateVis();
});