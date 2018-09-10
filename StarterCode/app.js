// @TODO: YOUR CODE HERE!
var svgWidth = 1500;
var svgHeight = 800;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv", function(err, healthData) {
  console.log(healthData);
  if (err) throw err;
  

  // Step 1: Parse Data/Cast as numbers
   // ==============================
  healthData.forEach(function(data) {
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(healthData, d => d.obesity)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.smokes)])
    .range([height, 0]);

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.obesity))
  .attr("cy", d => yLinearScale(d.smokes))
  .attr("r", 20)
  .attr("fill", "blue")
  .attr("opacity", ".5");


  chartGroup.selectAll(".label")
  .data(healthData)
  .enter()
  .append("text")
  .attr('class', 'label')
  .text(d => d.abbr)
  .attr("x", d => xLinearScale(d.obesity))
  .attr("y", d => yLinearScale(d.smokes))
  .attr("text-anchor", "middle")
  .attr("fill", "black");

  
  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text('% of smokers');

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("% of obesity");
});
