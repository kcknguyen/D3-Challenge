// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 640;

// Define the chart's margins as an object
const chartMargin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 100
};

// Define dimensions of the chart area
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("./assets/data/data.csv").then(function(stateData) {
  stateData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
  });
// Print the Data
//console.log(data);
//});
//Step 2: Create scale functions
const xLinearScale = d3.scaleLinear()
  .domain([30, d3.max(stateData, d => d.age)])
  .range([0, chartWidth]);

const yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.smokes)])
    .range([chartHeight, 0]);

//       //Step 3: Create axis functions
//       // ==============================
const xAxis = d3.axisBottom(xLinearScale);
const yAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis)

var circlesGroup = chartGroup.selectAll("circle")
.data(stateData)
.enter()
.append("circle")
.attr("cx", d=>xLinearScale(d.age))
.attr("cy", d=>yLinearScale(d.smokes))
.attr("r", "10")
.classed("stateCircle", true)
.attr("opacity", 0.75);

// Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>age: ${d.age}<br>smokes: ${d.smokes}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });


chartGroup.append("g")
.selectAll ('text')
.data(stateData)
.enter()
.append("text")
.text(d=>d.abbr)
.attr("x", d=>xLinearScale(d.age))
.attr("y", d=>yLinearScale(d.smokes))
.attr("front-family", "sans-serif")
.attr("fill", "white")
.classed("stateText", true)
.attr("opacity", 0.75)
.attr("font-weight","bold")
.attr("alignment-baseline", "central");

chartGroup.append("text")
  .attr("transform", `translate(${chartWidth /2}, ${chartHeight + 50})`)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("fill", "black")
  .text("Age");

chartGroup.append("text")
  .attr("x", -120)
  .attr("y", -50)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("fill", "black")
  .style("font-weight", "bold")
  .text("Smoker (%) ") 
  
  console.log(data);

}).catch(function(error) {
    console.log(error);
});
